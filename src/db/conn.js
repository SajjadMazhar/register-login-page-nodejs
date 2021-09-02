const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/reg-users", {useUnifiedTopology:true , useCreateIndex: true, useNewUrlParser:true}).then(()=>{
    console.log("mongo connection successfull");
}).catch((err)=>{
    console.log(err);
})
