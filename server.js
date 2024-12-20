console.log("i am in express project");
// similar to falsk app importing and initializing an local host backend api to handle the routes, requests, dataflow and similar web based activities in the backend
// importing the express 
const express = require("express");
const app = express();


// importing the error handler for requests json objects
const errorhandler = require("./middleware/errorHandler.js");

// define the port for the server in the .env file
// process module is used to fetch the creds from the .env file (like load_dotenv from python)
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;
// usualy the port is defined in the .env file in the production 

// inorder to test api's an client is required, maybe use thunderclient or postman or anyother similars 
// thunder client can be installed via vscode extensions

// importing the db connection from mongodb
const connectDB = require("./config/dbconnection.js");


// middle man to parse the info or body of the request from the client
app.use(express.json()); 

// configure the routes
app.use("/api/contacts" , require("./routes/contactRoutes"));
app.use("/api/users" , require("./routes/userRoutes"));
// making use of the middle ware
app.use(errorhandler);


app.listen(port, ()=> {
    console.log(`Server is running on the port  ${port}`);
});

// calling the connection of the db (mongodb)
connectDB();

app.use((req, res, next) => {
    const requestedRoute = req.originalUrl;
    console.log("Requested URL:", req.originalUrl); 
    const method = req.method;
    res.status(404).json({
        message: `Route ${method} ${requestedRoute} not found`,
        error: "Not Found",
    });
});
