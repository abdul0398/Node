const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();
const Agenda = require('agenda');
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


const url = 'mongodb://127.0.0.1:27017/test';
mongoose.connect(url).then(()=>{
    console.log("Db Connected");
});



// Agenda
const agenda = new Agenda({
    db: {address: url, collection:"Agenda"}
});
agenda.define('Just Hello', (job, done) => {
    console.log("Hello Scheduling");
    done();
});

(async ()=> {
    await agenda.start();
    await agenda.schedule('in 2 seconds', 'Just Hello');
  })();
//



const projectSchema = mongoose.Schema({
    name: String,
    link: String,
    desc:String
});

const Project = new mongoose.model("Project", projectSchema);

app.get('/', async (req, res) =>{
    const projects = await Project.find();
    console.log(projects);
    res.render('index.ejs', {projects:projects});
})
app.get('/insert', async (req, res) =>{
    res.render('projectInput.ejs');
})

app.post('/insert', async (req, res) =>{
    const {name, link, desc} = req.body;
    await Project.create({ name:name, link:link, desc:desc });
    res.redirect('/');
})

app.listen(3000, ()=>{
    console.log("Server started");
})