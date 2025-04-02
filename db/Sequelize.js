import { Sequelize } from "sequelize";

const {DATABASE_DIALECT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME, DATABASE_PORT} = process.env

const sequelize = new Sequelize({
    dialect: DATABASE_DIALECT,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    port: DATABASE_PORT,
    dialectOptions:{
        ssl: true,
    }
});

try {
    await sequelize.authenticate();
    console.log("Successful connection АРРРРР")
} catch (error) {
    console.log(`Error connection: ${error}`)
}

export default sequelize;