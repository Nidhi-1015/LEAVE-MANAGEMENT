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

const wDocRef = doc(db, "wardens", id);
const wDocSnap = await getDoc(wDocRef);

const name1 = document.getElementById("name");
name1.innerHTML = wDocSnap.get("Name");

const name2 = document.getElementById("name2");
name2.innerHTML = wDocSnap.get("Name");

//main code

const userquery = query(
  collection(db, "applications"),
  where("status", "==", "stage3"),
  where("wardenid", "==", id)
);
const querySnapshot = await getDocs(userquery);

var tbody = document.getElementById("tbody");
var x = "";
var y = "";
const allDocs = querySnapshot.forEach((snap) => {
  var obj = snap.data();
  if (
    obj.outDate <= new Date().toISOString().substring(0, 10) &&
    obj.inDate >= new Date().toISOString().substring(0, 10)
  ) {
    x +=
      `<tr><td>` +
      obj.ID +
      `</td><td>` +
      obj.Name +
      `</td><td>` +
      obj.outDate +
      `</td><td>` +
      obj.outTime +
      `</td><td>` +
      obj.inDate +
      `</td><td>` +
      obj.inTime +
      `</td><td><a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#` +
      snap.id +
      `">Details</a></td></tr>`;

    y +=
      `<div class="modal fade" id="` +
      snap.id +
      `" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">DETAILS</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
        </div>
        <div class="modal-body">
            <div class="bg-light rounded h-100 p-4">
                <dl class="row mb-0">
                    <dt class="col-sm-4">Place</dt>
                    <dd class="col-sm-8">` +
      obj.place +
      `</dd>
                    <dt class="col-sm-4">Purpose</dt>
                    <dd class="col-sm-8">` +
      obj.purpose +
      `</dd>
                    <dt class="col-sm-4">Companion</dt>
                    <dd class="col-sm-8">` +
      obj.companion +
      `</dd>
      <dt class="col-sm-4">Parent Name</dt>
      <dd class="col-sm-8">` +
      obj.pname +
      `</dd>

                    <dt class="col-sm-4">Parent Phone</dt>
                    <dd class="col-sm-8">` +
      obj.pphone +
      `</dd>

                    <dt class="col-sm-4">Tutor Name</dt>
                    <dd class="col-sm-8">` +
      obj.tutorid +
      `</dd>
      <dt class="col-sm-4">Tutor Phone</dt>
      <dd class="col-sm-8">` +
      obj.tphone +
      `</dd>


                </dl>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>

        </div>
    </div>
</div>
</div>`;
  }
});
tbody.innerHTML = x;
document.getElementById("modals").innerHTML = y;
