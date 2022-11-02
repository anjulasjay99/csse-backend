const router = require("express").Router();
const SiteManager = require("../models/SiteManager");

//Login to site manager account
router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  await SiteManager.findOne({ email })
    .then((data) => {
      if (data.password === password) {
        res.status(200).json({ status: true, msg: "Success", userData: data });
      } else {
        res.status(400).json({ status: false, msg: "Incorrect Credentials" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ status: false, msg: "Incorrect Credentials" });
    });
});

module.exports = router;
