const router = require("express").Router();
const Order = require("../models/Order");

//place order
router.route("/").post(async (req, res) => {
  const {
    siteId,
    siteName,
    productId,
    productName,
    supplierId,
    supplierName,
    amount,
    payment,
  } = req.body;

  //generating an unique order id
  const orderId = "ORD" + Date.now();
  const dateOfOrder = new Date().toISOString();
  const confirmation = false;

  //create order object
  const newOrder = new Order({
    orderId,
    siteId,
    siteName,
    productId,
    productName,
    supplierId,
    supplierName,
    amount,
    payment,
    dateOfOrder,
    confirmation,
  });

  //save order
  await newOrder
    .save()
    .then((data) => {
      res.status(200).json({ msg: "Success", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: "Error", err });
    });
});

//get orders by site id
router.route("/all/:siteId").get(async (req, res) => {
  const siteId = req.params.siteId;

  await Order.find({ siteId })
    .then((data) => {
      res.status(200).json({ msg: "Success", data });
    })
    .catch((err) => {
      res.status(400).json({ msg: "Error", err });
    });
});

//get pending orders by site id
router.route("/pending/:siteId").get(async (req, res) => {
  const siteId = req.params.siteId;

  await Order.find({ siteId, confirmation: false })
    .then((data) => {
      res.status(200).json({ msg: "Success", data });
    })
    .catch((err) => {
      res.status(400).json({ msg: "Error", err });
    });
});

//get orders by supplier id
router.route("/approved/:supplierId").get(async (req, res) => {
  const supplierId = req.params.supplierId;

  await Order.find({ supplierId, confirmation: true })
    .then((data) => {
      res.status(200).json({ msg: "Success", data });
    })
    .catch((err) => {
      res.status(400).json({ msg: "Error", err });
    });
});

module.exports = router;
