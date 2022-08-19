import { Sequelize } from "sequelize";
import database from "../config.js";

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: "mysql"
    }
);

export default sequelize;