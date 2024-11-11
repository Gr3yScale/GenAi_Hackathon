import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import express from "express"
import routes from "./routes.js"

dotenv.config("../.env")
let app;
app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', (req, res, next) => { next() }, routes)
app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on PORT ${process.env.PORT || 3000}`)
})