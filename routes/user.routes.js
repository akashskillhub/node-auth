const { allUsers, getProfile } = require("../controllers/user.controller")
const { privateRoutes } = require("../middlewares/auth.middleware")

const router = require("express").Router()

router
    .get('/', privateRoutes, allUsers)
    .get('/profile', getProfile)

module.exports = router