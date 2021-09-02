const express = require("express")
const app = express();
const router = require("../routes/router")
require("./db/conn");

const port = process.env.PORT || 4000;


app.set("view engine", "views");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(router)

app.listen(port, ()=>{
    console.log(`Listening at port ${port}`);
})
