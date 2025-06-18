const jwt = require("jsonwebtoken")
const privateRoutes = (req, res, next) => {
    // check user is loggedin or not
    const token = req.cookies.AUTH_USER
    if (!token) {
        return res.status(401).json({ message: "no cookie found" })
    }
    jwt.verify(token, "securepassword", (err, data) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: "invalid token" })
        }
        next()
    })

}

module.exports = { privateRoutes }