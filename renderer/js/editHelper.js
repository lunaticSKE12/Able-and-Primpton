/**
 *   @author Napong Dungduangsasitorn
 * */
// Initialize done progress
let percent = 100

// Show file name to upload passport, workpermit, visa
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

// Get all field value and return value
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

// Check all require fields are filled
// Return true if all require filled
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

// Create a storage reference from our storage service
function save() {
  // if all filled
  if (isFieldFilled()) {

    // passport -------------------------------------------------------
    // if no passport upload
    if (document.getElementById('passportFile').files[0] === undefined) {

      // Get current user
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.

          // Set passport URL temp in user before update to person
          db.collection('users').doc(user.uid).update({
            passportURL: ''
          }).then(function () {
            // Set passport progress 100%
            var bar = document.getElementById('progressPassport');
            var barValue = document.getElementById('uploaderPassportValue');
            bar.value = percent;
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
        // Set progress bar passport
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * percent;
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

      }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File passport available at', downloadURL);
          firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
              // User is signed in.
              // Set passport URL temp in user before update to person
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
      // If passport progress 100%
      if (document.getElementById('progressPassport').value === percent) {

        // Clear delay
        clearInterval(trackPassport)
        // If no workpermit to upload
        if (document.getElementById('workpermitFile').files[0] === undefined) {

          // Get current user
          firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
              // User is signed in.

              // Set workpermit URL temp in user before update to person
              db.collection('users').doc(user.uid).update({
                workpermitURL: ''
              }).then(function () {
                // Set progress bar workpermit
                var bar = document.getElementById('progressWorkpermit');
                var barValue = document.getElementById('uploaderWorkpermitValue');
                bar.value = percent;
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
            // Set progress bar workpermit
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * percent;
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

          }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log('File workpermit available at', downloadURL);
              firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                  // User is signed in.
                  // Set workpermit URL temp in user before update to person
                  db.collection('users').doc(user.uid).update({
                    workpermitURL: downloadURL
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
      // Set delay for upload workpermit
      // If workpermit progress 100%
      if (document.getElementById('progressWorkpermit').value === percent) {

        // Clear delay
        clearInterval(trackWorkpermit)
        // If no workpermit to upload
        if (document.getElementById('visaFile').files[0] === undefined) {

          // onAuthStateChanged
          // Get current user
          firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
              // User is signed in.
              // Set visa URL temp in user before update to person
              db.collection('users').doc(user.uid).update({
                visaURL: ''
              }).then(function () {
                // Set progress bar visa
                var bar = document.getElementById('progressVisa');
                var barValue = document.getElementById('uploaderVisaValue');
                bar.value = percent;
                barValue.innerText = '100%'
              })
            }
          })
        }

        // if have visa to upload
        else if (document.getElementById('workpermitVisa').files[0] !== undefined) {
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
            // Set progress bar visa
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * percent;
            var bar = document.getElementById('progressVisa');
            var barValue = document.getElementById('uploaderVisaValue');
            bar.value = progress;
            barValue.innerText = `${progress}%`

            console.log('visa Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function (error) {

          }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log('File visa available at', downloadURL);
              firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                  // User is signed in.
                  // Set visa URL temp in user before update to person
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

    // save person -------------------------------------------------------
    var trackVisa = setInterval(function () {
      // Set delay for done upload

      // If visa progress 100%
      if (document.getElementById('progressVisa').value === percent) {

        // Clear delay
        clearInterval(trackVisa)

        // Get current user
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            // User is signed in.
            db.collection('users').doc(user.uid).get().then(doc => {
              // Get current user upload URL
              passport = doc.data().passportURL
              workpermit = doc.data().workpermitURL
              visa = doc.data().visaURL
              // Then pass to save in person
              newPerson(passport, workpermit, visa)
            })
          }
        })
      }
    }, 2000)
    // end save person -------------------------------------------------------

  }
  // not filled 
  else {
    // Warning require field 
    warning()
  }
}

