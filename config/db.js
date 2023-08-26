const mongoose = require('mongoose');

const connectDB = async () => {

    try{
        
        await mongoose.connect('mongodb://127.0.0.1:27017/freetalk', {
            useNewURLParser: true
        });

        console.log("MongoDB Connected..!!");

    }catch(err){
        console.log(err);
        console.log("Not Connected...!!");
    }
}

module.exports = connectDB;