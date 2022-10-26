const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderId: { type: String, required: true },
  siteId: { type: String, required: true },
  siteName: { type: String, required: true },
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  supplierId: { type: String, required: true },
  supplierName: { type: String, required: true },
  dateOfOrder: { type: String, required: true },
  amount: { type: Number, required: true },
  receivedQty: { type: Number, required: false },
  payment: { type: Number, required: true },
  confirmation: { type: Boolean, required: true },
  orderStatus: { type: String, required: true },
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
