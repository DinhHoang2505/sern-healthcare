const homeController = {
    home(req, res) {
        return res.render('homepage')
    },

    about(req, res) {
        return res.render('layout/about')
    }
}

module.exports = homeController