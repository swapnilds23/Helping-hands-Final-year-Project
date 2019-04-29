const mongoose =require('mongoose');

const Schema = mongoose.Schema;

//Define Schema
const ServiceCenterSchema = new Schema({
  name:{
    type: String,
    required: true
  },

  availability:{
    type: Boolean,
    required: true
  },

  coordinates:{
    type:[
      {
        lat:{
          type: Number,
          required: true
        },

        log:{
          type: Number,
          required: true
        }
      }
    ],
    required: true
  },

  foodService:{
    type:Boolean,
    required:true
  },

  clotheService:{
    type:Boolean,
    required:true
  }

})

//Compile model from schema and export it.
module.exports = mongoose.model('ServiceCenter', ServiceCenterSchema);
