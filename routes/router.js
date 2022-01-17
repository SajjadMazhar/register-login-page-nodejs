const express = require("express");
const User = require("../src/model/user");
const router = new express.Router();
const path = require("path");
const fs = require("fs")
const bcrypt = require("bcrypt")

const populateHTML = (name, htmlContent)=>{
    let mainData = htmlContent.replace("{%userName%}", name);
    let greet = "";
    let time = new Date();
    let hrs = time.getHours();
    if(hrs >= 4 && hrs < 12){greet = "Good Morning!";}
    else if(hrs >= 12 && hrs < 16){greet = "Good Afternoon!";}
    else if(hrs >= 16 && hrs < 20){greet = "Good Evening!";}
    else{greet = "Good Night!";}
    mainData = mainData.replace("{%greet%}", greet);
    return mainData;
}


router.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname+"/../views/index.html"));
    
})
 
router.get("/register", (req, res)=>{
    res.sendFile(path.join(__dirname+"/../views/register.html"))
})

router.get("/login", (req, res)=>{
    res.sendFile(path.join(__dirname+"/../views/login.html"));
})

router.get("/users", async (req, res)=>{
    let allUsers = await User.find();
    res.send(allUsers);
})

router.post("/register", async (req, res)=>{
    try{
        
        let userPass = req.body.pass;
        let encPass = bcrypt.hashSync(userPass, 10)
        if(userPass == req.body.cpass){
            const formData = new User({
                fname:req.body.fullName,
                username:req.body.userName,
                email:req.body.emailId,
                phone:req.body.phoneNum,
                password:encPass,
                cpassword:encPass,
                gender:req.body.gender

                
            });
            const userData = await formData.save();
            // res.sendFile(path.join(__dirname+"/../views/login.html"));
            res.redirect("/login")
        }else{res.send("passwords are not matching!");}

    }catch(err){
        res.status(400).send(`There is an error: ${err}`)
        console.log("Error occured: "+err);
    }

});

router.post("/login", async (req, res)=>{
   try{
       let dashboard = fs.readFileSync(__dirname+"/../views/index.html", "utf-8");
       const emailUser = req.body.inputEmail;
       const password = req.body.inputPass;
       const userData = await User.find({$or:[{email:emailUser},{username:emailUser}]});
       let replacedContent = populateHTML(userData[0].fname, dashboard);
       if(bcrypt.compare(userData[0].password, password)){
        res.write(replacedContent);
        res.status(200).send();
           
       }
       else{
           res.send("invalid password!");
       }

   }catch(err){
       console.log("error in while logging in: "+err);
       res.send(400).send("You are not registered yet.");
   }
})

module.exports = router;
