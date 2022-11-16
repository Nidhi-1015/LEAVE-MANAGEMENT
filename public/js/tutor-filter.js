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

//console.log("hjjj");

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

const studDocRef = doc(db, "tutors", id);
const studDocSnap = await getDoc(studDocRef);

const name1 = document.getElementById("name");
name1.innerHTML = studDocSnap.get("Name");

const name2 = document.getElementById("name2");
name2.innerHTML = studDocSnap.get("Name");

async function func(fromdate, todate) {
  const userquery = query(
    collection(db, "applications"),
    where("outDate", ">=", fromdate),
    where("outDate", "<=", todate)
  );
  const querySnapshot = await getDocs(userquery);
  var x = "";
  const allDocs = querySnapshot.forEach((snap) => {
    var obj = snap.data();
    x +=
      `<tr>
        <td>` +
      obj.Name +
      `</td>
        <td>` +
      obj.outDate +
      `  ` +
      obj.outTime +
      `</td>
        <td>` +
      obj.inDate +
      `  ` +
      obj.inTime +
      `</td>
        <td>` +
      obj.year +
      ` ` +
      obj.dept +
      ` ` +
      obj.class +
      `</td>
        <td>` +
      obj.place +
      `</td>
        <td>` +
      obj.companion +
      `</td>
    </tr>`;
  });
  document.getElementById("tbody").innerHTML = x;
}
submit.addEventListener("submit", (event) => {
  event.preventDefault();
  var fromdate = document.getElementById("from");
  var todate = document.getElementById("to");
  func(fromdate.value, todate.value);
});
