import express from "express";
import routes from "./routes/index.js";
import { sequelize } from "./models/index.js";
import dotenv from "dotenv";
import { QueryTypes } from "sequelize";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const forceDatabaseRefresh = false;

const allowedOrigins = [
  "http://localhost:3000",
  "https://your-production-url.com",
];
app.use(
  cors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

app.use(express.static("../client/dist"));
app.use(express.json());
app.use(routes);

// Function to create the database if it doesn't exist
const createDatabaseIfNotExist = async () => {
  try {
    // Construct the connection URL using .env values
    const dbUrl = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/postgres`;

    // Connect to the default database
    const defaultSequelize = new sequelize.Sequelize(dbUrl);

    await defaultSequelize.authenticate();

    // Check if the database exists
    const result = await defaultSequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}';`,
      { type: QueryTypes.SELECT }
    );

    // If database doesn't exist, create it
    if (result.length === 0) {
      await defaultSequelize.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`Database ${process.env.DB_NAME} created.`);
    } else {
      console.log(`Database ${process.env.DB_NAME} already exists.`);
    }

    // Close the connection to the default database
    await defaultSequelize.close();
  } catch (error) {
    console.error("Error while checking or creating the database:", error);
    process.exit(1);
  }
};

// Create the database if necessary and sync models
createDatabaseIfNotExist().then(() => {
  const sequelizeUrl = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`;
  const newSequelize = new sequelize.Sequelize(sequelizeUrl);

  newSequelize
    .sync({ force: forceDatabaseRefresh })
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Failed to sync database:", error);
      process.exit(1);
    });
});
