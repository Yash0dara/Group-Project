
const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//2002313Uk

const { MongoClient, ServerApiVersion , ObjectId } = require('mongodb');
const uri = "mongodb+srv://Product-Manager:2002313Uk@librarr-database-cluste.ccsxsmt.mongodb.net/?retryWrites=true&w=majority&appName=librarr-database-cluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create a collection
    const productCollection = client.db("ProductInventory").collection("products");



    //insert
    app.post("/add",async(req,res)=>{
        const data= req.body;
        const result = await productCollection.insertOne(data);
        res.send(result);
    })

    
    
    //get
    // app.get("/all",async(req,res)=>{
    //     const product = productCollection.find();
    //     const result = await product.toArray();
    //     res.send(result);
    // })

    //update
    app.patch("/product/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const updateProductData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
          $set: {
              ...updateProductData
          }
      }
      const options = { upsert: true };

      // update now
      const result = await productCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
  })


  //delete
  app.delete("/product/:id", async(req,res)=>{
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await productCollection.deleteOne(filter);
    res.send(result);

  })


  //find
  app.get("/all", async(req,res)=>{
    let query={};
    if(req.query?.productCategory){
      query ={productCategory : req.query.productCategory}
    }
    const result= await productCollection.find(query).toArray();
    res.send(result);
  })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})