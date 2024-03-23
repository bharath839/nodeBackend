const mongoose =require("mongoose");

const items=mongoose.Schema(
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
        specification:{type:String,required:true},
        price:{
            type:Number,
            required:true
        },
        category:{type:String,required:true},
        categoryId:{type:Number,required:true},
        image:{
            type:Buffer,
            required:false
        }
    },
    {
        timestamps:true
    }
)

const product=mongoose.model('Items',items);
module.exports=product;