
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

// Show detail from server
function newPerson() {
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

  let check = (name_en != '' || name_en == null) &&
    (nationality != '' || nationality == null) &&
    (passportNumber != '' || passportNumber == null) &&
    (datepickerPassport != '' || datepickerPassport == null) &&
    (datepickerWorkpermit != '' || datepickerWorkpermit == null) &&
    (visaType != '' || visaType == null) &&
    (datepickerVisa != '' || datepickerVisa == null)

  if (check) {

    dbSelectedCom.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        company_id = doc.data().selected_card

        // Save detail to server
        dbCom.doc(company_id).collection('people').add({
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
  else {
    dialog.showMessageBox(null, options, (response) => {
      if (response === 1) {
        console.log('alert')
      }
    });

  }
}

// Option fail save detail
const options = {
  type: 'question',
  buttons: ['Ok'],
  defaultId: 2,
  title: 'Alert',
  message: 'Please fill all require field'
};