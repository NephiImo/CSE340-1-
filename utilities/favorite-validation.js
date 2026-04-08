const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventory-model")

const validate = {}

/* ***************************
 *  Validation rules for favorite actions
 * ************************** */
validate.favoriteRules = () => {
  return [
    body("inv_id")
      .trim()
      .notEmpty()
      .withMessage("A vehicle selection is required.")
      .bail()
      .isInt({ min: 1 })
      .withMessage("A valid vehicle is required.")
      .bail()
      .custom(async (inv_id) => {
        const vehicle = await invModel.getInventoryById(parseInt(inv_id, 10))
        if (!vehicle) {
          throw new Error("That vehicle could not be found.")
        }
      }),
    body("source")
      .optional({ values: "falsy" })
      .trim()
      .isIn(["detail", "favorites"])
      .withMessage("Invalid request source."),
  ]
}

/* ***************************
 *  Handle validation errors for favorite actions
 * ************************** */
validate.checkFavoriteData = async (req, res, next) => {
  const errors = validationResult(req)
  const invId = parseInt(req.body.inv_id, 10)
  const source = req.body.source

  if (!errors.isEmpty()) {
    const message = errors.array().map((error) => error.msg).join(" ")
    req.flash("message warning", message)

    if (source === "favorites") {
      return res.redirect("/account/favorites")
    }

    if (Number.isInteger(invId)) {
      return res.redirect(`/inv/detail/${invId}`)
    }

    return res.redirect("/account/")
  }

  next()
}

module.exports = validate
