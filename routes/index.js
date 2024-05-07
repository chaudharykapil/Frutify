var express = require('express');
var router = express.Router();
const multer = require("multer")
// const { UserCollection, addDoc } = require( "firebase/firestore"); 
const { addDoc, getDocs } =  require("firebase/firestore")
const {UserCollection,productCollection} = require("../Database/DBmanager")
const upload = multer({ dest: 'uploads/' })

router.get("/admin",(req,res)=>{
  res.render("admin")
})
router.post("/add-fruits",async (req,res)=>{
  const {name,description,price} = req.body
  console.log(req.body)
  await addDoc(productCollection,{name:name,description:description,price:price})
  res.redirect("/")
})

/* GET home page. */
router.get("/login", (req,res)=>{
  res.render("login")
});
 

router.post("/login", async(req,res) =>{
  const{ email,password } = req.body;
  const userlist = await getDocs(UserCollection);
  let flag = false
  console.log(req.body)
  if(userlist.size == 0){
    res.render("login",{error:{message:"User not found"}})
    return
  }
  userlist.forEach(u=>{
    console.log(u.data())
    if(u.data().email == email && u.data().password == password){
      flag = true
      res.redirect("/")

    }
  })
  if(!flag){
    res.render("register",{error:{message:"User not found"}})
  }

})

router.get("/register", (req,res)=>{
  
  res.render("register")
})

router.post("/register", async(req,res) =>{
  const{ email,password } = req.body;
  const user = await addDoc(UserCollection,{
      email : email,
      password:password
  })
  res.redirect('login');
});
 

router.get('/', async (req, res) =>{
  const productlist = await getDocs(productCollection)
  console.log(productlist.docs[0].data())
  res.render('index',{allproducts:productlist.docs});
});

router.get("/cart",(req,res)=>{
  res.render('cart');
})

router.get("/checkout",(req,res)=>{
  res.render('checkout');
})

router.get("/contact",(req,res)=>{
  res.render('contact');
})

router.get("/shop",(req,res)=>{
  res.render('shop');
})

router.get("/shop-detail/:id",async (req,res)=>{
  const data = await getDocs(productCollection)
  let d = null
  data.docs.forEach(u=>{
    if(u.id == req.params.id){
      d = u
    }
  })
  console.log(data.docs)
  res.render('shop-detail',{product:d});
})


module.exports = router;
