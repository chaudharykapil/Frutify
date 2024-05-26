var express = require('express');
var router = express.Router();
const multer = require("multer")
// const { UserCollection, addDoc } = require( "firebase/firestore"); 
const { addDoc, getDocs } =  require("firebase/firestore")
const {UserCollection,productCollection} = require("../../Database/DBmanager")
const upload = multer({ dest: 'uploads/' })
/* GET home page. */
router.get("/login", (req,res)=>{
  res.render("login", { messages: req.flash('message') })
});
router.post("/login", async(req,res) =>{
  const{ email,password } = req.body;
  const userlist = await getDocs(UserCollection);
  let flag = false
  console.log(req.body)
  if(userlist.size == 0){
    req.flash('message',"Please register")
    res.redirect("/user/register")
    return
  }
  userlist.forEach(u=>{
    console.log(u.data())
    if(u.data().email == email && u.data().password == password){
      flag = true
      req.session.curruser = u.id
      req.flash('message','You are successfully logged in!')
      res.redirect("/")
    }
  })
  if(!flag){
    req.flash('message',"Please register")
    res.redirect("/user/register")
  }

})

router.get("/register", (req,res)=>{
  
  res.render("register", { messages: req.flash('message') })
})

router.post("/register", async(req,res) =>{
  const{ email,password } = req.body;
  const userlist = await getDocs(UserCollection);
  let flag = false
  if(userlist.size != 0){
    userlist.forEach(u=>{
        if(u.data().email == email){
          flag = true
        }
      })
  }
  if(!flag){
    await addDoc(UserCollection,{
        email : email,
        password:password
    })
    req.flash('message',"You are registered successfully!")
  }
  else{
    req.flash('message',"You are already registered! Please login")
  }
  res.redirect('/user/login');
});


router.get("/logout",async (req,res)=>{
    req.session.curruser = null
    req.flash('message',"You are successfully logged out!")
    res.redirect("/")
})
module.exports = router;
