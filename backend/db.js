import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false, // Disable SQL logging
  }
);

sequelize
  .authenticate()
  .then(() => console.log("✅ PostgreSQL Connected Successfully!"))
  .catch((error) => console.error("❌ Connection Failed:", error));

export default sequelize;
