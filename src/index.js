const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

// Define the path to your templates folder
const templatePath = path.join(__dirname, "../templates");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set Handlebars as the view engine
app.set("view engine", "hbs");

// Set the path to your views
app.set("views", templatePath);

// Routes
app.get("/", (req, res) => {
    res.render("login"); 
});

app.get("/signup", (req, res) => {
    res.render("signup"); 
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };

    await collection.insertMany([data]);

    res.render("home"); // Renders 'home.hbs' from the templates folder after signup
});






app.post("/login", async (req, res) => {
   
    try{
        const check=await collection.findOne({name:req.body.name})

        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send("wrong password")
        }
        res.render("home"); 
    }
    catch{
res.send("wrong details")
    }
  // Renders 'home.hbs' from the templates folder after signup
});




app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
