var express = require('express');
var router = express.Router();
const multer = require("multer")
const {uploadBytes,ref} =  require("firebase/storage")
// const { UserCollection, addDoc } = require( "firebase/firestore"); 
const { addDoc, getDocs } =  require("firebase/firestore")
const fs = require('fs')
const { promisify } = require('util')
const {productCollection,storage,cartCollection,update_cart,addToCart,get_cart,get_product} = require("../../Database/DBmanager")
const upload = multer({ dest: 'uploads/' })
const unlinkAsync = promisify(fs.unlink)
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
  
  router.get("/cart",async (req,res)=>{
    const curr_user = req.session.curruser
    const cart = await get_cart(curr_user)
    const prod_list = cart.data()["products"]
    let mydata = []
    for(let x=0;x<prod_list.length;x++){
      const prod = await get_product(prod_list[x].product_id)
      mydata.push({
        detail:prod.data(),
        qty:prod_list[x].qty
      })
    }
    console.log(mydata)
    res.render('cart',{curr_user:curr_user,cart_data:mydata});
  })
  router.get("/cart/add-product/:id", async(req,res)=>{
    const p_id = req.params.id
    const u_id = req.session.curruser
    console.log(u_id)
    const cart = await get_cart(u_id)
    
    if(cart.data()){
      console.log(cart.data()["products"])
      let products_list = cart.data()["products"]
      let f = false;
      for(let x=0;x<products_list.length;x++){
        if(products_list[x].product_id == p_id){
          products_list[x].qty += 1
          f = true
        }
      }
      if(!f){
        nw_p = {
          product_id:p_id,
          qty:1
        }
        products_list.push(nw_p)
      }
      await update_cart(u_id,{products:products_list})
    }
    else{
      let data = {
        products:[
          {
            product_id:p_id,
            qty:1
          }
        ]
      }
      await addToCart(u_id,data)
    }
    return res.redirect("/")
  }
)
  
  router.get("/checkout",(req,res)=>{
    res.render('checkout');
  })
  
  router.post("/add-fruits",upload.single("image"),async (req,res)=>{
    const {name,description,price,stock} = req.body
    const image = req.file
    const filedata = await uploadBytes(ref(storage,image.originalname),image)
    console.log(filedata)
    await addDoc(productCollection,{name:name,description:description,price:price,stock:stock,imagepath:filedata.metadata.fullPath})
    await unlinkAsync("./uploads/"+image.filename)
    res.redirect("/")
  })
module.exports = router