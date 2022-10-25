const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const siteManagerSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  siteId: { type: String, required: true },
  siteName: { type: String, required: true },
});

const SiteManager = mongoose.model("sitemanagers", siteManagerSchema);

module.exports = SiteManager;
