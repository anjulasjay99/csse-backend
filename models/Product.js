const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  productId: { type: String, required: false },
  productName: { type: String, required: true },
  productStatus: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productDescription: { type: String, required: true },
  supplierId: { type: String, required: false },
  supplierName: { type: String, required: true },
  quantity: { type: String, required: true },
  quantityType : { type: String , required: true},
  productImage: { type: String, required: false },
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
