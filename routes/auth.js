const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();


router.post('/addTchr', authController.addTchr);
router.post('/addStud', authController.addStud);
router.post('/updateMarks', authController.updateMarks);
router.post('/search', authController.search);
router.post('/getDetails', authController.getDetails);
router.post('/remove', authController.remove);
router.post('/addLink', authController.addLink);
router.post('/getLog', authController.getLog);
router.post('/viewDetails', authController.viewDetails);
router.post('/teacherDetails', authController.teacherDetails);


module.exports = router;