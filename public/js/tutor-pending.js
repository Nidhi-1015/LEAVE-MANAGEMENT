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

//main code

const studDocRef = doc(db, "tutors", "vijeyakaveriv");
const studDocSnap = await getDoc(studDocRef);

const name1 = document.getElementById("name");
name1.innerHTML = studDocSnap.get("Name");

// const id1 = document.getElementById("id1");
// id1.innerHTML = id;

const name2 = document.getElementById("name2");
name2.innerHTML = studDocSnap.get("Name");

const userquery = query(
  collection(db, "applications"),
  
  where("mode", "==", "active"),
  where("status", "==", "stage1"),
  where("tutorid", "==", "vijeyakaveriv"),
);
// var demoElement = document.getElementById("demo");
var x = "";
var tbody=document.getElementById("tabody");
const querySnapshot = await getDocs(userquery);
const allDocs = querySnapshot.forEach((snap) => {
  var obj = snap.data();
  var status = obj.status;
  
  x+=
  `<tr>
  <td>`+ obj.Name+`</td>
  <td>`+ obj.inDate.substring(0, 10)+` & `+obj.inDate.substring(11)+`</td>
  <td>`+ obj.outDate.substring(0, 10)+` & `+obj.inDate.substring(11)+`</td>
  <td><a class="btn btn-sm btn-success" href="">Accept</a></td>
  <td><a class="btn btn-sm btn-danger" href="">Reject</a></td>
  <td><a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#exampleModalCenter" id = "det" data-value = `+ snap.id+`>Details</a></td>
</tr>`;
console.log(snap.id);
});
tbody.innerHTML=x;


var det = document.getElementById("det");
det.addEventListener("click", (event) => {
  //console.log("hai");
  document.getElementById("inp").value = det.getAttribute("data-value");
});

//   x +=
//     `<div class="container-fluid pt-4 px-4" >
//   <div class="row g-4">
//       <div class="col-sm-12 col-xl-4">
//           <div class="bg-light rounded h-100 p-4">
//               <h6 class="mb-4">Details</h6>
//               <dl class="row mb-0">
//                   <dt class="col-sm-4">Out Date</dt>
//                   <dd class="col-sm-8">` +
//     obj.outDate.substring(0, 10) +
//     `</dd>
                  
//                   <dt class="col-sm-4">Out Time</dt>
//                   <dd class="col-sm-8">` +
//     obj.outDate.substring(11) +
//     `</dd>

//                   <dt class="col-sm-4">In Date</dt>
//                   <dd class="col-sm-8">` +
//     obj.inDate.substring(0, 10) +
//     `</dd>

//                   <dt class="col-sm-4">In Time</dt>
//                   <dd class="col-sm-8">` +
//     obj.inDate.substring(11) +
//     `</dd>

//                   <dt class="col-sm-4">Place</dt>
//                   <dd class="col-sm-8">` +
//     obj.place +
//     `</dd>

//                   <dt class="col-sm-4">Companion</dt>
//                   <dd class="col-sm-8">` +
//     obj.companion +
//     `</dd>

//               </dl>
//           </div>
//       </div>
//       <div class="col-sm-12 col-xl-8">
//           <div class="bg-light rounded p-4">
//               <div class="d-flex align-items-center justify-content-between mb-4">
//                   <h6 class="mb-0">Application Status</h6>
//               </div>
//               <div class="steps steps-horizontal-md">
//                   <div class="step">
//                     <div class="step-number bg-light">
//                       <span class="position-absolute top-0 start-0 w-100 h-100 rounded-circle bg-faded-success"></span>
//                       <div class="step-number-inner bg-success">
//                           <i class="fa fa-check-circle fa-3x text-white"></i>
//                       </div>
//                     </div>
//                     <div class="step-body">
//                       <h6 class="mb-2">&nbsp; &nbsp;Form Submission</h6>
                  
//                     </div>
//                   </div>
//                   <div class="step">`;

//   if (status === "stage1") {
//     x += `<div class="step-number">
//                       <div class="step-number-inner">2</div>
//                     </div>`;
//   } else {
//     x += `<div class="step-number bg-light">
//                     <span class="position-absolute top-0 start-0 w-100 h-100 rounded-circle bg-faded-success"></span>
//                     <div class="step-number-inner bg-success">
//                         <i class="fa fa-check-circle fa-3x text-white"></i>
//                     </div>
//                   </div>`;
//   }

//   x += `<div class="step-body">
//                       <h6 class="mb-2">&nbsp; &nbsp;Tutor Approval</h6>
                      
//                     </div>
//                   </div>
//                   <div class="step">`;

//   if (status === "stage3") {
//     x += `<div class="step-number bg-light">
//             <span class="position-absolute top-0 start-0 w-100 h-100 rounded-circle bg-faded-success"></span>
//             <div class="step-number-inner bg-success">
//                 <i class="fa fa-check-circle fa-3x text-white"></i>
//             </div>
//           </div>`;
//   } else {
//     x += `<div class="step-number">
//             <div class="step-number-inner">3</div>
//           </div>`;
//   }

//   x += `<div class="step-body">
//                       <h6 class="mb-2">&nbsp; &nbsp;Warden Approval</h6>
                      
//                     </div>
//                   </div>
//                 </div>
//           </div>
//       </div>
      
//   </div>
// </div>`;
// });
// demoElement.innerHTML = x;
