export const loginCtrl = {}

loginCtrl.getLogin = async (req, res) => {
    res.render("login")
}

loginCtrl.postLogin =  (req, res) => {
    res.redirect("/productos")
}