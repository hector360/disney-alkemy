
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db.js';

class Usuario extends Model {}
Usuario.init({
    imagen: DataTypes.STRING,
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
},{
    sequelize,
    modelName: "usuario"
});
export default Usuario;

