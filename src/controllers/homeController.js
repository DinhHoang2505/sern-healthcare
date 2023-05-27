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
        await CRUDService.createNewUser(req.body)
        return res.redirect('displayCRUD')
    },

    async displayCRUD(req, res) {
        let data = await CRUDService.getAllUser()
        return res.render('displayCRUD', { data })
    },

    async editCRUD(req, res) {
        let userId = req.query.id
        if (userId) {
            let userData = await CRUDService.getUserInfoById(userId)
            if (userData) {
                return res.render('editCRUD', { userData })
            }
            return res.send('<h1>User not found!!!</h1>')
        }
        return res.send('<h1>User not found!!!</h1>')
    },

    async putCRUD(req, res) {
        let data = req.body
        await CRUDService.updateUserData(data)
        return res.redirect('displayCRUD')
    },

    async deleteCRUD(req, res) {
        let userId = req.query.id
        if (userId) {
            await CRUDService.deleteUserInfoById(userId)
            return res.redirect('displayCRUD')
        }
        return res.send('<h1>User not found!!!</h1>')
    },

}

module.exports = homeController