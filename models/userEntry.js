
const mongoose =require("mongoose");

const UserEntry = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
      },
    password: {
      type: String,
      required: true
    }
  });
  const product=mongoose.model('User', UserEntry);
module.exports=product;

  