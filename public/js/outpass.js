// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  collection,
  addDoc,
  onSnapshot,
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

function spin() {
  const spin = document.getElementById("spinner");
  spin.classList.remove("show");
}

var everythingLoaded = setInterval(function () {
  if (/loaded|complete/.test(document.readyState)) {
    clearInterval(everythingLoaded);
    spin();
  }
}, 1);

//main code
let urlString = window.location.href;
let paramString = urlString.split("?")[1];
let pair = paramString.split("=");
const docId = pair[1];

const docRef = doc(db, "applications", docId);
const docSnap = await getDoc(docRef);
const date1 = docSnap.get("inDate");
const date2 = docSnap.get("outDate");

const inDate = document.getElementById("inDate");
inDate.innerHTML = docSnap.get("inDate") + " - " + docSnap.get("inTime");

const outDate = document.getElementById("outDate");
outDate.innerHTML = docSnap.get("outDate") + " - " + docSnap.get("outTime");

const companion = document.getElementById("companion");
companion.innerHTML = docSnap.get("companion");

const ph1 = document.getElementById("ph1");
ph1.innerHTML = docSnap.get("Sphone");

const ph2 = document.getElementById("ph2");
ph2.innerHTML = docSnap.get("pphone");

const address = document.getElementById("address");
address.innerHTML =
  `<b>Address: </b>` +
  docSnap.get("Address1") +
  `<br>` +
  docSnap.get("Address2") +
  `<br>` +
  docSnap.get("City") +
  ` <br>` +
  docSnap.get("State");

const name = document.getElementById("name");
name.innerHTML = `<b>Name: </b>` + docSnap.get("Name");

const reason = document.getElementById("reason");
reason.innerHTML = `<b>Reason: </b>` + docSnap.get("purpose");

const prnt = document.getElementById("print");
prnt.addEventListener("click", (event) => {
  prnt.style.visibility = "hidden";
  window.onload = window.print();
});
