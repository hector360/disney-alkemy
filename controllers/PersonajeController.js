import Personaje from "../database/models/Personaje.js";
import PeliculaSerie from "../database/models/PeliculaSerie.js";

export const createCharacter = async (req, res) => {
    try {
        let imagen = req.body.imagen ? req.body.imagen : null;
        let nombre = req.body.nombre ? req.body.nombre : null;
        let edad = req.body.edad ? req.body.edad : null;
        let peso = req.body.peso ? req.body.peso : null;
        let historia = req.body.historia ? req.body.historia : null;
        let id_pelicula_serie = req.body.id_pelicula_serie ? req.body.id_pelicula_serie : null;

        if(nombre === null){
            return res.status(400).json({ message: "El nombre es obligatorio" });
        }
        if(historia === null){
            return res.status(400).json({ message: "El historia es obligatorio" });
        }
        if(id_pelicula_serie === null){
            return res.status(400).json({ message: "El id_pelicula_serie es obligatorio" });
        }
        let personaje = await Personaje.create({
            imagen: imagen,
            nombre: nombre,
            edad: edad,
            peso: peso,
            historia: historia,
            id_pelicula_serie: id_pelicula_serie,
        });
        return res.status(200).json(personaje) 
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
    }
}

export const updateCharacter = async (req, res) => {
    try {
        let character = await Personaje.findOne({ where: { id: req.body.id } });
        let id_character = req.body.id;
        let character_image = req.body.imagen;
        let character_name = req.body.nombre;
        let character_age = req.body.edad;
        let character_weight = req.body.peso;
        let character_history = req.body.historia;
        let id_movie = req.body.id_pelicula_serie;

        if(id_character === "" || id_character === null || id_character  === undefined){
            return res.status(400).json({ error: "Se necesita el Id del Personaje" });
        }
        if(character_image !== "" || character_image !== null || character_image !== undefined){
            character.imagen = character_image;
        }
        if(character_name !== "" || character_name !== null || character_name !== undefined){
            character.nombre = character_name;
        }
        if(character_age !== "" || character_age !== null || character_age !== undefined){
            character.edad = character_age;
        }
        if(character_weight !== "" || character_weight !== null || character_weight !== undefined){
            character.peso = character_weight;
        }
        if(character_history !== "" || character_history !== null || character_history !== undefined){
            character.historia = character_history;
        }
        if(id_movie !== "" || id_movie !== null || id_movie !== undefined){
            character.id_pelicula_serie = id_movie;
        }
        character.save();

        return res.status(200).json({
            message: "Personaje actualizado",
            character: character
        })
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
    }
}
export const deleteCharacter = async (req, res) => {
    try{
        let character = await Personaje.findOne({ where: { id: req.params.id_character } });
        if(!character){
            return res.status(400).json({ message: "No existe el personaje" });
        }
        character.destroy();
        return res.status(200).json({ message: "Personaje eliminado" });
    } catch(error) {
        console.log(error)
        return res.status(500).json(error);
    }
}
export const characters = async (req, res) => {
    try {
        let character_name = req.query.name ? req.query.name : null;
        let character_age = req.query.age ? req.query.age : null;
        let character_movies = req.query.movies ? req.query.movies : null;

        if(character_name !== null){
            let personajes = await Personaje.findAll({
                where: {
                    nombre: character_name
                },
                attributes: ['imagen', 'nombre']});
            return res.status(200).json(personajes);
        }
        if(character_age !== null){
            let personajes = await Personaje.findAll({
                where: {
                    edad: character_age
                },
                attributes: ['imagen', 'nombre', 'edad']});
            return res.status(200).json(personajes);
        }
        if(character_movies !== null){
            let personaje = Personaje;
            var peliculaSerie = PeliculaSerie;


            peliculaSerie.hasMany(personaje, { foreignKey: "id_pelicula_serie" });
            personaje.belongsTo(peliculaSerie, { foreignKey: "id_pelicula_serie" });

            // let personajes = await Personaje.findAll({
            //     where: {
            //         id_pelicula_serie: character_movies
            //     },
            //     attributes: ['imagen', 'nombre', 'edad']});
            let character = await Personaje.findAll({
                include: [peliculaSerie],
                where: {
                    id_pelicula_serie: character_movies
                },
                // attributes: ['imagen', 'nombre', 'edad']
            });

            return res.status(200).json(character);
        }

        let personajes = await Personaje.findAll({attributes: ['imagen', 'nombre']});
        return res.status(200).json(personajes) 
    }catch(error){
        return res.status(500).json(error);
    }
}
export const characterDetails = async (req, res) => {
    try {
        let personaje = Personaje;
        var peliculaSerie = PeliculaSerie;


        peliculaSerie.hasMany(personaje, { foreignKey: "id_pelicula_serie" });
        personaje.belongsTo(peliculaSerie, { foreignKey: "id_pelicula_serie" });

        let character = await Personaje.findAll({
            include: [peliculaSerie],
            where: {
                id: req.params.id_character
            }
        });

        return res.status(200).json(character)
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
    }
}