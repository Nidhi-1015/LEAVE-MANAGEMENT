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

//main code

const docRef = doc(db, "students", id);
const docSnap = await getDoc(docRef);

const name1 = document.getElementById("name1");
name1.innerHTML = docSnap.get("Name");

const mail1 = document.getElementById("mail1");
mail1.innerHTML = id;

const name2 = document.getElementById("name2");
name2.innerHTML = docSnap.get("Name");

const name3 = document.getElementById("name3");
name3.innerHTML = docSnap.get("Name");

const emailID = document.getElementById("email");
emailID.value = docSnap.get("Email");

const year = document.getElementById("year");
year.value = docSnap.get("Year");

const dept = document.getElementById("dept");
dept.value = docSnap.get("Dept");

const clas = document.getElementById("clas");
clas.value = docSnap.get("Class");

const tutorId = docSnap.get("Tutor-id");
const tutorDocRef = doc(db, "tutors", tutorId);
const tutorDocSnap = await getDoc(tutorDocRef);
const tutor = document.getElementById("tutor");
tutor.value = tutorDocSnap.get("Name");
console.log(tutorDocSnap.get("Name") + " sss " + docSnap.get("Tutor-id"));

const phone = document.getElementById("t-phone");
phone.value = tutorDocSnap.get("Phone");

const id1 = document.getElementById("id1");
id1.innerHTML = id;

const block = document.getElementById("block");
block.value = docSnap.get("Block");

const roomno = document.getElementById("roomno");
roomno.value = docSnap.get("Room-no");

const wardenId = docSnap.get("Warden-id");
const wardenDocRef = doc(db, "wardens", wardenId);
const wardenDocSnap = await getDoc(wardenDocRef);
const warden = document.getElementById("warden");
warden.value = wardenDocSnap.get("Name");

const wphone = document.getElementById("w-phone");
wphone.value = wardenDocSnap.get("Phone");

const gphone = document.getElementById("g-phone");
gphone.value = docSnap.get("G-phone");

const pphone = document.getElementById("p-phone");
pphone.value = docSnap.get("P-phone");

const parent = document.getElementById("parent");
parent.value = docSnap.get("Parent-name");

const gaurdian = document.getElementById("gaurdian");
gaurdian.value = docSnap.get("Gaurdian-name");
