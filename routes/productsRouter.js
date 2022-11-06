/**
 * APIs for the products service.
 */
const multer = require("multer"); // Used for image storage.
const Product = require("../models/Product"); // Importing the product model
const router = require("express").Router();

// Creating storage to add image files
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//Fetch all available products
router.route("/").get(async (req, res) => {
  Product.find()
    .then((data) => {
      res.status(200).json({ msg: "Success", data });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Error", error });
    });
});

// Adding product to the Database
router.post(
  "/addProduct",
  upload.single("productImage"),
  async function (req, res) {
    // Generating unique id
    let productId = "";
    let success = false;

    while (!success) {
      productId =
        "PRD" +
        Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0");

      // Checking if generated id already exists
      await Product.exists({ productId })
        .then((status) => {
          if (status) {
            success = false;
          } else {
            success = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const newProduct = new Product({
      productId: productId,
      productName: req.body.productName,
      productStatus: "Pending",
      productPrice: req.body.productPrice,
      productDescription: req.body.productDescription,
      supplierName: req.body.supplierName,
      quantity: req.body.quantity,
      quantityType: req.body.quantityType,
      productImage: req.file.originalname,
    });
    await newProduct
      .save()
      .then((data) => {
        res.status(200).json({ msg: "Success" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  }
);

// Fetch product image
router.route("/getImage/:id").get(async (req, res) => {
  const product = req.params.id;
  await Product.findById(product)
    .then((data) => {
      const image = data.productImage;
      const file = `./images/${image}`;
      console.log(file);
      res.download(file);
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error fetching image" });
    });
});
module.exports = router;
