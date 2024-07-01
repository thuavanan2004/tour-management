import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();

const port: string | number = process.env.PORT || 3002;

app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
