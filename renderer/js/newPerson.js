/**
 *   @author Napong Dungduangsasitorn
 * */
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
function newPerson(imageURL, passportURL, workpermitURL, visaURL) {

  // Get all field value
  let { name_en, name_th, nationality,
    passportNumber, datepickerPassport,
    datepickerWorkpermit, visaType,
    datepickerVisa,
    dateApplicationExtendsion,
    datepickerNextAppointment,
    applicationDescription,
    remark } = getField()

  // onAuthStateChanged
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      db.collection('users').doc(user.uid).get().then(doc => {
        // Selected company for this user
        company_id = doc.data().selected_company_id

        if (dateApplicationExtendsion !== '' && datepickerNextAppointment !== '') {
          // Save detail to server if have dateApplicationExtendsion and datepickerNextAppointment
          dbCom.doc(company_id).collection('people').add({
            imageURL: imageURL,
            passportURL: passportURL,
            workpermitURL: workpermitURL,
            visaURL: visaURL,
            name_en: name_en,
            name_th: name_th,
            nationality: nationality,
            passportNumber: passportNumber,
            datepickerPassport: new Date(datepickerPassport),
            datepickerWorkpermit: new Date(datepickerWorkpermit),
            visaType: visaType,
            datepickerVisa: new Date(datepickerVisa),
            dateApplicationExtendsion: new Date(dateApplicationExtendsion),
            datepickerNextAppointment: new Date(datepickerNextAppointment),
            applicationDescription: applicationDescription,
            remark: remark
          }).then(function () {
            // Return to people page
            remote.getCurrentWindow().loadURL(`file://${__dirname}/people.html`)
          })
        }
        else {
          dbCom.doc(company_id).collection('people').add({
            imageURL: imageURL,
            passportURL: passportURL,
            workpermitURL: workpermitURL,
            visaURL: visaURL,
            name_en: name_en,
            name_th: name_th,
            nationality: nationality,
            passportNumber: passportNumber,
            datepickerPassport: new Date(datepickerPassport),
            datepickerWorkpermit: new Date(datepickerWorkpermit),
            visaType: visaType,
            datepickerVisa: new Date(datepickerVisa),
            dateApplicationExtendsion: "no extendsion",
            datepickerNextAppointment: "no appointment",
            applicationDescription: "no description",
            remark: remark
          }).then(function () {
            // Return to people page
            remote.getCurrentWindow().loadURL(`file://${__dirname}/people.html`)
          })
        }

      })
    } else {
      // No user is signed in.
    }
  });

}
