
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database is connected successfully");
    }
    catch (e) {
        console.error("Database connection is failed", e);
    }
}

module.exports = connectDB;