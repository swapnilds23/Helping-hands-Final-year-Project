const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const HomelessSchema = new Schema({
  name:{
    type: String,
    required: true
  },

  ssn:{
    type: Number,
    required: true
  },

})

module.exports = mongoose.model('Homeless', HomelessSchema);
