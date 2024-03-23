const mongoose=require("mongoose");

// const item=require("../models/items")
const nodemailer=require('nodemailer');
const conf = require('../env');

const bcrypt = require('bcryptjs');

const User =require("../models/userEntry")
const Ord =require("../models/orderListForEmail")

 async function  insertIntoItems(req ){
 console.log("L::::::::L");
        const prod=await item.create(req.body)
        
        return prod;

}

 async function getItems(){
let items=await item.find({});
return items;
}

////this mail used for testing ///

const mailsender = async (req, res) => {
    try {
        let testAcc = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: '9553483839gb@gmail.com',
                pass: 'jlicizypgooihuwj',
            },
        });

        let info = {
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        };

        const result = await transporter.sendMail(info);
        console.log("Message sent: %s", result.messageId);

        return res.status(201).json({
            msg: "Check the mail",
            info: result.messageId,
            preview: nodemailer.getTestMessageUrl(result)
        });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: error.message });
    }
};



/////real account mail sending
const mailgen=require('mailgen');
const Order = require("../models/orderProduct");

const orderConfirm=async (req,res)=>{
const {userEmail,data}=req.body;

await orders(userEmail, data, res);

let config={
    service:'gmail',
    auth:{
        user: '9553483839gb@gmail.com',
        pass: 'jlicizypgooihuwj',
    }
}

let transporter=nodemailer.createTransport(config);
let mailGenaerator= new mailgen({
  theme:  "default",
product:{
    name:"Mailgen",
    link:'https://mailgen.js/'
}
})
let respose ={
    body:{
        name:"Bool",
        intro:"your order",
        table:{
            data:data
        },
        outro:"look for forward"

    }
}
let mail=mailGenaerator.generate(respose);

let message={
    from:'9553483839gb@gmail.com',
    to:userEmail,
    subject:"place order",
    html:mail
}
transporter.sendMail(message).then(()=>{
    return res.status(201).json({
        msg:"check emsil"
    })
   

}).catch(error=>{
    return res.status(500).json({error});
})





} 



//////////////////////////////////////////////////////////

// Define your functions
const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        res.json({ email: user.email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const orders = async (email, data) => {
    try {
     
        
        let totalPrice = 0;
        data.forEach(product => {
            if (!product.price) {
                throw new Error('Price is required for each product');
            }
            totalPrice += product.price;
        });
        totalPrice != 0 ? totalPrice : 0;

        // Check if there is an existing order with the same email
        const existingOrder = await Order.findOne({ email });
        if (existingOrder) {
            // Update the existing order by pushing new data to it
            existingOrder.products.push(...data);
            existingOrder.quantity += data.length;
            await existingOrder.save();
            message = ' order saved successfully';
        } else {
            // Create and save a new order
            const order = new Order({ email, products: data, quantity: data.length, totalPrice });
            await order.save();
            message = 'New order saved successfully';
        }

    } catch (err) {
        console.error(err);
    }
};



const orderList = async (req, res) => {
    try {
        const email = req.params.email;
        // Find orders by email
        const orders = await Order.find({ email });
        // Send the orders as JSON response
        res.json(orders);
    } catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).send('Error retrieving orders');
    }
};

module.exports = {
    insertIntoItems,
    getItems,
    mailsender,
    orderConfirm,
    login,
    signUp,
    orders,
    orderList

};