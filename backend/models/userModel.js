import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!!"],
      maxLength: [
        25,
        "Invalid name. Please enter a name with fewer characters!!",
      ],
      minLength: [3, "Name should contain more than 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email!!"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid Email!"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password!!"],
      minLength: [3, "Password should be greater than 3 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timeseries: true },
);

// Password hashing
userSchema.pre("save", async function (next) {
  this.password = await bcryptjs.hash(this.password, 10);

  if(!this.isModified("password")){
    return next();
  }
});

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

userSchema.methods.verifyPassword=async function(userEnteredPassword){
    return await bcryptjs.compare(userEnteredPassword, this.password);  //Comparing password for login
    
}

export default mongoose.model("User", userSchema);
