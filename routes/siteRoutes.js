const express = require("express");
const siteRoutes = express.Router();

console.log("entrando por siteroutes")

siteRoutes.get("/",(req,res,next)=>{
  res.render("homepage");
})

siteRoutes.get("/404",(req,res,next)=>{
  res.render("auth/404");
})


module.exports=siteRoutes;
