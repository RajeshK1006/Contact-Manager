const mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    
        name :{
            type :String,
             required : [true, "enter the user name for registration"]
        },

        email : {
            type: String,
            required : [true,"enter your email"],
            unique :[true, "email is already taken please use different one!!"]
        },

        password: {
            type :String,
            required : [true,"enter youo phone number"]
        } 
    },
{
    timestamps :true
});


module.exports = mongoose.model("User" ,userSchema);
