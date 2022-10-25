const router = require("express").Router();
const Product = require("../models/Product");

router.route("/").get(async (req, res) => {
  Product.find()
    .then((data) => {
      res.status(200).json({ msg: "Success", data });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Error", error });
    });
});

module.exports = router;
