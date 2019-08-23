// Show file name
function showFileName(type) {
  if (type === 'passport') {
    // Get file name
    var inputFilePassport = document.getElementById('passportFile').files[0].name;
    // Get field text 
    var text = document.getElementById('textInput_passport')
    // Show file name
    text.textContent = inputFilePassport;
  }
  else if (type === 'workpermit') {
    // Get file name
    var inputFileWorkpermit = document.getElementById('workpermitFile').files[0].name;
    // Get field text 
    var text = document.getElementById('textInput_workpermit')
    // Show file name
    text.textContent = inputFileWorkpermit;
  }
  else {
    // Get file name
    var inputFileVisa = document.getElementById('visaFile').files[0].name;
    // Get field text 
    var text = document.getElementById('textInput_visa')
    // Show file name
    text.textContent = inputFileVisa;
  }

}

// Get all field value
function getField() {
  let name_en = document.getElementById('name_en').value
  let name_th = document.getElementById('name_th').value
  let getNationality = document.getElementById("nation");
  let nationality = getNationality.options[getNationality.selectedIndex].value;
  let passportNumber = document.getElementById('passportNumber').value
  let datepickerPassport = document.getElementById('datepickerPassport').value
  let datepickerWorkpermit = document.getElementById('datepickerWorkpermit').value
  let type = document.getElementById("type");
  let visaType = type.options[type.selectedIndex].value;
  let datepickerVisa = document.getElementById('datepickerVisa').value
  let remark = document.getElementById('remark').value;

  return {
    name_en, name_th, nationality,
    passportNumber, datepickerPassport,
    datepickerWorkpermit, visaType,
    datepickerVisa, remark
  }
}

// Check all fields are not filled
function isFieldFilled() {

  // Get all field value
  let { name_en, name_th, nationality,
    passportNumber, datepickerPassport,
    datepickerWorkpermit, visaType,
    datepickerVisa, remark } = getField()

  return (name_en !== '') &&
    (nationality !== '') &&
    (passportNumber !== '') &&
    (datepickerPassport !== '') &&
    (datepickerWorkpermit !== '') &&
    (visaType !== '') &&
    (datepickerVisa !== '')
}

// Warning require field 
function warning() {
  dialog.showMessageBox(null, options, (response) => {
    if (response === 1) {
      console.log('alert')
    }
  });
}

// Option fail save detail
const options = {
  type: 'question',
  buttons: ['Ok'],
  defaultId: 2,
  title: 'Alert',
  message: 'Please fill all require field'
};

// Option fail save detail
const options2 = {
  type: 'question',
  buttons: ['Ok'],
  defaultId: 2,
  title: 'Alert',
  message: 'Upload error refresh page and upload again'
};



