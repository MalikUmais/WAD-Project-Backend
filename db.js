const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('MongoDB connected');
    }).catch((err) => {
        console.error("Mongo connection error: ", err);
    });
}
module.exports = connectDB;