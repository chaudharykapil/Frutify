const { initializeApp } = require("firebase/app");
const { getFirestore, addDoc, setDoc, doc, updateDoc, getDoc } =  require("firebase/firestore");
const { getStorage, ref } = require("firebase/storage");
const { collection } =  require("firebase/firestore")

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyD6n4CeDTtenyRLsMRy2Czl3AnQegzVFHE",
    authDomain: "fruitfy-76ad8.firebaseapp.com",
    projectId: "fruitfy-76ad8",
    storageBucket: "fruitfy-76ad8.appspot.com",
    messagingSenderId: "689446193156",
    appId: "1:689446193156:web:3d8b3341d5ef142694cd51"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app)


const UserCollection = collection(db, "users")
const productCollection = collection(db,"products")
const cartCollection = collection(db,"carts")

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

module.exports = {UserCollection,productCollection,cartCollection,storage,update_cart,addToCart,get_cart,get_product}

