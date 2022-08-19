import PeliculaSerie from "../database/models/PeliculaSerie.js";
import Personaje from "../database/models/Personaje.js";

export const createPeliculaSerie = async (req, res) => {
    try {
        let imagen = req.body.imagen ? req.body.imagen : null;
        let titulo = req.body.titulo ? req.body.titulo : null;
        let fecha_creacion = req.body.fecha_creacion ? req.body.fecha_creacion : null;
        let calificacion = req.body.calificacion ? req.body.calificacion : null;
        let id_genero = req.body.id_genero ? req.body.id_genero : null;


        if(titulo === null){
            return res.status(400).json({ message: "El titulo es obligatorio" });
        }
        if(id_genero === null){
            return res.status(400).json({ message: "El genero es obligatorio" });
        }
        
        let peliculaSerie = await PeliculaSerie.create({
            imagen: imagen,
            titulo: titulo,
            fecha_creacion: fecha_creacion,
            calificacion: calificacion,
            id_genero: id_genero
        });
        return res.status(200).json(peliculaSerie) 
    }catch(error){
        return res.status(500).json(error);
    }
}

export const updatePeliculaSerie = async (req, res) => {
    try {
        let id_pelicula_serie = req.body.id ? req.body.id : null;
        if(id_pelicula_serie === null){
            return res.status(400).json({ message: "El id de la pelicula es obligatorio" });
        }

        let pelicula_serie = await PeliculaSerie.findOne({ where: { id: id_pelicula_serie } });
        
        let movie_image = req.body.imagen ? req.body.imagen : null;
        let movie_titulo = req.body.titulo ? req.body.titulo : null;
        let movie_fecha_creacion = req.body.fecha_creacion ? req.body.fecha_creacion : null;
        let movie_calificacion = req.body.calificacion ? req.body.calificacion : null;
        let movie_id_genero = req.body.id_genero ? req.body.id_genero : null;
        

        if(movie_image !== null){
            pelicula_serie.imagen = movie_image;
        }
        if(movie_titulo !== null){
            pelicula_serie.titulo = movie_titulo;
        }
        if(movie_fecha_creacion !== null){
            pelicula_serie.fecha_creacion = movie_fecha_creacion;
        }
        if(movie_calificacion !== null){
            pelicula_serie.calificacion = movie_calificacion;
        }
        if(movie_id_genero !== null){
            pelicula_serie.id_genero = movie_id_genero;
        }
        pelicula_serie.save();

        return res.status(200).json({
            message: "Pelicula actualizada",
            pelicula_serie: pelicula_serie
        })
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
    }
}
export const deletePeliculaSerie = async (req, res) => {
    try{
        let pelicula_serie = await PeliculaSerie.findOne({ where: { id: req.params.id_pelicula_serie } });
        if(!pelicula_serie){
            return res.status(400).json({ message: "No existe la pelicula o serie" });
        }
        pelicula_serie.destroy();
        return res.status(200).json({ message: "Pelicula o serie eliminada" });
    } catch(error) {
        console.log(error)
        return res.status(500).json(error);
    }
}

export const movies = async (req, res) => {
    try {
        let movie_name = req.query.name ? req.query.name : null;
        let movie_genre = req.query.genre ? req.query.genre : null;
        let movie_order = req.query.order ? req.query.order : null;

        if(movie_name !== null){
            let pelicula_serie = await PeliculaSerie.findAll({
                where: {
                    titulo: movie_name
                },
                attributes: ['id','imagen', 'titulo']});
            return res.status(200).json(pelicula_serie);
        }
        if(movie_genre !== null){
            let pelicula_serie = await PeliculaSerie.findAll({
                where: {
                    id_genero: movie_genre
                },
                attributes: ['id','imagen', 'titulo', 'id_genero']});
            return res.status(200).json(pelicula_serie);
        }
        if(movie_order !== null){
            let pelicula_serie = await PeliculaSerie.findAll({
                order: [
                    ['id', movie_order]
                ],
                attributes: ['id', 'imagen', 'titulo', 'fecha_creacion']});
            return res.status(200).json(pelicula_serie);
        }

        let peliculas = await PeliculaSerie.findAll({
            attributes: ['imagen', 'titulo', 'fecha_creacion'],
        });
        return res.status(200).json(peliculas)
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
    }
}

export const movieDetails = async (req, res) => {
    try {
        let id_movie = req.params.id_movie ? req.params.id_movie : null;
        
        if(id_movie === null){
            return res.status(400).json({ message: "El id_movie es obligatorio" });
        }

        var peliculaSerie = PeliculaSerie;
        let personaje = Personaje;
        

        peliculaSerie.hasMany(personaje, { foreignKey: "id_pelicula_serie" });
        personaje.belongsTo(peliculaSerie, { foreignKey: "id_pelicula_serie" });

        let character = await PeliculaSerie.findAll({
            include: [personaje],
            where: {
                id: id_movie
            }
        });

        

        if(character == ""){
            return res.status(400).json({ message: "El id_movie es incorrecto" });
        }

        return res.status(200).json(character)
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
    }
}