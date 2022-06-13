
require('dotenv').config()
const CustomAPIError = require('../middleware/custom');
const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const login = async (req, res) => {
  const {email, password} = req.body;
  if(!email || !password){
    throw new CustomAPIError('Please provide Email and Password', 400);
  }
  const users = await Users.findOne({email});
  if(users && bcrypt.compareSync(password, users.password)){
    const token = await jwt.sign({user_id: user._id, email}, process.env.JWT_KEY, {expiresIn: '2d'});
    users.token = token;
    return res.status(200).json({
      msg:"Login is Successful, Use the below token in Headers \"Authorization: Bearer <token>\" on the http://localhost:5000/dashboard endpoint for accessing data",
      data: users
    });
  }
  res.status(400).send("Email or Password is incorrect");
}

const register = async (req, res) => {
  let {first_name, last_name, email, password, DOB, age} = req.body;
  if(!email || !password){
    throw new CustomAPIError('Please provide Email and Password', 400);
  }

  if(!DOB){
    throw new CustomAPIError('Please provide Date of Birht', 400);
  }
  
  if(password.length < 6 || password.length > 12){
    throw new CustomAPIError('Password length should be between 6-12', 400);
  }

  const oldUser = await Users.findOne({email});

  if(oldUser){
    throw new CustomAPIError('User already Exist please login', 409);
  }

  if(!age){
    age = getAge(DOB);
  }

  const salt = bcrypt.genSaltSync(10);
  const ecncryptedPassword = await bcrypt.hashSync(password, salt);

  const users = await Users.create({
    first_name,
    last_name,
    email,
    password: ecncryptedPassword,
    DOB,
    age
  })

  const token = await jwt.sign({user_id:users._id, email}, process.env.JWT_KEY, {expiresIn: '2d'});
  users.token = token;

  res.status(201).json({msg:"User Created", data: users});
}

const dashboard = async (req, res) => {
  const email = req.userEmail;
  const logedUser = await Users.findOne({email});

  const users = await Users.find({});
  res.status(200).json({
    User: `Welcome ! ${logedUser.first_name}, Here is the data u requested.`,
    data:users
  });
}


function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    if(age < 0){
      return 0;
    }
    return age;
}

module.exports = {login, register, dashboard};