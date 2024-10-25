import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import express from "express"
import routes from "./routes.js"

dotenv.config("../.env")
let app;
app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
app.use('/', routes)
app.listen(process.env.PORT, '0.0.0.0',() => {
    console.log(`App is running on PORT ${process.env.PORT}`)
})