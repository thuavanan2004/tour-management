import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import sequelize from "./config/database";
import clientRouter from "./routes/client/index.route";

sequelize;
const app: Express = express();
const port: string | number = process.env.PORT || 3002;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

clientRouter(app);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
