const express = require("express");
const router = express.Router();

//product Model
const Products = require("../../src/model/Products");

//@routes POST api/products
//@desc Create a product
router.post("/", (req, res) => {
  res.send("Create a product");
});

module.exports = router;
