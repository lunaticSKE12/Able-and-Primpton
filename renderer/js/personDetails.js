let name_en = document.getElementById('getName_en')
let name_th = document.getElementById('getName_th')
let getNationality = document.getElementById("getNationality");
let passportNumber = document.getElementById('getPassportNumber')
let datepickerPassport = document.getElementById('getDatepickerPassport')

function renderDetails() {

  // onAuthStateChanged
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      db.collection('users').doc(user.uid).get().then(doc => {
        // Selected company for this user
        company_id = doc.data().selected_company_id
        company_person = doc.data().selected_person_id

        // Find match company id selected to show name
        dbCom.doc(company_id).onSnapshot((snapshot) => {
          let text = document.getElementById('companyTxt')
          // Show Company name in breadcrumb
          text.innerHTML = snapshot.data().name
        })
        // Render people from selected company
        dbCom.doc(company_id).collection('people').doc(company_person).onSnapshot((snapshot) => {
          renderDetail(snapshot.data())
        })
      })
    } else {
      // No user is signed in.
    }
  });


  const renderDetail = (data) => {


    // Send data to calculate date of expiry, remaining days and status
    let { datePassport, remainingPassport,
      passportStatus,
      dateWorkpermit, remainingWorkpermit,
      workpermitStatus,
      dateVisa, remainingVisa,
      visaStatus }
      = convert(data.datepickerPassport.seconds,
        data.datepickerWorkpermit.seconds,
        data.datepickerVisa.seconds);


    document.querySelector('.card-detail').innerHTML = `
        
        <div class="column cards is-3" id="field">
            <div class="field">
                <div class="control">
                    <label class="label">Name :
                        <label id="getName_en">${data.name_en}</label>
                    </label>
                    <label class="label">ชื่อ :
                        <label id="getName_th">${data.name_th}</label>
                    </label>
                    <label class="label">Nationality :
                        <label id="getNationality">${data.nationality}</label>
                    </label>
                    <div class="is-divider is-primary"></div>
                    <!-- ----------------------------------------------------------- -->
                    <label class="label"><u>Passport</u></label>
                    <label class="label">Passport Number :
                        <label id="getPassportNumber">${data.passportNumber}</label>
                    </label>
                    <label class="label">Date of expiry :
                        <label id="getDatepickerPassport">${datePassport}</label>
                    </label>
                    <label class="label">Remaining days :
                        <label id="passportRemaining">${remainingPassport}</label>
                    </label>
                    <label class="label">Status :
                        <label id="passportStatus">${passportStatus}</label>
                    </label>
                    <a hef="${data.passport}">passport</a>
                    <div class="is-divider is-primary"></div>
                    <!-- ----------------------------------------------------------- -->
                    <label class="label"><u>Work Permit</u></label>
                    <label class="label">Date of expiry:
                        <label id="getDatepickerWorkpermit">${dateWorkpermit}</label>
                    </label>
                    <label class="label">Remaining days :
                        <label id="workpermitRemaining">${remainingWorkpermit}</label>
                    </label>
                    <label class="label">Status :
                        <label id="workpermitStatus">${workpermitStatus}</label>
                    </label>
                </div>
            </div>

        </div>

        <div class="column cards is-3" id="field">
            <div class="field">
                <div class="control">

                    <label class="label"><u>Visa</u></label>
                    <label class="label">Visa Type:
                        <label id="getVisaTypr">${data.visaType}</label>
                    </label>
                    <label class="label">Date of expiry:
                        <label id="getDatepickerVisa">${dateVisa}</label>
                    </label>
                    <label class="label">Remaining days :
                        <label id="getDatepickerPassport">${remainingVisa}</label>
                    </label>
                    <label class="label">Status :
                        <label id="visaStatus">${visaStatus}</label>
                    </label>
                    <div class="is-divider is-primary"></div>
                    <!-- ----------------------------------------------------------- -->
                    <label class="label"><u>Remark</u></label>
                    <br>
                    <div class="field">
                        <div class="control">
                            <textarea class="textarea is-primary is-medium" disabled
                                id="getRemark">${data.remark}</textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        `;
  }


}

renderDetails();


function convert(timePassport, timeWorkpermit, timeVisa) {

  // Unixtimestamp
  // get now date in seconds
  let now = Math.round(+new Date() / 1000);
  // elapsed time in day
  let elapsedPassport = Math.ceil((timePassport - now) / 86400)
  let elapsedWorkpermit = Math.ceil((timeWorkpermit - now) / 86400)
  let elapsedVisa = Math.ceil((timeVisa - now) / 86400)
  // Months array
  let months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Convert timestamp to milliseconds
  let dateP = new Date(timePassport * 1000);
  let dateW = new Date(timeWorkpermit * 1000)
  let dateV = new Date(timeVisa * 1000)

  // Year
  let yearP = dateP.getFullYear();
  let yearW = dateW.getFullYear();
  let yearV = dateV.getFullYear();

  // Month
  let monthP = months_arr[dateP.getMonth()];
  let monthW = months_arr[dateW.getMonth()];
  let monthV = months_arr[dateV.getMonth()];

  // Day
  let dayP = dateP.getDate();
  let dayW = dateW.getDate();
  let dayV = dateV.getDate();

  // Display date time in MM-dd-yyyy h:m:s format
  let convdataTimeP = dayP + ' ' + monthP + ' ' + yearP
  let convdataTimeW = dayW + ' ' + monthW + ' ' + yearW
  let convdataTimeV = dayV + ' ' + monthV + ' ' + yearV

  // Check status
  let { passportStatus, workpermitStatus, visaStatus } =
    checkStatus(elapsedPassport, elapsedWorkpermit, elapsedVisa)


  return {
    datePassport: convdataTimeP,
    remainingPassport: elapsedPassport,
    passportStatus: passportStatus,
    dateWorkpermit: convdataTimeW,
    remainingWorkpermit: elapsedWorkpermit,
    workpermitStatus: workpermitStatus,
    dateVisa: convdataTimeV,
    remainingVisa: elapsedVisa,
    visaStatus: visaStatus
  };
}

function checkStatus(elapsedPassport, elapsedWorkpermit, elapsedVisa) {

  // passportStatus ----------------------
  if (elapsedPassport >= 1 && elapsedPassport <= 195) {
    passportStatus = 'warning'
  }
  else if (elapsedPassport > 195) {
    passportStatus = 'valid'
  }
  else {
    passportStatus = 'expired'
  }
  // passportStatus ----------------------

  // workpermitStatus ----------------------
  if (elapsedWorkpermit >= 1 && elapsedWorkpermit <= 60) {
    workpermitStatus = 'warning'
  }
  else if (elapsedWorkpermit > 60) {
    workpermitStatus = 'valid'
  }
  else {
    workpermitStatus = 'expired'
  }
  // workpermitStatus ----------------------

  // visaStatus ----------------------
  if (elapsedVisa >= 1 && elapsedVisa <= 45) {
    visaStatus = 'warning'
  }
  else if (elapsedPassport > 45) {
    visaStatus = 'valid'
  }
  else {
    visaStatus = 'expired'
  }
  // visaStatus ----------------------

  return {
    passportStatus, workpermitStatus, visaStatus
  }
}

function edit() {
  remote.getCurrentWindow().loadURL(`file://${__dirname}/edit.html`)
}

