var express = require('express');
var router = express.Router();
const multer = require("multer")
// const { UserCollection, addDoc } = require( "firebase/firestore"); 
const { addDoc, getDocs } =  require("firebase/firestore")
const {UserCollection,productCollection} = require("../Database/DBmanager")
const upload = multer({ dest: 'uploads/' })

router.get("/admin",(req,res)=>{
  res.render("admin", { messages: req.flash('message') })
})

router.get('/', async (req, res) =>{
  const productlist = await getDocs(productCollection)
  const curr_user = req.session.curruser
  console.log(curr_user)
  console.log(productlist.docs)
  res.render('index',{curr_user:curr_user,allproducts:productlist.docs,messages:req.flash("message")});
});



router.get("/contact",(req,res)=>{
  res.render('contact', { messages: req.flash('message') });
})




module.exports = router;
