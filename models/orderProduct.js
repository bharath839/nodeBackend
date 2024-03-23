

// const mongoose =require("mongoose");



// const OrderSchema = new mongoose.Schema({
//     email: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     product: {
//         type: Array,
//         required: true,
//         unique: true
//       },
//       quantity: {
//       type: Number,
//       required: true
//     },
//     price:{
//         type: Number,
//         required: true 
//     }
//   });

//   const Order = mongoose.model('Orders', OrderSchema);

//   module.exports = Order;

  const mongoose = require("mongoose");

  const ProductSchema = new mongoose.Schema({
      name: {
          type: String,
          required: true
      },
      price: {
          type: Number,
          required: true
      }
  });
  
  const OrderSchema = new mongoose.Schema({
      email: {
          type: String,
          required: true
      },
      products: {
          type: [ProductSchema], // Array of products
          required: true
      },
      quantity: {
          type: Number,
          required: true
      }
  });
  
  const Order = mongoose.model('Orders', OrderSchema);
  
  module.exports = Order;
  