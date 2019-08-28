const { remote } = require('electron')
const { BrowserWindow } = require('electron')
const { dialog } = require('electron').remote

// Define API key
let firebaseConfig = sercetKey;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Make auth and firestore reference
const auth = firebase.auth();
const db = firebase.firestore();

// Logout and back to login page
function logout() {
  auth.signOut();
  location.replace("index.html");
}

// Initial firebase collection companies
let dbCom = firebase.firestore().collection('companies')

// Initialize selected company and person for each user for each page
var company_id
var company_person

// Initialize for all render page
let html = '';

// Login
function login() {
  // Get email and password from input
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Login if use specific email
  if (email.split('@')[1] === allowedEmailDomain) {
    // do something, we accept this email
    auth.signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(error);
      // [START_EXCLUDE] check error and reload
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      location.reload();
    });

    // listen for auth status changes get user logged in 
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
          // alert user name
          alert("Welcom back! " + doc.data().name)
        }).then(doc => {
          remote.getCurrentWindow().loadURL(`file://${__dirname}/home.html`)
        })
        // // Or load a local HTML file
        // Login success go to home page

      } else {
        // console.log('user logged out');
      }
    })
  } else {
    // return an error or do nothing
    alert('Email error')
    location.reload();
  }

}

// Sign up
function signup() {
  // Get name, email, password
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // If all field was filled
  if (name !== '' && email !== '' & password !== '') {
    // Sign up and save to firebase then back to log in page
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      // Create user name
      return db.collection('users').doc(cred.user.uid).set({
        name: name
      });
    }).then(() => {
      // Alert sign up complete and clear input value
      alert("Sign up complete");
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      location.replace("index.html");
    });
  }
  else {
    // warning require field
    warning()
  }

}

// Go to companies page
function companies() {
  remote.getCurrentWindow().loadURL(`file://${__dirname}/companies.html`)

}

// Warning require field for sign up and new/edit person
function warning() {
  dialog.showMessageBox(null, requireField, (response) => {
    if (response === 1) {
      console.log('alert')
    }
  });
}

// Option fail save detail not filled all require field
const requireField = {
  type: 'question',
  buttons: ['Ok'],
  defaultId: 2,
  title: 'Alert',
  message: 'Please fill all require field'
};