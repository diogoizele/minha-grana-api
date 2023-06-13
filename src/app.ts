import "reflect-metadata";
import "dotenv/config";
import express from "express";

import routes from "./routes";
import { AppDataSource } from "./config/data-source";
import { authenticate } from "./middlewares";


const app = express();
const port = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected 🎉");
  })
  .catch((error) => {
    console.log("Error connecting to database 😢");
    console.log(error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authenticate);

app.use("/api", routes);



app.listen(port, () => {
  console.log(`Server running on port ${port} 🚀`);
});
