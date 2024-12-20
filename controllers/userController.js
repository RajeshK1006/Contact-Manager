const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

// to deal with async expections try catch blocks is used , while it can be also done by a middle ware asyncHandler here.
// wrap the entire async function into the asynchandler 

//@desc register the contacts 
//@route POST /api/users/register
// @access public

const register_user = asyncHandler(async (req,res) =>{

// we can't store the password as it is in the db for safety purposes so hashing it is very important and necessary so bcrypt package is used
// so once the password from the request is recieved it should be hashed usinig bcrypt 


    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("All the fields are mandatory for registration");
    } 

    const userAvailable = await  userModel.findOne({email})

    if(userAvailable){
        res.status(400);
        throw new Error("User is already available");
    }

    const hashedPassword = await bcrypt.hash(password,10);
    console.log("hashed password is ",hashedPassword);

    const registering_user = await userModel.create({
        name,
        email,
        password : hashedPassword,
    }) ;

    console.log(`user is created ${registering_user}`);
    if(registering_user){
        res.status(201).json({
            id : registering_user.id,
            email : registering_user.email
        });
    }
    else{
        throw new Error("User data is not Valid");
    }

    res.status(200).json({
            mesage: "Register the user"
        });


});


//@desc Login the contacts 
//@route POST /api/users/login
// @access public

const login_user = asyncHandler(async (req,res) =>{

    const { email,password } = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("All the fields are mandatory for the login");
    }
    // check if an login user is availbele in the db
    const user  = await userModel.findOne( {email});
    // if yes check if the passwards are matching for authentication
    if (user && (await bcrypt.compare(password ,user.password))){
        // if that is matched provide the JWT
        // so what is accesstoken anyway ?
        // In simpler terms Jwt is an ncrypted token or hashed string which contains 2 parts
        // 1.header 
        // 2.payload {content that is passed to the url or route}

        // to creaste an access token jwt is used using .sign() which takes the following params like the data username, email , password etcc...

        const accessToken = jwt.sign({
            user: {
                username : user.name,
                email : user.email,
                id : user.id,
            }
        }, process.env.ACCESS_TOKEN_SECRET, 
        // secret keey for security purpose
        { expiresIn : "15m"} 
        // defining the expiring time for the token for secured sessions
    );


        res.status(200).json({accessToken});
        
    }

    else{
        res.status(401)
        throw new Error("email or password is not valid!!");
    }

    res.status(200).json({
            mesage: "Loggin user"
        });
});

//@desc show the current user 
//@route GET /api/users/current
// @access private

const current_user = asyncHandler(async (req,res) =>{
    
    res.json(req.user);
});



module.exports = {register_user,login_user,current_user} ;