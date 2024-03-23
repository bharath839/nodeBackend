const express = require("express");
const router = express.Router();
router.use(express.json());

const serv = require('../services/dbServices');

router.post("/insert", async (req, res) => {
    try {
        let prod = await serv.insertIntoItems(req);
        res.status(200).json(prod);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.post('/mail',serv.mailsender);
router.post('/realMail',serv.orderConfirm);

router.post('/login',serv.login);
router.post('/signup',serv.signUp);

router.get('/orders/:email', serv.orderList);

// app.get("/allItems",(req,res)=>{
// try {
//     let items=serv.getItems();
//     res.status(200).json(prod);

// } catch (error) {
//     console.log(error.message);
//     res.status(500).json({message:error.message});
// }

// })




// const productModel=require("./models/products")
// ///routes
// app.get('/get',async(req,res)=>{

//     try {
//         const products=await productModel.find({});
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// })

// app.get('/prodct/:id',async(req,res)=>{

//     try {
//         const{id}=req.params
//         const product=await productModel.findById(id);
//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// })



// app.post('/post',async(req,res)=>{

// try{
// const prod=await productModel.create(req.body)
// res.status(200).json(prod);

// }catch(error){
//     console.log(error.message);

// res.status(500).json({message:error.message});
// }
//   console.log(":::::::::"+req.body)
    
// })

module.exports = router;
