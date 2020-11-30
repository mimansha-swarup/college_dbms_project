const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();


router.post('/addTchr', authController.addTchr);
router.post('/addStud', authController.addStud);
router.post('/updateMarks', authController.updateMarks);

module.exports = router;