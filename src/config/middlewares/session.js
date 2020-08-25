const User = require("../../app/admin/models/Users")

function isLoggedRedirectToUsers(req, res, next) {
    if (req.session.userID) {
        return res.redirect('/admin')
    }

    next()
}

function onlyUsers(req, res, next) {
    if (!req.session.userID)
        return res.redirect('/admin/login')
    next()
}

async function isAdmin(req, res, next) {
    const id = req.session.userID

    let user = await User.findOne({where: {id} })

    if (user.is_admin == false) {
        return res.render('admin/users/index', {
            error: 'Você não tem permissão!'
        })
    }

    next()

}

module.exports = {
    isLoggedRedirectToUsers,
    onlyUsers,
    isAdmin
}

