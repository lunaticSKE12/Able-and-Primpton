const { remote } = require('electron')
const { BrowserWindow } = require('electron')

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDdo2GJJBhzs0kl6VGvvJmP50w-rY-993c",
  authDomain: "able-and-primpton-2f7db.firebaseapp.com",
  databaseURL: "https://able-and-primpton-2f7db.firebaseio.com",
  projectId: "able-and-primpton-2f7db",
  storageBucket: "",
  messagingSenderId: "709230549318",
  appId: "1:709230549318:web:331c8264634830e8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Make auth and firestore reference
const auth = firebase.auth();

function logout() {
  auth.signOut();
  location.replace("index.html");

}

function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(error);
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    location.reload();

  });

  // listen for auth status changes
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log('user logged in: ', user);
      // // Or load a local HTML file
      remote.getCurrentWindow().loadURL(`file://${__dirname}/home.html`)

    } else {
      console.log('user logged out');
    }
  })

}

function signup() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    alert("Sing up complete");
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    location.replace("index.html");
  });
}

function companies(){
  remote.getCurrentWindow().loadURL(`file://${__dirname}/companies.html`)
}

