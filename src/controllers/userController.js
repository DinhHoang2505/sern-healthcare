import userService from "../services/userService"

const userController = {
    async handleLogin(req, res) {
        let username = req.body.username;
        let password = req.body.password;

        if (!username || !password) {
            return res.status(500).json({
                errCode: 1,
                message: "Username or password incorrect",
            })
        }

        let userData = await userService.handleUserLogin(username, password)

        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData ? userData : {}
        })
    }
}

module.exports = userController