const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
const User = require('../models/userModel');
const router = express.Router();



router.post('/', async (req, res) => {
    // takes data from req.body and destructured the data using name , email, age that all are the frontend data.
    const { name, email, age } = req.body;
    // send data to data base using User module
    // const User= require('./models/userModel');
    try {
        const useradded = await User.create({
            name: name,
            email: email,
            age: age
        })

        res.status(201).json(useradded);


    }
    catch (error) {

        res.status(400).json({ error: error.message });


    }




})



// Set up a basic route to get all user
router.get("/", async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);

    }
    catch (error) {
        res.status(500).json({ error: error.message });


    }




});
// get a single user using id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    // params are used to fetch the data from the url as parameters
    
    try {

        const singleuser = await User.findById({ _id: id });
        res.status(200).json(singleuser);



    }
    catch (error) {
        res.status(500).json({ error: error.message });


    }
})

// delete by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteUser = await User.findByIdAndDelete({ _id: id });
        res.status(200).json(deleteUser);

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})
// update data of user
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body
    try {
        const updateUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json(updateUser);




    } catch (error) {
        res.status(500).json({ error: error.message });

    }

})
module.exports = router;
