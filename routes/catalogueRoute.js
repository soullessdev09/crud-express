const express = require("express");
const route = express.Router();
const catalogue = require("../contollers/catalogueControler");

route.get("/get-catalogue", catalogue.getCatalogue());

module.exports = route;
