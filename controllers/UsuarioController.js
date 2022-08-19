import Usuario from "../database/models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import services from "../utils/services.js";
import sgMail from "@sendgrid/mail";

export const register = async (req, res) => {
    try{
        
        if (!req.body.email) {
            return res.status(400).json({ error: "El correo es obligatorio" });
        }

      if (req.body.email === "" || req.body.password === "") {
        return res.status(400).json({ error: "Los campos no pueden estar vacios" });
      }
      let email = req.body.email.toLowerCase().trim();
      let user = await Usuario.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ error: "El usuario ya existe" });
      }

        const newUser = new Usuario({
            imagen: req.body.imagen,
            nombre: req.body.nombre,
            email: email
          });
          
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              // console.log(err);
              return res.status(500).json({ error: err });
            }
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
              if (err) {
                // console.log("err: ", err);
                return res.status(500).json({ error: err });
              }
              newUser.password = hash;
              newUser.save();
              
              const payload = {
                id: newUser._id,
                nombre: newUser.nombre,
                email: newUser.email,
              };
              const token = jwt.sign(payload, services.JWT_KEY, {
                expiresIn: 31556926,
              });
        
              sendMail({
                to: newUser.email,
                from: "hector360_m@hotmail.com",
                subject: "Bienvenido a la aplicación de películas y series",
                text: `Bienvenido a la aplicación ${newUser.nombre}`,
              });
              return res.status(200).json({
                message: "Usuario creado correctamente",
                token: token,
              });
            });
          });
    } catch(error){
        console.log(error)
    }
}

const sendMail = async(msg) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  await sgMail.send(msg);
  console.log("Email enviado");
}
export const login = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(400).json({ error: "El correo es obligatorio" });
        }

      if (req.body.email === "" || req.body.password === "") {
        return res.status(400).json({ error: "Los campos no pueden estar vacios" });
      }
      let email = req.body.email.toLowerCase().trim();
      let user = await Usuario.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: "El usuario no existe" });
      }
      if (
        !(
          bcrypt.compareSync(req.body.password, user.password)
        )
      ) {
        return res.status(400).json({ error: "Contraseña Incorrecta" });
      }

      const payload = {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
      };
      const token = jwt.sign(payload, services.JWT_KEY, {
        expiresIn: 31556926,
      });

      return res.status(200).json({
        message: "Login correcto",
        token: token,
      });

    } catch(error) {
        console.log(error)
    }
}