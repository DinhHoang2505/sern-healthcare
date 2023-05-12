import db from "../models"
import CRUDService from "../services/CRUDService"

const homeController = {
    async home(req, res) {
        try {
            let data = await db.User.findAll({})
            return res.render('homepage', {
                data: JSON.stringify(data)
            })

        } catch (error) {
            console.log(error)
        }

    },

    about(req, res) {
        return res.render('layout/about')
    },

    getCRUD(req, res) {
        return res.render('crud')
    },

    async postCRUD(req, res) {
        let message = await CRUDService.createNewUser(req.body)
        console.log(message);
        console.log(req.body);
        return res.render('postcrud')
    }
}

module.exports = homeController