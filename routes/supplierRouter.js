const supplierRouter = require("express").Router();
const Supplier = require("../models/Supplier");

//add new Supplier
supplierRouter.route("/").post(async (req, res) => {
    const { businessName, supplierId, fullName, telephone,email,address,state,zip} = req.body;
    
    console.log(email)
    const newSupplier = new Supplier({
        businessName,
        supplierId,
        fullName,
        telephone,
        email,
        address,
        state,
        zip
    });
  
    console.log(newSupplier)
    newSupplier
      .save()
      .then((data) => {
        res.json("Supplier added Successfully")
      })
      .catch((err) => {
        console.log(err)
      });
  });


//fetch all fuel Suppliers
 supplierRouter.route("/").get(async (req, res) => {
  Supplier.find()
    .then((data) => {
      res.status(200).json({ msg: "Success", data });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Error", error });
    });
});

 
//get specific Supplier  by Id
supplierRouter.route("/get/:id").get(async(req,res) =>{
    const id = req.params.id;
    console.log(id);
    await Supplier.findById(id).then((Supplier)=>{
      res.json(Supplier);
      console.log(Supplier);
    }).catch((err) =>{
      console.log(err);
    })
  });


  //update a Supplier
  supplierRouter.route("/update/:id").post(function (req, res) {
    Supplier.findById(req.params.id, function (err, Supplier) {
      if (!Supplier) res.status(404).send("Supplier is not found");
      else 
      Supplier.businessName = req.body.businessName;
      Supplier.supplierId = req.body.supplierId;
      Supplier.fullName = req.body.fullName;
      Supplier.telephone = req.body.telephone;
      Supplier.email = req.body.email;
      Supplier.address = req.body.address;
      Supplier.state = req.body.state;
      Supplier.zip = req.body.zip;

      Supplier
        .save()
        .then((Supplier) => {
          res.json("Supplier Updated Suceesfully!");
        })
        .catch((err) => {
          res.status(400).send("Update not possible");
        });
    });
  });

//delete a supplier
supplierRouter.route("/delete/:id").delete((req, res) => {
  const id = req.params.id;

  Supplier
    .findByIdAndDelete(id)
    .then(() => {
      res.status(200).json("Supplier Deleted Successfully!");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error!");
    });
});

//get supplier by search value
supplierRouter.route("/get/user/:email").get(async(req,res) =>{
  const email = req.params.email;
  console.log(email);
  await Supplier.find({email}).then((data)=>{
    res.json(data);
    console.log(data)
  }).catch((err) =>{
    console.log(err);
  })
})

module.exports = supplierRouter;

