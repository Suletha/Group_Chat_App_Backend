//IMPORT EXPRESS
const express = require("express");
//IMPORT CONTROLLER
const mainpageController = require('../controllers/mainpage-controller');

//CREATE INSTANCE OF ROUTER
const router = express.Router();
//CREATE A ROUTER FOR MAINPAGE

router.get('/home',mainpageController.gethomePage);
router.get('',mainpageController.geterrorPage);

module.exports = router;

