const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error("Please enter a valid email");
            }
        }
    },
    phone:{
        require:true,
        type:Number,
        minlength:8,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    cpassword:{
        type:String,
        required:true,
        minlength:8,
    },
    gender:{
        type:String,
        required:true,
        default:"male"
    }

});

const User = mongoose.model("User",userSchema)

module.exports = User;