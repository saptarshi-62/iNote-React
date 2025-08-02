// filepath: f:\website\inote\backend\db.js
const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://sapdey62:fhYFdn3v2PWPOo7n@cluster0.c8dotpg.mongodb.net/iNote?retryWrites=true&w=majority"
//process.env.MONGO_URI //||"mongodb://localhost:27017/inote";

const connectToMongo = () => {
    console.log("Mongo URI from env:", mongoURI);
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("Connected to MongoDB successfully");
        })
        .catch((err) => {
            console.error("Failed to connect to MongoDB:", err);
        });
}

module.exports = connectToMongo;
