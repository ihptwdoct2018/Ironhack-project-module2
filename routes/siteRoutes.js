const express = require("express");
const siteRoutes = express.Router();

console.log("entrando por siteroutes")

siteRoutes.get("/",(req,res,next)=>{
  res.render("homepage");
})


module.exports=siteRoutes;