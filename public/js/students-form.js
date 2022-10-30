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
const name2 = document.getElementById("name2");
name2.innerHTML = docSnap.get("Name");
const id1 = document.getElementById("id1");
id1.innerHTML = id;

const out = document.getElementById("out");
const inn = document.getElementById("in");
const place = document.getElementById("place");
const purpose = document.getElementById("purpose");
const x = document.querySelector(".submitForm");

x.addEventListener("click", async (event) => {
  try {
    event.preventDefault();

    const docData = {
      Email: docSnap.get("Email"),
      ID: id,
      outDate: out.value,
      outTime: out.value.substring(11),
      inDate: inn.value,
      inTime: inn.value.substring(11),
      place: place.value,
      purpose: purpose.value,
      companion: document.querySelector('input[name="gridRadios"]:checked')
        .value,
      status: "stage1",
      tutorid: docSnap.get("TutorId"),
      wardenid: docSnap.get("WardenId"),
      mode: "active",
      Name: docSnap.get("Name"),
      pname: docSnap.get("ParentName"),
      wname: docSnap.get("WardenId"),
      gname: docSnap.get("GuardianName"),
      gphone: docSnap.get("Gphone"),
      Sphone: docSnap.get("Sphone"),
      pphone: docSnap.get("Pphone"),
      class: docSnap.get("Class"),
      dept: docSnap.get("Dept"),
      year: docSnap.get("Year"),
      Address1: docSnap.get("Address1"),
      Address2: docSnap.get("Address2"),
      City: docSnap.get("City"),
      State: docSnap.get("State"),
    };
    const newDocRef = doc(collection(db, "applications"));
    await setDoc(newDocRef, docData);
    window.alert("Application submmitted successfully!");
    window.location.replace("students-status.html");
  } catch (err) {
    window.alert("Error Occured" + err);
  }
});
