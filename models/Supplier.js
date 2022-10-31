const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  businessName: { type: String, required: true },
  supplierId: { type: String, required: true },
  fullName: { type: String, required: true },
  telephone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: false },
});

const Supplier = mongoose.model("suppliers", supplierSchema);

module.exports = Supplier;
