// Get selected company id onAuthStateChanged
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    db.collection('users').doc(user.uid).get().then(doc => {
      // Selected company for this user
      company_id = doc.data().selected_company_id
      dbCom.doc(company_id).get().then(function (doc) {
        // Show company name on breadcrumbs
        let text = document.getElementById('companyTxt')
        text.innerHTML = doc.data().name
      })
    })
  } else {
    // No user is signed in.
  }
});

// Save detail to server
function newPerson(passport, workpermit, visa) {

  // Get all field value
  let { name_en, name_th, nationality,
    passportNumber, datepickerPassport,
    datepickerWorkpermit, visaType,
    datepickerVisa, remark } = getField()

  // onAuthStateChanged
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      db.collection('users').doc(user.uid).get().then(doc => {
        // Selected company for this user
        company_id = doc.data().selected_company_id

        // Save detail to server
        dbCom.doc(company_id).collection('people').add({
          passport: passport,
          workpermit: workpermit,
          visa: visa,
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
      })
    } else {
      // No user is signed in.
    }
  });

}
