/* **********************************
* Account routes
* Unit 4, deliver login view activity                                      
* ********************************* */
// Needed Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')


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
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount))

// Process the login attempt
router.post(
  "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin))

/* ************************************
 *  Deliver Account Management View
 *  Unit 5, JWT Authorization activity
 *  ******************************** */
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildManagement)
)

/* ****************************************
 *5 /5
 **************************************** */
router.get(
  "/update/:id",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildUpdate)
)

/* ****************************************
 *5 -5
 **************************************** */
router.post(
  "/update",
  utilities.checkLogin,
  regValidate.updateRules(),
  regValidate.checkEditData,
  utilities.handleErrors(accountController.processUpdate)
)

/* ****************************************
5-5
 **************************************** */
router.post(
  "/password",
  utilities.checkLogin,
  regValidate.passwordRule(),
  regValidate.checkPassword,
  utilities.handleErrors(accountController.processPassword)
)

/* ****************************************
5-6
 **************************************** */
router.get(
  "/logout",
  utilities.handleErrors(accountController.accountLogout)
)

    
module.exports = router
