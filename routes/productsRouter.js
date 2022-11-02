const router = require("express").Router();
const multer = require("multer");
const Product = require("../models/Product");

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

// Inserting product

// router.route("/addProduct" , upload.single("productImage")).post(async(req,res)=>{
//   console.log(req.file);

//   const newProduct = new Product({
//     productId : "P-1",
//     productName : req.body.productName,
//     productStatus : "Pending",
//     productPrice : req.body.productPrice,
//     productDescription : req.body.productDescription,
//     supplierName : req.body.supplierName,
//     quantity : req.body.quantity,
//     quantityType : req.body.quantityType,
//     productImage : req.file.originalname
//   })
//   await newProduct.save().then((data) =>{
//     res.status(200).json({msg : "Success"});
//   }).catch((err) =>{
//     console.log(err);
//     res.status(400).json({error : err});
//   })
// })

router.post(
  "/addProduct",
  upload.single("productImage"),
  async function (req, res) {
    const newProduct = new Product({
      productId: "P-1",
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
      res.download(file);
      res.json({msg:"Image Fetching Success!"});
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error fetching image" });
    });
});
module.exports = router;
