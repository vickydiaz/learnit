const mongoose = require('mongoose');

const uri = "mongodb+srv://vicky:1234@cluster0-ic8te.gcp.mongodb.net/LearnIt?retryWrites=true&w=majority";

const connectDB = async () => {
    const conn = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
 
    console.log(`MongoDB connected ...`);
};

module.exports = connectDB;