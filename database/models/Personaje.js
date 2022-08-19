
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db.js';

class Personaje extends Model {}
Personaje.init({
    imagen: DataTypes.STRING,
    nombre: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    peso: DataTypes.INTEGER,
    historia: DataTypes.STRING,
    id_pelicula_serie: DataTypes.INTEGER,
},{
    sequelize,
    modelName: "personaje"
});
export default Personaje;

