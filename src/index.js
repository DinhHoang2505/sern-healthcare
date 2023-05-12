import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import { connectDB } from "./config/connectDB"

dotenv.config()
const app = express()
const port = process.env.PORT || 6969;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app)
initWebRoutes(app)
connectDB()

app.listen(port, () => console.log(`listening on port ${port}`))