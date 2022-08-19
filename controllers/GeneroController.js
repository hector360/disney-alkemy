import Genero from "../database/models/Genero.js";

export const createGenero = async (req, res) => {
    try {
        let imagen = req.body.imagen ? req.body.imagen : null;
        let nombre = req.body.nombre ? req.body.nombre : null;
        if(nombre === null){
            return res.status(400).json({ message: "El nombre es obligatorio" });
        }
        let genero = await Genero.create({
            imagen: imagen,
            nombre: nombre,
        });
        return res.status(200).json(genero) 
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
    }
}