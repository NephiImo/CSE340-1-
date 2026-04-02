// Needed Resources 
const express = require("express");
const router = new express.Router(); 
const invController = require("../controllers/invController");
const utilities = require("../utilities");
const invValidate = require("../utilities/inventory-validation");

/* Routes */

// Route to build inventory by classification view
router.get("/type/:classificationId", 
utilities.handleErrors(invController.buildByClassificationId));

// Route to build vehicle detail view
router.get("/detail/:id", 
utilities.handleErrors(invController.buildDetail))

// Error route
router.get("/broken", 
utilities.handleErrors(invController.throwError))

// Route to build management view (mounted at /inv in server.js)
router.get("/", 
utilities.checkAccountType,
utilities.handleErrors(invController.buildManagementView))

// Route to build add classification view
router.get("/add-classification", 
utilities.checkAccountType,
utilities.handleErrors(invController.buildAddClassification))

//Process add classification
router.post("/add-classification", 
utilities.checkAccountType,
invValidate.classificationRules(),
invValidate.checkClassificationData,
utilities.handleErrors(invController.addClassification))


// Route to build add inventory view
router.get("/add-inventory", 
utilities.checkAccountType,
utilities.handleErrors(invController.buildAddInventory))

// Process add inventory
router.post("/add-inventory", 
utilities.checkAccountType,
invValidate.inventoryRules(),
invValidate.checkInventoryData,
utilities.handleErrors(invController.addInventory))

/* ****************************************
 * Get vehicles for AJAX Route
 * Unit 5, Select inv item activity
 **************************************** */
router.get("/getInventory/:classification_id",
utilities.checkAccountType,
utilities.handleErrors(invController.getInventoryJSON))

/* ****************************************
 * Deliver the edit inventory view
 * Unit 5, Update Step 1 Activity
 **************************************** */
router.get("/edit/:inv_id",
utilities.checkAccountType,
utilities.handleErrors(invController.editInvItemView))

/* ****************************************
 * Process the edit inventory request
 * Unit 5, Update Step 2 Activity
 **************************************** */
router.post("/update/",
  utilities.checkAccountType,
  invValidate.inventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

/* ****************************************
 * Deliver the delete confirmation view
 * Unit 5, Delete Activity
 **************************************** */
router.get("/delete/:inv_id",
  utilities.checkAccountType,
  utilities.handleErrors(invController.deleteView)
)

/* ****************************************
 * Process the delete inventory request
 * Unit 5, Delete Activity
 **************************************** */
router.post("/delete", 
utilities.checkAccountType,
utilities.handleErrors(invController.deleteItem)
)

module.exports = router;
