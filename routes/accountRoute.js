/* **********************************
* Account routes
* Unit 4, deliver login view activity                                      
* ********************************* */
// Needed Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")


/************************ Routes ***********************/

// Route to build login view
router.get(
    "/login", 
    utilities.handleErrors(accountController.buildLogin))

// Route to build register view
router.get(
    "/register", 
    utilities.handleErrors(accountController.buildRegister))

/* **********************************
* Post Registeration
* Unit 4, Process registration activity                                      
* ********************************* */
router.post(
    '/register', 
    utilities.handleErrors(accountController.registerAccount))



module.exports = router