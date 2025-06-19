let express = require('express')
let app = express()
let mongoose = require('mongoose');
const port = 2500;
let cors = require('cors')
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/jaswanth").then(() => console.log('db connect')).catch((err) => console.log(err))

let collect = mongoose.model('student', {
    uname: String, uPhone: String, uGmail:String
})

app.post("/", async (req, res) => {
    let { uname, uPhone, uGmail } = req.body
    let data = new collect({ uname, uPhone, uGmail })
    await data.save()
    res.json({ msg: data })
})

app.get("/", async (req, res) => {
    let data = await collect.find()
    res.json({ msg: data })
})
app.get("/:id", async (req, res) => {
    let { id } = req.params;
    let data = await collect.findById(id)
    res.json({ msg: data })
})
app.delete("/:id", async (req, res) => {
    let { id } = req.params;
    await collect.findByIdAndDelete(id)
    res.json({ msg: "data deleted" })
})
app.put("/:id", async (req, res) => {
    let { id } = req.params;
    let data = await collect.findById(id)
    data.uname = req.body.uname;
    data.uPhone = req.body.uPhone;
    data.uGmail = req.body.uGmail;
    await data.save()
    res.json({ msg: data })
})
app.listen(port, () => console.log('server running on ' + port))