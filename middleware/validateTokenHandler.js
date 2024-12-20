// all the public routes and now going to get converted into the proivate routes
// and all these routes  access are going to be validated by this validator (jwt)
// only the user/current route is private now 
// to simply put this in a nutshell
// only the verified users (logged in users) should be able to access these roues to get the informations on that route or page

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


// validation function of the jwt 


// in the request sent by the client
// jwt can be found in the headers with filed name authorization o Authorization 
// which will have an Key val =  Bearer space and that JWT or accesstoken whoch contains an header and the payload;
// in the backend we to be able to handle both the case of occurences of the jwt from the client 

const validationToken = asyncHandler(async(req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization ;
    if(authHeader && authHeader.startsWith("Bearer")){
        token =  authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded) =>{
            if(err){
                res.status(401);
                throw new Error("User is not an authorized one!!!");
            }
            
            console.log(decoded);
            req.user = decoded.user;
            next();
        });
    }
 else if (!authHeader) {
    // Authorization header is missing
    res.status(401);
    throw new Error(
        "Authorization header is missing. Please include a valid Bearer token in the header."
    );
} else if (!authHeader.startsWith("Bearer")) {
    // Authorization header exists but doesn't start with 'Bearer'
    res.status(401);
    throw new Error(
        "Invalid Authorization header format. It must start with 'Bearer <token>'."
    );
}
    if(!token){
        res.status(401);
        throw new Error("USER IS not authorized or the token is missing");
    }
    
});

module.exports = {validationToken};

// const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");

// // JWT validation middleware
// const validationToken = asyncHandler(async (req, res, next) => {
//     let token;
//     // Check for Authorization header (case-insensitive)
//     let authHeader = req.headers.Authorization || req.headers.authorization;

//     if (authHeader && authHeader.startsWith("Bearer")) {
//         // Extract token
//         token = authHeader.split(" ")[1];

//         // Verify token
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//             if (err) {
//                 res.status(401);
//                 throw new Error("User is not authorized. Invalid token.");
//             }

//             // Attach decoded payload to request object
//             req.user = decoded;

//             // Proceed to next middleware/handler
//             next();
//         });
//     } else {
//         res.status(401);
//         throw new Error("Authorization token is missing.");
//     }
// });

// module.exports = { validationToken };
