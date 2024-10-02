import { Sequelize } from "sequelize-typescript";
import Article from "./models/Article";

const env = process.env;
const dbObj = {
  database: env.DB_NAME,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  port: 5432,
};

export const sequelize = new Sequelize({
  dialect: "postgres",
  ...dbObj,
});

sequelize.addModels([Article]);
