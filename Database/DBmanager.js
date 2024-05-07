const { initializeApp } = require("firebase/app");
const { getFirestore } =  require("firebase/firestore");
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

const UserCollection = collection(db, "users")
const productCollection = collection(db,"products")
console.log("Database connected")

module.exports = {UserCollection,productCollection}

