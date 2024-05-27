var express = require('express');
var router = express.Router();
const {add_new_user, get_all_user} = require("../../Database/DBmanager")
/* GET home page. */
router.get("/login", (req,res)=>{
  res.render("login", { messages: req.flash('message') })
});
router.post("/login", async(req,res) =>{
  const{ email,password } = req.body;
  const userlist = await get_all_user()
  let flag = false
  if(userlist.length == 0){
    req.flash('message',"Please register")
    res.redirect("/user/register")
    return
  }
  userlist.forEach(u=>{
    if(u.data.email == email && u.data.password == password){
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
  const user = {email:email,password:password}
  const isadded = await add_new_user(user)
  if(isadded){
    req.flash("message","User Registerd Succcessfully")
  }
  else{
    req.flash("message","User Already successfull")
  }
  res.redirect('/user/login');
});


router.get("/logout",async (req,res)=>{
    req.session.curruser = null
    req.flash('message',"You are successfully logged out!")
    res.redirect("/")
})
module.exports = router;
