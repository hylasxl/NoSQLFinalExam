import express from "express"
import { configDotenv } from "dotenv"
import { connectDatabase } from "./configs/mongo.config.js"
import path from "path"
import url from "url"
import bodyParser from "body-parser"
import studentModel from "./models/student.js"

configDotenv()

const defaultPORT = 5000
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || defaultPORT
const app = express()

connectDatabase()
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get('/', (req, res) => {
    res.render('pages/homePage')
})

app.post('/submit', (req, res) => {
    const data = req.body || {}
    try {
        studentModel.insertMany({
            ten: data.ten,
            gioitinh: data.gioitinh,
            tuoi: data.tuoi,
            diemToan: data.toan,
            diemLy: data.ly,
            diemHoa: data.hoa,
        })
    } catch (e) {
        throw new Error("Missing")
    } finally {
        res.redirect("/view")
    }
})

app.get('/view', async (req, res) => {
    try {
        const data = await studentModel.find().exec();
        res.render('pages/view', { data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal server error');
    }
});


app.listen(PORT || 5000, () => {
    console.log(`Server is listening on port ${PORT}`)
})