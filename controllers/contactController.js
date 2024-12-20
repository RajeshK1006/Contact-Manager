const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// to deal with async expections try catch blocks is used , while it can be also done by a middle ware asyncHandler here.
// wrap the entire async function into the asynchandler 

//@desc Get all contacts 
//@route GET /api/contacts
// @access private

const getContact = asyncHandler(async (req,res) =>{
    const contacts = await Contact.find({user_id : req.user_id});
    res.status(200).json(contacts);
});

//@desc create new contact
//@route POST /api/contacts
// @access private

const createContact = asyncHandler( async (req,res) =>{
    console.log("The requs contains the body of ", req.body);
    const {name, age, email , phone} = req.body; 
    const user_id = req.user.user_id; 
    if(!name || !age || !email || !phone){
        res.stauts(400)
        throw new Error ("All the four fields should be filled");
    }

    const newContact = await Contact.create({
        name,age,phone,email,user_id
    })
        res.status(200).json(newContact);
});
//@desc Get the contact for the id 
//@route GET /api/contacts/:id
// @access private

const getContactid = asyncHandler( async (req,res) =>{
    const getcontact_id = await Contact.findById(req.params.id);
    if (!getcontact_id){
        res.status(400);
        throw new Error ("Contact not found. there is ni cnotack with that id here in my db");
    }
    res.status(200).json({
        getcontact_id
    });
});
//@desc Put or update the contact of the id
//@route PUT /api/contacts/:id
// @access private

const putContactid = asyncHandler( async (req,res) =>{
    const getcontact_id = await Contact.findById(req.params.id);
    if (!getcontact_id){
        res.status(400);
        throw new Error ("Contact not found. there is ni cnotack with that id here in my db");
    }

    if(getContactid.user_id.toString() != req.user.id){
        res.status(403);
        throw  new Error("User don't havee the permission to update other users contacts");
    }

    const updated_contact  = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new :true}
    );
    res.status(200).json(updated_contact);
});
//@desc Delete the contact of that id 
//@route DELETE /api/contacts/:id
// @access private

const deleteContactid =  asyncHandler (async (req,res) =>{
    const getcontact_id = await Contact.findById(req.params.id);
    if (!getcontact_id){
        res.status(400);
        throw new Error ("Contact not found. there is ni cnotack with that id here in my db");
    }

    if(getContactid.user_id.toString() != req.user.id){
        res.status(403);
        throw  new Error("User don't havee the permission to update other users contacts");
    }


    await getcontact_id.deleteOne({_id : req.params.id});

    res.status(200).json({
        message: `the contact is deleted with the id: ${req.params.id} `
    });
});


module.exports = {getContact,createContact,getContactid,putContactid,deleteContactid};