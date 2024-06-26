const { initializeApp } = require("firebase/app");
const { getFirestore, addDoc, setDoc, doc, updateDoc, getDoc, getDocs } =  require("firebase/firestore");
const { getStorage, ref } = require("firebase/storage");
const { collection } =  require("firebase/firestore")

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyC67kI0sRiOCfcVb0PkdaQJ9aUpwMeEIT0",
    authDomain: "frutify-fb220.firebaseapp.com",
    projectId: "frutify-fb220",
    storageBucket: "frutify-fb220.appspot.com",
    messagingSenderId: "780831226756",
    appId: "1:780831226756:web:fd07768c820b2354aefbd1"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app)


const UserCollection = collection(db, "users")
const productCollection = collection(db,"products")
const cartCollection = collection(db,"carts")

const get_all_user = async ()=>{
    const user_ref = await getDocs(UserCollection);
    let userlist = []
    user_ref.forEach((u)=>userlist.push({id:u.id,data:u.data()}))
    return userlist
}
const get_userByID = async (u_id)=>{
    const docRef = doc(db, "users", u_id);
    return await getDoc(docRef);
}

const add_new_user = async(user)=>{
    let flag = true
    const userlist = await get_all_user()
    if(userlist.length != 0){
        userlist.forEach(u=>{
            if(u.data.email == user.email){
            flag = false
            }
        })
    }
    if(flag){
        await addDoc(UserCollection,user)
    }
    return flag
}

const get_all_products = async()=>{
    const data = await getDocs(productCollection)
    return data.docs
}
const get_product = async (p_id)=>{
    const docRef = doc(db, "products", p_id);
    return await getDoc(docRef);
}

const addToCart = async (u_id,data)=>{
    const id = await setDoc(doc(db,"carts",u_id),data)
    return id
}

const get_cart = async (u_id)=>{
    const docRef = doc(db, "carts", u_id);
    return await getDoc(docRef);
}

const update_cart = async (u_id,data)=>{
    const cart_ref = doc(db,"carts",u_id)
    //console.log(cart_ref)
    await updateDoc(cart_ref,data)
}
console.log("Database connected")

module.exports = 
{
    UserCollection,
    productCollection,
    cartCollection,
    storage,
    update_cart,
    addToCart,
    get_cart,
    get_product,
    add_new_user,
    get_all_user,
    get_userByID,
    get_all_products
}

