// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  getDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhuD-3yonP88M0i2Ix3tvDjQSB3EzFna0",
  authDomain: "leave-management-for-hostel.firebaseapp.com",
  databaseURL:
    "https://leave-management-for-hostel-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "leave-management-for-hostel",
  storageBucket: "leave-management-for-hostel.appspot.com",
  messagingSenderId: "799414591097",
  appId: "1:799414591097:web:ae9c26fe05a6335236fea8",
  measurementId: "G-ZDHQ7Z5WDT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser;
const id = localStorage.getItem("id");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
  } else {
    window.location.replace("index.html");
  }
});

logout.addEventListener("click", (e) => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      localStorage.clear();
      alert("user loged out");
    })
    .catch((error) => {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
});

function spin() {
    const spin = document.getElementById("spinner");
    spin.classList.remove("show");
  }
  
  var everythingLoaded = setInterval(function () {
    if (/loaded|complete/.test(document.readyState)) {
      clearInterval(everythingLoaded);
      spin();
    }
  }, 4000);

  const userquery = query(collection(db, "applications"), where("status", "==", "stage3"),where("tutorid","==","vijeyakaveriv"));
  const querySnapshot = await getDocs(userquery);

var tbody = document.getElementById("tbody");
var x = "";
var y = "";
const allDocs = querySnapshot.forEach((snap) => {
var obj = snap.data();
if(obj.outDate <= new Date().toISOString().substring(0,10)&& obj.inDate>=new Date().toISOString().substring(0,10));
x+= 
`<tr><td>`+obj.ID+
`</td><td>`+obj.Name+
`</td><td>`+obj.year+obj.dept+obj.class+
`</td><td>`+obj.outDate+
`</td><td>`+obj.place+
`</td><td>`+obj.inDate+
`</td><td>`+obj.inTime+
`</td>`;
});

tbody.innerHTML=x;