const router = require("express").Router();
const Order = require("../models/Order");

//check qty & amount
const checkQtyAndAmount = (productName, qty, amount) => {
  let isWithinBudget = false;
  switch (productName) {
    case "Cement":
      if (qty <= 10 && amount <= 40000) {
        isWithinBudget = true;
      }
    case "Sand":
      if (qty <= 5 && amount <= 20000) {
        isWithinBudget = true;
      }
    case "Steel":
      if (qty <= 1000 && amount <= 120000) {
        isWithinBudget = true;
      }
    case "Bricks":
      if (qty <= 1000 && amount <= 60000) {
        isWithinBudget = true;
      }
  }
  return isWithinBudget;
};

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
  const isWithinBudget = checkQtyAndAmount(productName, amount, payment);
  const confirmation = isWithinBudget;
  const orderStatus = isWithinBudget ? "Approved" : "Pending";

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
    receivedQty: 0,
    payment,
    dateOfOrder,
    confirmation,
    orderStatus,
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

//Update deliver details of a selected order
router.route("/updateDeliveryDetails/:orderId").put(async (req, res) => {
  const orderId = req.params.orderId;
  const { receivedQty } = req.body;

  await Order.findOneAndUpdate({ orderId }, { receivedQty })
    .then((data) => {
      res.status(200).json({ msg: "Success", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: "Error", err });
    });
});

//Update status of a selected order
router.route("/updateStatus/:orderId").put(async (req, res) => {
  const orderId = req.params.orderId;
  const { status } = req.body;

  const confirmation = status === "Approved" ? true : false;

  await Order.findOneAndUpdate(
    { orderId },
    { orderStatus: status, confirmation }
  )
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
