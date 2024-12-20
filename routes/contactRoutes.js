const express = require("express")
const router = express.Router();

// router.route("/").get((req,res) => {
//     res.status(200).json({message: "hello this is an saple route"});
// });

// defining different types of urls to perform the CRUD operations


const {getContact,createContact,deleteContactid,getContactid,putContactid} = require("../controllers/contactController");
const { validationToken } = require("../middleware/validateTokenHandler");

router.use(validationToken);

router.route("/").get(getContact);

router.route("/").post(createContact);

router.route("/:id").get(getContactid);

router.route("/:id").put(putContactid);

router.route("/:id").delete(deleteContactid);


module.exports = router;