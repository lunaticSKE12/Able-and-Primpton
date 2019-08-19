// Show file name
function showFileName() {
  // Get file name
  var inputFileName = document.getElementById('fileImg').files[0].name;
  // Get field text 
  var text = document.getElementById('textInput')
  // Show file name
  text.textContent = inputFileName;
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



// Create a storage reference from our storage service
function save() {
  // console.log(isFieldFilled())
  // Check no img
  if (document.getElementById('fileImg').files[0] === undefined) {
    // console.log('no img')
    // if all filled
    if (isFieldFilled()) {
      // console.log('fill')
      // Create new person
      newPerson('')
    }
    else {
      // Warning require field 
      warning()
    }
  }
  /////////////////////////////////////////////////////////////////////////////////


  // Check have img 
  else if (document.getElementById('fileImg').files[0] !== undefined) {
    console.log('have img')
    // Get file and file name then set directory in firebase
    var selectedFile = document.getElementById('fileImg').files[0]
    var inputFileName = document.getElementById('fileImg').files[0].name;

    // if all filled
    if (isFieldFilled()) {
      let name_en = document.getElementById('name_en').value
      let storageRef = firebase.storage().ref(`/img/${name_en}/${inputFileName}`);

      console.log("ref " + storageRef);

      // Upload
      var uploadTask = storageRef.put(selectedFile);

      uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        // Set progress bar
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        var bar = document.getElementById('uploader');
        var barValue = document.getElementById('uploaderValue');
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
          console.log('File available at', downloadURL);
          newPerson(downloadURL)
        });
      });
    }
    // have img not filled
    else {
      // Warning require field 
      warning()
    }
    // have img not filled
  }
  /////////////////////////////////////////////////////////////////////////////////

  // not filled no img
  else {
    // Warning require field 
    warning()
  }
}


