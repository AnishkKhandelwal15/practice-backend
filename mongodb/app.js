const express = require('express');
const app = express();


const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://anishkkhandelwal04:anishkkhandelwal04@cluster0.74ogb4i.mongodb.net/').then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: { type: Date, default: Date.now }
});

//user modal

const User = mongoose.model('User', userSchema);


async function runQueryExamples(){
    try {
        // Example queries would go here
        // const newUser = new User({
        //     name: 'John Doe',
        //     email: 'john.doe@example.com',
        //     age: 10,
        //     isActive: true,
        //     tags: ['developer', 'javascript']
        // });
        // console.log('Saving new user:', newUser);
        // await newUser.save();
        // console.log('New user saved successfully');

        // const findUsers = await User.find({ age: { $lt: 25 } });
        // console.log('Users found with age < 25:', findUsers);

        // const selectfields= await User.find().select('name email -_id');
        // console.log('Selected fields (name and email):', selectfields);

        // const limitResults = await User.find().limit(2).skip(1);
        // console.log('Limited results (2 users):', limitResults);
       } catch (error) {
        console.error('Error running query examples:', error);
    }finally {       
        mongoose.connection.close();
    }
}

runQueryExamples();