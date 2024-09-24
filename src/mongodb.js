const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/LoginSignup")
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch(() => {
    console.log("Failed to connect to MongoDB");
});

const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model("collection", LogInSchema);

module.exports = collection; 
