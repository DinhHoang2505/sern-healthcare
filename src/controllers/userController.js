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
        let id = req.body.id
        let users = await userService.getAllUsers(id)

        return res.status(200).json({
            errCode: 0,
            message: "OK",
            users
        })
    }
}

module.exports = userController