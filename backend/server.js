const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// const User = require("./models/userModel");
// data comming frombackend convert into json

app.use(express.json());
const cors = require("cors");

app.use(cors());
const userRoute = require('./routes/userRoutes');





mongoose.connect(process.env.URI).then(() => {
    console.log("connected succesfully")
    app.listen(process.env.PORT || 8000, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Server is running on http://localhost:5000/api/user", process.env.PORT);
        }

    });
})
    .catch((error) => {
        console.log("error" + error);

    })




app.use('/api/user', userRoute);


