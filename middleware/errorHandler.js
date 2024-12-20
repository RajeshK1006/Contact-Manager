
const errorhandler= (err, req, res, next) =>{
    const statuscode = res.statusCode ? res.statusCode : 500;
    switch(statuscode){
        case 400:
            res.json({
                title: "Validation FAILED",
                message : err.message,
                stackTrace :err.stack,
            });
            break;

        case 401:
            res.json({
                title:"UNAUTORIZED CLIENT",
                message : err.message,
                stackTrace : err.stack,
            });
            break;
        case 403:
            res.json({
                title:"FORBIDDEN CLIENT",
                message : err.message,
                stackTrace : err.stack,
            });
            break;
        case 404:
            res.json({
                title:"NOT FOUND ERROR",
                message :err.message,
                stackTrace :err.stack,
            });
            break;
        
        case 500:
            res.json({
                title:"Internal Server error",
                message :err.message,
                stackTrace :err.stack,
            });
            break;
        default:
            console.log("All good so far!! no errors catched!!")
        }
   

};

module.exports = errorhandler;