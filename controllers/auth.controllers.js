const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const register = async (req, res) => {
    const { password, email } = req.body
    const result = await User.findOne({ email })
    if (result) {
        return res.status(401).json({ message: "email already exist" })
    }
    const hash = await bcrypt.hash(password, 10)
    await User.create({ ...req.body, password: hash })
    res.json({ message: "register success" })
}
const login = async (req, res) => {

    const { email, password } = req.body
    const result = await User.findOne({ email })
    if (!result) {
        return res.status(401).json({ message: "email does not exist" })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(401).json({ message: "invalid password" })
    }

    const token = jwt.sign({ _id: result._id }, "securepassword", { expiresIn: "1m" })

    res.cookie("AUTH_USER", token, { maxAge: 1000 * 60, httpOnly: true, secure: false })
    res.json({ message: "login success", result })
}

const logout = (req, res) => {
    res.clearCookie("AUTH_USER")
    res.json({ message: "logout success" })
}
module.exports = { register, login, logout }