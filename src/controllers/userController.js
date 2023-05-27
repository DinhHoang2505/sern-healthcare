import userService from "../services/userService"

const userController = {
    async handleLogin(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        let userData = await userService.handleUserLogin(username, password)

        if (!username || !password) {
            return res.status(500).json({
                errCode: 1,
                message: "Username or password incorrect",
            })
        } else {
            return res.status(200).json({
                errCode: userData.errCode,
                message: userData.errMessage,
                userData: userData ? userData : {}
            })
        }
    },

    async handleGetAllUsers(req, res) {
        let id = req.query.id
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing required parameters",
                users: []
            })
        }

        let users = await userService.getAllUsers(id)

        return res.status(200).json({
            errCode: 0,
            message: "OK",
            users
        })
    },

    async handleCreateNewUser(req, res) {
        let message = await userService.createNewUser(req.body)
        console.log(message)
        return res.status(200).json(message)
    },

    async handleEditUser(req, res) {
        let data = req.body
        let message = await userService.updateUserData(data)
        return res.status(200).json(message)
    },

    async handleDeleteUser(req, res) {
        let id = req.query.id
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing required parameters",
            })
        }
        let message = await userService.deleteUser(id)
        return res.status(200).json(message)

    },

    async handleGetUserByEmail(req, res) {
        let email = req.body.email
        let isCheck = await userService.checkUserEmail(email)

        if (isCheck) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Email already used",
            })
        } else {
            return res.status(200).json({
                errCode: 0,
                errMessage: "OK",
            })
        }

    },
}

module.exports = userController