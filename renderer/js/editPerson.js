
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
