import express from "express";
import homeController from "../controllers/homeController";
const router = express.Router()

const initWebRoutes = (app) => {

    app.use('/about', homeController.about);
    app.use('/', homeController.home);

}

module.exports = initWebRoutes