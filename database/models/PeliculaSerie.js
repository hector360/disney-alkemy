import { Model, DataTypes } from 'sequelize';
import sequelize from '../db.js';

class PeliculaSerie extends Model {}
PeliculaSerie.init({
    imagen: DataTypes.STRING,
    titulo: DataTypes.STRING,
    fecha_creacion: DataTypes.STRING,
    calificacion: DataTypes.INTEGER,
    id_genero: DataTypes.INTEGER,
},{
    sequelize,
    modelName: "pelicula_serie"
});
export default PeliculaSerie;
