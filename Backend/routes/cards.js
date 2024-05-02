const router = require("express").Router();

let Card = require("../models/card");

http://Localhost:5000/card/addCard

router.post("/addCard", async (req, res) => {
    try {
      const { cardName, cardNumber, expiredate, cvvNumber } = req.body;
      const newCard = new Card({ cardName, cardNumber, expiredate, cvvNumber });
      await newCard.save();
      res.status(201).json({ message: "Card Added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

http://Localhost:5000/getCard

router.route("/getCard").get((req,res)=>{

    Card.find().then((showcard)=>{
        res.json(showcard)
    }).catch((err)=>{
        console.log(err)
    })
})

http://Localhost:5000/card/updateCard/zam04

router.route("/updateCard/:cardid").put(async (req,res)=>{
    let carId = req.params.cardid;
    const {category, description} = req.body;

    const updateCard = {
        cardName,
        cardNumber,
        expiredate,
        cvvNumber
    }

    const update = await Card.findByIdAndUpdate(carId, updateCard)
    .then(()=>{
        res.status(200).send({status: "Card Updated!"});
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Can not update data",error: err.message});
    })  
})

http://Localhost:5000/card/deleteCard/zam04

router.route("/deleteCard/:id").delete(async(req,res)=>{
    let carId=req.params.id;

    await Card.findByIdAndDelete(carId)
    .then(()=>{
        res.status(200).send({status:"Card deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete card",error:err.message});
    })
})

http://Localhost:5000/card/getOneCard/zam04

router.route("/getOneCard/:id").get(async(req,res)=>{
    let carId=req.params.id;
    const card=await Card.findById(carId)
    .then((card)=>{
        res.status(200).send({status:"Card fetched",card})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get card",error:err.message});
    })
})

module.exports = router;

