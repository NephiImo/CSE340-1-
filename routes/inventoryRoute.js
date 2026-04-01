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
utilities.handleErrors(invController.buildManagementView))

// Route to build add classification view
router.get("/add-classification", 
utilities.handleErrors(invController.buildAddClassification))

//Process add classification
router.post("/add-classification", 
invValidate.classificationRules(),
invValidate.checkClassificationData,
utilities.handleErrors(invController.addClassification))


// Route to build add inventory view
router.get("/add-inventory", 
utilities.handleErrors(invController.buildAddInventory))

// Process add inventory
router.post("/add-inventory", 
invValidate.inventoryRules(),
invValidate.checkInventoryData,
utilities.handleErrors(invController.addInventory))

/* ****************************************
 * Get vehicles for AJAX Route
 * Unit 5, Select inv item activity
 **************************************** */
router.get("/getInventory/:classification_id",
utilities.handleErrors(invController.getInventoryJSON))

/* ****************************************
 * Deliver the edit inventory view
 * Unit 5, Update Step 1 Activity
 **************************************** */
router.get("/edit/:inv_id",
utilities.handleErrors(invController.editInvItemView))

/* ****************************************
 * Process the edit inventory request
 * Unit 5, Update Step 2 Activity
 **************************************** */
router.post("/update/",
  invValidate.inventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)


module.exports = router;
