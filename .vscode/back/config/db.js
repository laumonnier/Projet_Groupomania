const mongoose = require("mongoose");

mongoose
    .connect(
        'mongodb+srv://' + process.env.SECRET_DB_USER + '@cluster0.ek70vk2.mongodb.net/Projet_Groupomania',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    )
    .then(() => console.log("Connected to MongoDB !"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));