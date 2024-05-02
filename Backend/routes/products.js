const router=require("express").Router();
let Product = require("../models/Product");

router.route("/add").post((req,res)=>{

    console.log(req.body);
    const productName=req.body.productName;
    const imageUrl=req.body.imageUrl;
    const price=Number(req.body.price);
    const quantity=Number(req.body.quantity);
    const description=req.body.description;
    const productCategory=req.body.productCategory;
    const amount=Number(req.body.amount);


    const newProduct =new Product({
        productName,
        imageUrl,
        price,
        quantity,
        description,
        productCategory,
        amount
    })

    newProduct.save().then(()=>{
        res.json("Product Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{

    Product.find().then((product)=>{
        res.json(product)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async(req,res)=>{
    let productId=req.params.id;
    const {  productName, imageUrl, price,quantity,description,productCategory,amount}=req.body; 

    const updateProduct={
        productName: req.body.productName,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        productCategory: req.body.productCategory,
        amount: req.body.amount
    }

    const update=await Product.findByIdAndUpdate(productId,updateProduct)
    .then(()=>{
        res.status(200).send({status: "Product updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updateing data",error:err.message});
    })
})


router.route("/delete/:id").delete(async(req,res)=>{
    let productId=req.params.id;

    await Product.findByIdAndDelete(productId)
    .then(()=>{
        res.status(200).send({status:"Product deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete Product",error:err.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let productId=req.params.id;
    const prod=await Product.findById(productId)
    .then((product)=>{
        if (!product) {
            return res.status(404).send({status: "Product not found", error: "Product with the given ID was not found"});
        }
        res.status(200).send({status:"Product fetched", product});
     }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user",error:err.message});
    })
})

module.exports=router;