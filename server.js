require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const path = reqire('path')


//import routes
const authRoute = require("./routes/auth")
const ToDosRoute = require("./routes/todos")

app.use(express.static(path.resolve(__dirname, './client/build')))

app.get("*", (res, req) => {
    res.sendFile(path.resolve(__dirname, './client/build', "index.html"))
})


const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())


app.get("/api", (req, res) => {
    res.send("Fullstack React Course Express Server")
})



app.use("/api/auth", authRoute)
app.use("/api/todos", ToDosRoute)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database")

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })


