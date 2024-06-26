import { Sequelize } from "sequelize";
const db = new Sequelize('tracer_study_dbs','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;