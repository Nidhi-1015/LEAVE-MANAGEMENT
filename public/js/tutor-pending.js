// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  getDoc,
  setDoc,
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
var y = "";
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
  <td><a class="btn btn-sm btn-success" href = "tutor-accept.html?id=`+snap.id+`">Accept</a></td>
  <td><a class="btn btn-sm btn-danger" href="tutor-reject.html?id=`+snap.id+`">Reject</a></td>
  <td><a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#`+snap.id +`" data-value = `+ snap.id+`>Details</a></td>
</tr>`;
y += `<div class="modal fade" id="`+ snap.id+`" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                
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
                    <dd class="col-sm-8">`+obj.place+`</dd>
                    

                    <dt class="col-sm-4">Purpose</dt>
                    <dd class="col-sm-8">`+obj.purpose+`</dd>
                    
                    <dt class="col-sm-4">Companion</dt>
                    <dd class="col-sm-8">`+obj.companion+`</dd>

                    <dt class="col-sm-4">Parent Name</dt>
                    <dd class="col-sm-8">`+obj.pname+`</dd>

                    <dt class="col-sm-4">Parent Ph No</dt>
                    <dd class="col-sm-8">`+obj.pphone+`</dd>

                    <dt class="col-sm-4">Guardian Name</dt>
                    <dd class="col-sm-8">`+obj.gname+`</dd>

                    <dt class="col-sm-4">Guardian Ph No</dt>
                    <dd class="col-sm-8">`+obj.gphone+`</dd>

                    <dt class="col-sm-4">Warden Name</dt>
                    <dd class="col-sm-8">`+obj.wardenid+`</dd>

                    

                </dl>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>

        </div>
    </div>
</div>
</div>`;
// console.log(snap.id);

});
tbody.innerHTML=x;
document.getElementById("modals").innerHTML = y;




