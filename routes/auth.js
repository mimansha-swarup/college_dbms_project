const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();


router.post('/addTchr', authController.addTchr);
router.post('/addStud', authController.addStud);
router.post('/updateMarks', authController.updateMarks);
router.post('/search', authController.search);
router.post('/getDetails', authController.getDetails);
router.post('/remove', authController.remove);

module.exports = router;