import express from "express"
import homeRoutes from "./routes/home.js"

const app = express()
const PORT = 5000

app.use(express.json())

app.use('/', homeRoutes)

app.listen(PORT, () => {
    console.log("App is running at port " + PORT)
})