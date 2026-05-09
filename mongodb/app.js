require('dotenv').config();

const express = require('express');
const app = express();


const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(() => {
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


async function runQueryExamples() {
    try {
        //     // Example queries would go here
        const newUser = new User({
            name: 'update khandelwal',
            email: 'update.doe@example.com',
            age: 10,
            isActive: false,
            tags: ['developer', 'javascript']
        });
        console.log('Saving new user:', newUser);
        await newUser.save();
        console.log('New user saved successfully');

        // const findUsers = await User.find({ age: { $lt: 25 } });
        // console.log('Users found with age < 25:', findUsers);

        // const selectfields= await User.find().select('name email -_id');
        // console.log('Selected fields (name and email):', selectfields);

        // const limitResults = await User.find().limit(2).skip(1);
        // console.log('Limited results (2 users):', limitResults);


        // const coutnUsers = await User.countDocuments({ isActive: true });
        // console.log('Count of active users:', coutnUsers);

        // const deleteUser = await User.findByIdAndDelete( newUser._id );
        // console.log('Delete result:', deleteUser);


        const updateUser = await User.findByIdAndUpdate(newUser._id, { age: 30 }, { new: true });
        console.log('Updated user:', updateUser);


        // $set

        // Update field value.

        // {
        //   $set: {
        //     age: 25
        //   }
        // }
        // $unset

        // Remove field.

        // {
        //   $unset: {
        //     age: ""
        //   }
        // }
        // $inc

        // Increase/decrease number.

        // {
        //   $inc: {
        //     age: 1
        //   }
        // }
        // $mul

        // Multiply value.

        // {
        //   $mul: {
        //     salary: 2
        //   }
        // }
        // $rename

        // Rename field.

        // {
        //   $rename: {
        //     name: "fullName"
        //   }
        // }
        // $push

        // Add into array.

        // {
        //   $push: {
        //     skills: "React"
        //   }
        // }
        // $pull

        // Remove from array.

        // {
        //   $pull: {
        //     skills: "React"
        //   }
        // }
        // $addToSet

        // Adds only if not already present.

        // {
        //   $addToSet: {
        //     skills: "Node"
        //   }
        // }
        // $pop

        // Remove first/last array element.

        // {
        //   $pop: {
        //     skills: 1
        //   }
        // }

        // 1 → remove last
        // -1 → remove first

        // 2. Comparison Operators

        // Used in queries.

        // $gt

        // Greater than.

        // { age: { $gt: 18 } }
        // $gte

        // Greater than equal.

        // { age: { $gte: 18 } }
        // $lt

        // Less than.

        // { age: { $lt: 30 } }
        // $lte

        // Less than equal.

        // { age: { $lte: 30 } }
        // $eq

        // Equal.

        // { age: { $eq: 22 } }
        // $ne

        // Not equal.

        // { age: { $ne: 22 } }
        // $in

        // Match from array.

        // {
        //   age: {
        //     $in: [20, 22]
        //   }
        // }
        // $nin

        // Not in array.

        // {
        //   age: {
        //     $nin: [20, 22]
        //   }
        // }
        // 3. Logical Operators
        // $and
        // {
        //   $and: [
        //     { age: { $gt: 18 } },
        //     { city: "Delhi" }
        //   ]
        // }
        // $or
        // {
        //   $or: [
        //     { age: 18 },
        //     { city: "Delhi" }
        //   ]
        // }
        // $not
        // {
        //   age: {
        //     $not: { $gt: 18 }
        //   }
        // }
        // $nor
        // {
        //   $nor: [
        //     { age: 18 },
        //     { city: "Delhi" }
        //   ]
        // }
        // 4. Element Operators
        // $exists

        // Checks field existence.

        // {
        //   age: {
        //     $exists: true
        //   }
        // }
        // $type

        // Checks BSON type.

        // {
        //   age: {
        //     $type: "number"
        //   }
        // }
        // 5. Evaluation Operators
        // $regex

        // Pattern matching.

        // {
        //   name: {
        //     $regex: "^A"
        //   }
        // }

        // Names starting with A.

        // $text

        // Text search.

        // {
        //   $text: {
        //     $search: "developer"
        //   }
        // }
        // 6. Array Operators
        // $all

        // Match all values.

        // {
        //   skills: {
        //     $all: ["React", "Node"]
        //   }
        // }
        // $size

        // Array length.

        // {
        //   skills: {
        //     $size: 2
        //   }
        // }





    } catch (error) {
        console.error('Error running query examples:', error);
    } finally {
        mongoose.connection.close();
    }
}

runQueryExamples();