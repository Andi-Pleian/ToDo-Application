const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

// this schema is the collection we are creating inside our db
const userSchema = new Schema({
  firstName:String,
  lastName:String,
  username:{type:String, required:true},
  password:{type:String, required:true}
});

// method for registering the password and hash it before storing in db
userSchema.pre("save", async function(next){
  // next does this: if the operation is completed, you can shift the operation to the next 
  // in this case, after the operation is done, it will pass to mongodb/mongoose
  // this pre method allows us to do something before anything is saved in the collection
  const user = this; // we do this to use user instead of this;

  // Don't do the operation below this if data is not new!!!
  if (!user.isModified('password')) return next(); // we do this to hash the password only when the data is new/on registration only
  let salt = await bcrypt.genSalt(10); // await promise from bcrypt
  let hash = await bcrypt.hash(user.password, salt); // hash the password

  user.password = hash; // assign hashed password to user password
  next();
});

// method for comparing the password => will be used in login method
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); // this reffers to userSchema
}



const User = mongoose.model("User", userSchema); // create user of specified schema
//const User = require('../models/User');

module.exports = User; // export model