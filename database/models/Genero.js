import { Model, DataTypes } from 'sequelize';
import sequelize from '../db.js';

class Genero extends Model {}
Genero.init({
    nombre: DataTypes.STRING,
    imagen: DataTypes.STRING,
},{
    sequelize,
    modelName: "genero"
});
export default Genero;
