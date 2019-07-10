const { remote } = require('electron')
const { BrowserWindow } = require('electron')
const { dialog } = require('electron').remote

let firebaseConfig = sercetKey;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log("asdawdsdad: "+firebaseConfig)

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

function deleteCard(){
  dialog.showMessageBox(null, options, (response) => {
    if(response === 1){
      console.log('delete')
    }
  });
}

const options = {
  type: 'question',
  buttons: ['Cancel', 'Yes, please', 'No, thanks'],
  defaultId: 2,
  title: 'Question',
  message: 'Do you want to do delete this?',
  detail: 'this company will permanent deleted'
};