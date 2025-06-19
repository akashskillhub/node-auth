const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParse = require("cookie-parser")
const { privateRoutes } = require("./middlewares/auth.middleware")
require("dotenv").config()
const app = express()
app.use(express.json())
app.use(cookieParse())
app.use(express.static("dist"))
app.use(cors({ origin: "http://localhost:5173", credentials: true }))

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/user", require("./routes/user.routes"))

mongoose.connect(process.env.MONGODB_URL)
mongoose.connection.once("open", () => {
    console.log("db connected")
    app.listen(process.env.PORT, console.log("server running"))
})

// aws e2c