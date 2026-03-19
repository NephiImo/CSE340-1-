// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/");

// simple async wrapper to avoid repeating try catch blocks in each route handler
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

function assertHandler(fn, name) {
  if (typeof fn !== "function") {
    throw new Error(`inventoryRoute.js expected handler "${name}" to be a function but got ${typeof fn}. Check controller export or spelling.`);
  }
  return asyncHandler(fn);
}

/* Routes */

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build vehicle detail view
router.get("/detail/:id", assertHandler(invController.buildDetail, "buildDetail"));

// Error route
router.get("/broken", assertHandler(invController.throwError, "throwError"));


module.exports = router;