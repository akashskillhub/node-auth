const User = require("../models/User")

const allUsers = async (req, res) => {
    const result = await User.find()
    res.json({ message: "user fetch success", result })
}
const getProfile = async (req, res) => {
    res.json({ message: "profile fetch success" })
}

module.exports = { allUsers, getProfile }