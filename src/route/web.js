import homeController from "../controllers/homeController";

const initWebRoutes = (app) => {
    app.get('/deleteCRUD', homeController.deleteCRUD);
    app.put('/putCRUD', homeController.putCRUD);
    app.get('/editCRUD', homeController.editCRUD);
    app.get('/displayCRUD', homeController.displayCRUD);
    app.post('/postCRUD', homeController.postCRUD);
    app.get('/getCRUD', homeController.getCRUD);
    app.get('/about', homeController.about);
    app.get('/', homeController.home);
}

module.exports = initWebRoutes