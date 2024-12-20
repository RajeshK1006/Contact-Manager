const express = require("express");

const router = express.Router();

const {register_user,login_user,current_user} = require("../controllers/userController")

const {validationToken} = require("../middleware/validateTokenHandler");

router.post("/register",register_user);

router.post("/login",login_user);


router.get("/current", validationToken ,current_user);

module.exports = router;