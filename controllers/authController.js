const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

async function registerUser(req, res) {
  // req is what are we getting from frontend
  // res is what response we are sending back to the frontend
  let {firstName, lastName, username, password} = req.body;

  try {
    const duplicate = await User.find({username}); // searches for another user with same username
    
    if (duplicate && duplicate.length > 0) {
      return res.status(400).send({message:'Username already registered!'});
    }

    // if username not registered we shall continue
    let user = new User({firstName, lastName, username, password});
    const result = await user.save(); // save user and store result of operatio

    console.log(result);
    res.status(201).send({message:"User registered succesfully!"});
  } catch(err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function loginUser(req, res) {
  try {
    const {username, password} = req.body; // grab username and password (together) from request body
    const user = await User.findOne({username}); // find user

    if (!user) { // if user not there, send error
      return res.status(404).send({error: "User does not exist!"});
    }

    // check if password matches
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      // wrong password
      return res.status(404).send({error:"Wrong password!"});
    }

    // this token will be valid one hour
    // user can perform requests with this token
    let token = jwt.sign({userId:user?._id}, secretKey, {expiresIn: '1h'});
    let finalData = {
      userId: user?._id,
      username: user?.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
      token
    }
    res.send(finalData); //send final data as response
  } catch(err) {
    console.log(err);
    res.status(400).send({message:err});
  }
}

const AuthController = {
  registerUser,
  loginUser
}

module.exports = AuthController; // now the AuthController will have registerUser method accessible in authRoutes.js