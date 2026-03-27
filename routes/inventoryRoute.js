// Needed Resources 
const express = require("express");
const router = new express.Router(); 
const invController = require("../controllers/invController");
const utilities = require("../utilities");
const invValidate = require("../utilities/inventory-validation");

/* Routes */

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build vehicle detail view
router.get("/detail/:id", 
utilities.handleErrors(invController.buildDetail))

// Error route
router.get("/broken", 
utilities.handleErrors(invController.throwError));

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




module.exports = router;