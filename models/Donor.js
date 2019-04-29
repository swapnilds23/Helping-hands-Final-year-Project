const mongoose =require('mongoose');

const Schema = mongoose.Schema;
const bcrypt =  require('bcrypt');

const DonarSchema = new Schema({
  username:{
    type: String,
    required: true,
    unique:true
  },

  password:{
    type: String,
    required: true
  },

  email:{
    type: String,
    required: true
  },

  stripeId:{
    type: String
  },

  type:{
    type: String,
    default: "free-trial"
  },
  amount:{
    type:Number
  },
  ccLast4:{
    type:String
  }
});

module.exports = mongoose.model('Donar', DonarSchema);
