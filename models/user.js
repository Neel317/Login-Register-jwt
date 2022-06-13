const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_name:{
    type: String,
    default: null
  },
  last_name:{
    type: String,
    default: null
  },
  email:{
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true,'Email address is required'],
    match: [/\S+@\S+\.\S+/, 'Please fill a valid email address']
  },
  password:{
    type: String,
    required:[true, 'Please enter Password'],
  },
  DOB:{
    type: Date,
    required: [true, 'Please provide Date of Birth']
  },
  age:{
    type: Number
  },
  token:{
    type: String
  }
})

module.exports = mongoose.model('Users', userSchema);