// Create a storage reference from our storage service
function save() {
  // if all filled
  if (isFieldFilled()) {

    // passport -------------------------------------------------------
    // if no passport upload
    if (document.getElementById('passportFile').files[0] === undefined) {
      // newPerson(downloadURL)
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          db.collection('users').doc(user.uid).update({
            passportURL: ''
          }).then(function () {
            var bar = document.getElementById('progressPassport');
            var barValue = document.getElementById('uploaderPassportValue');
            bar.value = 100;
            barValue.innerText = "100%"
          })
        }
      });
    }

    // If have passport to upload
    else if (document.getElementById('passportFile').files[0] !== undefined) {
      // console.log('have img')
      // Get file and file name then set directory in firebase
      var selectedFile = document.getElementById('passportFile').files[0]
      var inputFileName = document.getElementById('passportFile').files[0].name;
      let name_en = document.getElementById('name_en').value
      let storageRef = firebase.storage().ref(`/img/${name_en}/passport/${inputFileName}`);

      // console.log("ref " + storageRef);

      //////// Upload ---------------------------------------------------------------
      var uploadTask = storageRef.put(selectedFile);

      uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        // Set progress bar
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        var bar = document.getElementById('progressPassport');
        var barValue = document.getElementById('uploaderPassportValue');
        bar.value = progress;
        barValue.innerText = `${progress}%`

        // console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function (error) {
        // Handle unsuccessful uploads
        dialog.showMessageBox(null, options2, (response) => {
          if (response === 1) {
            console.log('alert')
            mainWindow.reload()
          }
        });
      }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File passport available at', downloadURL);
          firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
              // User is signed in.
              db.collection('users').doc(user.uid).update({
                passportURL: downloadURL
              })
            }
          });
        });
      });
      //////// Upload ---------------------------------------------------------------
    }

    // end passport -------------------------------------------------------


    // workpermit -------------------------------------------------------
    var trackPassport = setInterval(function () {
      // Set delay for upload passport
      if (document.getElementById('progressPassport').value === 100) {

        clearInterval(trackPassport)
        // If no workpermit to upload
        if (document.getElementById('workpermitFile').files[0] === undefined) {

          // onAuthStateChanged
          firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
              // User is signed in.
              db.collection('users').doc(user.uid).update({
                workpermitURL: ''
              }).then(function () {
                var bar = document.getElementById('progressWorkpermit');
                var barValue = document.getElementById('uploaderWorkpermitValue');
                bar.value = 100;
                barValue.innerText = "100%"
              })
            }
          })
        }

        // if have workpermit to upload
        else if (document.getElementById('workpermitFile').files[0] !== undefined) {

          // Get file and file name then set directory in firebase
          var selectedFile = document.getElementById('workpermitFile').files[0]
          var inputFileName = document.getElementById('workpermitFile').files[0].name;
          let name_en = document.getElementById('name_en').value
          let storageRef = firebase.storage().ref(`/img/${name_en}/workpermit/${inputFileName}`);

          //////// Upload ---------------------------------------------------------------
          var uploadTask = storageRef.put(selectedFile);

          uploadTask.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            // Set progress bar
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            var bar = document.getElementById('progressWorkpermit');
            var barValue = document.getElementById('uploaderWorkpermitValue');
            bar.value = progress;
            barValue.innerText = `${progress}%`

            // console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function (error) {
            // Handle unsuccessful uploads
            dialog.showMessageBox(null, options2, (response) => {
              if (response === 1) {
                console.log('alert')
                mainWindow.reload()
              }
            });
          }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log('File workpermit available at', downloadURL);
              firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                  // User is signed in.
                  db.collection('users').doc(user.uid).update({
                    workpermitURL: downloadURL
                  }).then(function () {
                    var bar = document.getElementById('progressVisa');
                    var barValue = document.getElementById('uploaderVisaValue');
                    bar.value = 100;
                    barValue.innerText = '100%'
                  })
                }
              });
            });
          });
          //////// Upload ---------------------------------------------------------------
        }
      }
    }, 2000);

    // end workpermit -------------------------------------------------------


    // visa -------------------------------------------------------
    var trackWorkpermit = setInterval(function () {
      // Set delay for upload passport
      if (document.getElementById('progressWorkpermit').value === 100) {

        clearInterval(trackWorkpermit)
        // If no workpermit to upload
        if (document.getElementById('visaFile').files[0] === undefined) {

          // onAuthStateChanged
          firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
              // User is signed in.
              db.collection('users').doc(user.uid).update({
                visaURL: ''
              }).then(function () {
                var bar = document.getElementById('progressVisa');
                var barValue = document.getElementById('uploaderVisaValue');
                bar.value = 100;
                barValue.innerText = '100%'
              })
            }
          })
        }

        // if have workpermit to upload
        else if (document.getElementById('workpermitFile').files[0] !== undefined) {
          // Get file and file name then set directory in firebase
          var selectedFile = document.getElementById('visaFile').files[0]
          var inputFileName = document.getElementById('visaFile').files[0].name;
          let name_en = document.getElementById('name_en').value
          let storageRef = firebase.storage().ref(`/img/${name_en}/visa/${inputFileName}`);

          //////// Upload ---------------------------------------------------------------
          var uploadTask = storageRef.put(selectedFile);

          uploadTask.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            // Set progress bar
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            var bar = document.getElementById('progressVisa');
            var barValue = document.getElementById('uploaderVisaValue');
            bar.value = progress;
            barValue.innerText = `${progress}%`

            // console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function (error) {
            // Handle unsuccessful uploads
            dialog.showMessageBox(null, options2, (response) => {
              if (response === 1) {
                console.log('alert')
                mainWindow.reload()
              }
            });
          }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log('File visa available at', downloadURL);
              firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                  // User is signed in.
                  db.collection('users').doc(user.uid).update({
                    visaURL: downloadURL
                  })
                }
              });
            });
          });
          //////// Upload ---------------------------------------------------------------
        }
      }
    }, 2000);
    // end visa -------------------------------------------------------

    var trackVisa = setInterval(function () {
      if (document.getElementById('progressVisa').value === 100) {
        clearInterval(trackVisa)
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            // User is signed in.
            db.collection('users').doc(user.uid).get().then(doc => {
              // Selected company for this user
              passport = doc.data().passportURL
              workpermit = doc.data().workpermitURL
              visa = doc.data().visaURL
              newPerson(passport, workpermit, visa)
            })
          }
        })
      }
    }, 2000)

  }
  // not filled 
  else {
    // Warning require field 
    warning()
  }
}

