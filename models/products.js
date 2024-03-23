const mongoose =require("mongoose");

const productschema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"pleease enter product name"]

        },

        quantity:{
          type:Number,
          required:true,
          default:0

        },
        price:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required:false
        }
    },
    {
        timestamps:true
    }
)

const product=mongoose.model('Product',productschema);
module.exports=product;