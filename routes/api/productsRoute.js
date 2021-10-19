const { response } = require("express");
const express = require("express");
const router = express.Router();

//product Model
const Products = require("../../src/model/ProductSchema");

//@routes GET api/products
//@desc get products
router.get("/", async (req, res) => {
  try {
    const product = await Products.find();
    if (!product) {
      throw Error("No items");
    }
    res.status(200).json(product);
    console.log(product);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

//@routes POST api/products
//@desc Create a product
router.post("/", async (req, res) => {
  const newProduct = new Products(req.body);
  console.log(req.body.name);
  try {
    const product = await newProduct.save(); //save new product to the db
    if (!product) {
      throw Error("Something went wrong while saving new product");
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

module.exports = router;
