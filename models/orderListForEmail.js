const mongoose =require("mongoose");

const Order=mongoose.Schema(
    {
        email:{
            type:String,
            required:[true,"pleease enter product name"]

        },

        quantity:{
          type:Number,
          required:true,
          default:0

        },
        specification:{type:String,required:true},
        price:{
            type:Number,
            required:true
        },
       
    },
    {
        timestamps:true
    }
)

const product=mongoose.model('Order',Order);
module.exports=product;