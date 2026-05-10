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
        // 1. CREATE - Save new user
        const newUser = new User({
            name: 'Anish Khandelwal',
            email: 'anish.khandelwal@example.com',
            age: 25,
            isActive: true,
            tags: ['developer', 'javascript', 'nodejs']
        });
        console.log('\n=== CREATE OPERATION ===');
        console.log('Saving new user:', newUser);
        await newUser.save();
        console.log('✓ New user saved successfully\n');

        // 2. READ - Find users by age condition
        console.log('=== READ OPERATIONS ===');
        const findUsers = await User.find({ age: { $lt: 30 } });
        console.log('✓ Users found with age < 30:', findUsers.length, 'users\n');

        // 3. READ - Select specific fields
        const selectFields = await User.find().select('name email age');
        console.log('✓ Selected fields (name, email, age):', selectFields.length, 'users\n');

        // 4. READ - Limit and skip results
        const limitResults = await User.find().limit(5).skip(0);
        console.log('✓ Limited results (5 users):', limitResults.length, 'users\n');

        // 5. READ - Count documents
        const countUsers = await User.countDocuments({ isActive: true });
        console.log('✓ Count of active users:', countUsers, '\n');

        // 6. READ - Find by ID
        const findById = await User.findById(newUser._id);
        console.log('✓ Found user by ID:', findById.name, '\n');

        // 7. UPDATE - Update using findByIdAndUpdate
        console.log('=== UPDATE OPERATIONS ===');
        const updateUser = await User.findByIdAndUpdate(
            newUser._id,
            { age: 30 },
            { new: true }
        );
        console.log('✓ Updated user (age changed to 30):', updateUser.age, '\n');

        // 8. UPDATE - Using $set operator
        const updateWithSet = await User.findByIdAndUpdate(
            newUser._id,
            { $set: { isActive: false } },
            { new: true }
        );
        console.log('✓ Updated with $set operator (isActive):', updateWithSet.isActive, '\n');

        // 9. UPDATE - Using $inc operator (increment)
        const incrementAge = await User.findByIdAndUpdate(
            newUser._id,
            { $inc: { age: 5 } },
            { new: true }
        );
        console.log('✓ Incremented age by 5:', incrementAge.age, '\n');

        // 10. UPDATE - Using $push operator (add to array)
        const addTag = await User.findByIdAndUpdate(
            newUser._id,
            { $push: { tags: 'mongodb' } },
            { new: true }
        );
        console.log('✓ Added tag to array:', addTag.tags, '\n');

        // 11. UPDATE - Using $pull operator (remove from array)
        const removeTag = await User.findByIdAndUpdate(
            newUser._id,
            { $pull: { tags: 'javascript' } },
            { new: true }
        );
        console.log('✓ Removed tag from array:', removeTag.tags, '\n');

        // 12. UPDATE - Update multiple documents
        const updateMultiple = await User.updateMany(
            { isActive: true },
            { $set: { isActive: true } }
        );
        console.log('✓ Updated multiple documents:', updateMultiple.modifiedCount, 'modified\n');

        // 13. QUERY - Using $gt, $gte, $lt, $lte
        console.log('=== QUERY WITH OPERATORS ===');
        const ageRange = await User.find({ age: { $gte: 20, $lte: 35 } });
        console.log('✓ Users with age between 20-35:', ageRange.length, 'users\n');

        // 14. QUERY - Using $in operator
        const inQuery = await User.find({ age: { $in: [25, 30, 35] } });
        console.log('✓ Users with age in [25, 30, 35]:', inQuery.length, 'users\n');

        // 15. QUERY - Using $regex for pattern matching
        const regexQuery = await User.find({ name: { $regex: 'anish', $options: 'i' } });
        console.log('✓ Users matching name pattern (case-insensitive):', regexQuery.length, 'users\n');

        // 16. DELETE - Delete user by ID
        console.log('=== DELETE OPERATIONS ===');
        const deleteUser = await User.findByIdAndDelete(newUser._id);
        console.log('✓ Deleted user:', deleteUser.name, '\n');

        // 17. DELETE - Delete multiple documents
        const deleteMultiple = await User.deleteMany({ isActive: false });
        console.log('✓ Deleted multiple inactive users:', deleteMultiple.deletedCount, 'deleted\n');

        // 18. AGGREGATE - Group and count
        console.log('=== AGGREGATE OPERATIONS ===');
        const aggregateResult = await User.aggregate([
            { $group: { _id: '$isActive', count: { $sum: 1 } } }
        ]);
        console.log('✓ Users grouped by isActive:', aggregateResult, '\n');





    } catch (error) {
        console.error('Error running query examples:', error);
    } finally {
        mongoose.connection.close();
    }
}

runQueryExamples();