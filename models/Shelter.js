const mongoose =require('mongoose');

const Schema = mongoose.Schema;

//Define Schema
const ShelterSchema = new Schema({
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
  }


})

//Compile model from schema and export it.
module.exports = mongoose.model('Shelter', ShelterSchema);
