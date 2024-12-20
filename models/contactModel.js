const mongoose = require("mongoose");
// this file focuss on defining the structure or the scheme of our database

const contactSchema = mongoose.Schema({
    user_id :{
        type : mongoose.Schema.Types.ObjectId,
        require :true,
        ref : "user"
    },
    name :{
        // data type of that field
        type: String,
        // required or not 
        required : [true, "please add the contact name"], 
    },

    age :{
        type :Number,
        require : [true, "please add the age of yours"],
    },

    phone :{
        type :String,
        require : [true, "please add the conotact ph number of yours"],
    },

    email :{
        type :String,
        require : [true, "please add the contact email of yours"],
    }},
    {
        timestamps :true
    }

);

module.exports = mongoose.model("Contact", contactSchema);