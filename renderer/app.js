const { remote } = require('electron')
// const { BrowserWindow } = require('electron')
// const { dialog } = require('electron').remote

let firebaseConfig = sercetKey;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Make auth and firestore reference
const auth = firebase.auth();


// Logout back to login page
function logout() {
  auth.signOut();
  location.replace("index.html");
}

// Login
function login() {
  // Get email and password from input
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
      // Login success go to home page
      remote.getCurrentWindow().loadURL(`file://${__dirname}/home.html`)

    } else {
      console.log('user logged out');
    }
  })

}

// Sign up
function signup() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Sign up and save to firebase then back to log in page
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    alert("Sing up complete");
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    location.replace("index.html");
  });
}

// Go to companies page
function companies() {
  remote.getCurrentWindow().loadURL(`file://${__dirname}/companies.html`)
  
}

var myId