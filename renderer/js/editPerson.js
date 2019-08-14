
// Get selected company id 
dbSelectedCom.get().then(function (querySnapshot) {
  querySnapshot.forEach(function (doc) {
    // doc.data() is never undefined for query doc snapshots
    // Get id selected company and person
    company_id = doc.data().selected_card
    dbCom.doc(company_id).onSnapshot((snapshot) => {
      let text = document.getElementById('companyTxt')
      // Show Company name in breadcrumb
      text.innerHTML = snapshot.data().name
    })
  });
});

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

// Create a storage reference from our storage service
function save() {
  // console.log(isFieldFilled())


  // Check no img
  if (document.getElementById('fileImg').files[0] === undefined) {
    console.log('no img')
    // if all filled
    if (isFieldFilled()) {
      console.log('fill')
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
      var storageRef = firebase.storage().ref(`/img/${name_en}/${inputFileName}`);

      // Upload
      var uploadTask = storageRef.put(selectedFile);

      uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        // Set progress bar
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        var bar = document.getElementById('uploader');
        bar.value = progress;

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


  // // Get file and file name then set directory in firebase
  // var selectedFile = document.getElementById('fileImg').files[0]
  // var inputFileName = document.getElementById('fileImg').files[0].name;

  // if (isFieldFilled()) {
  //   let name_en = document.getElementById('name_en').value
  //   var storageRef = firebase.storage().ref(`/img/${name_en}/${inputFileName}`);

  //   // Upload
  //   var uploadTask = storageRef.put(selectedFile);

  //   uploadTask.on('state_changed', function (snapshot) {
  //     // Observe state change events such as progress, pause, and resume
  //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //     // Set progress bar
  //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     var bar = document.getElementById('uploader');
  //     bar.value = progress;

  //     // console.log('Upload is ' + progress + '% done');
  //     switch (snapshot.state) {
  //       case firebase.storage.TaskState.PAUSED: // or 'paused'
  //         console.log('Upload is paused');
  //         break;
  //       case firebase.storage.TaskState.RUNNING: // or 'running'
  //         console.log('Upload is running');
  //         break;
  //     }
  //   }, function (error) {
  //     // Handle unsuccessful uploads
  //   }, function () {
  //     // Handle successful uploads on complete
  //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //     uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
  //       console.log('File available at', downloadURL);
  //       newPerson(downloadURL)
  //     });
  //   });
  // }
  // else if (document.getElementById('textInput').value !== '' && isFieldFilled()) {
  //   newPerson('')
  // }
  // else {
  //   dialog.showMessageBox(null, options, (response) => {
  //     if (response === 1) {
  //       console.log('alert')
  //     }
  //   });
  // }


}



// Save detail to server
function newPerson(url) {

  // Get all field value
  let { name_en, name_th, nationality,
    passportNumber, datepickerPassport,
    datepickerWorkpermit, visaType,
    datepickerVisa, remark } = getField()

  dbSelectedCom.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      company_id = doc.data().selected_card

      // Save detail to server
      dbCom.doc(company_id).collection('people').add({
        img: url,
        name_en: name_en,
        name_th: name_th,
        nationality: nationality,
        passportNumber: passportNumber,
        datepickerPassport: new Date(datepickerPassport),
        datepickerWorkpermit: new Date(datepickerWorkpermit),
        visaType: visaType,
        datepickerVisa: new Date(datepickerVisa),
        remark: remark
      }).then(function () {
        remote.getCurrentWindow().loadURL(`file://${__dirname}/people.html`)
      })
    });
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


