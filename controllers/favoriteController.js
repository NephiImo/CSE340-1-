const favoriteModel = require("../models/favorite-model")
const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

function buildRedirectPath(source, invId) {
  if (source === "favorites") {
    return "/account/favorites"
  }

  return `/inv/detail/${invId}`
}

function buildVehicleName(vehicle) {
  return `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`
}

const favoriteCont = {}

/* ***************************
 *  Build saved vehicles view
 * ************************** */
favoriteCont.buildFavoritesView = async function (req, res) {
  const nav = await utilities.getNav()
  const accountId = res.locals.accountData.account_id
  const favorites = await favoriteModel.getFavoritesByAccountId(accountId)

  res.render("account/favorites", {
    title: "Saved Vehicles",
    nav,
    errors: null,
    favorites,
  })
}

/* ***************************
 *  Save a vehicle for the logged-in account
 * ************************** */
favoriteCont.saveFavorite = async function (req, res) {
  const accountId = res.locals.accountData.account_id
  const invId = parseInt(req.body.inv_id, 10)
  const source = req.body.source
  const vehicle = await invModel.getInventoryById(invId)

  if (!vehicle) {
    req.flash("message warning", "Sorry, that vehicle could not be found.")
    return res.redirect("/inv/")
  }

  const savedVehicle = await favoriteModel.addFavorite(accountId, invId)

  if (savedVehicle) {
    req.flash(
      "message success",
      `${buildVehicleName(vehicle)} was added to your saved vehicles.`
    )
  } else {
    req.flash(
      "notice",
      `${buildVehicleName(vehicle)} is already in your saved vehicles.`
    )
  }

  return res.redirect(buildRedirectPath(source, invId))
}

/* ***************************
 *  Remove a saved vehicle for the logged-in account
 * ************************** */
favoriteCont.removeFavorite = async function (req, res) {
  const accountId = res.locals.accountData.account_id
  const invId = parseInt(req.body.inv_id, 10)
  const source = req.body.source
  const vehicle = await invModel.getInventoryById(invId)

  if (!vehicle) {
    req.flash("message warning", "Sorry, that vehicle could not be found.")
    return res.redirect("/inv/")
  }

  const removedVehicle = await favoriteModel.removeFavorite(accountId, invId)

  if (removedVehicle) {
    req.flash(
      "message success",
      `${buildVehicleName(vehicle)} was removed from your saved vehicles.`
    )
  } else {
    req.flash(
      "notice",
      `${buildVehicleName(vehicle)} is not currently in your saved vehicles.`
    )
  }

  return res.redirect(buildRedirectPath(source, invId))
}

module.exports = favoriteCont
