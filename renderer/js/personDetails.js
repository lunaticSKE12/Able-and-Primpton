let name_en = document.getElementById('getName_en')
let name_th = document.getElementById('getName_th')
let getNationality = document.getElementById("getNationality");
let passportNumber = document.getElementById('getPassportNumber')
let datepickerPassport = document.getElementById('getDatepickerPassport')

$ = require('jquery')

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
      }).then(function () {
        let checkOnloaded = setInterval(function () {
          let passportStatus = document.getElementById('passportStatus').textContent
          let workpermitStatus = document.getElementById('workpermitStatus').textContent
          let visaStatus = document.getElementById('visaStatus').textContent
          if (passportStatus !== null) {
            clearInterval(checkOnloaded)

            if (passportStatus === 'expired') {
              $('#passportRemaining').css('color', 'red')
              $('#passportStatus').css('color', 'red')
            }
            else if (passportStatus === 'warning') {
              $('#passportRemaining').css('color', 'orange')
              $('#passportStatus').css('color', 'orange')
            }
            else if (passportStatus === 'valid') {
              $('#passportRemaining').css('color', 'green')
              $('#passportStatus').css('color', 'green')
            }
          }
          if (workpermitStatus !== null) {
            clearInterval(checkOnloaded)

            if (workpermitStatus === 'expired') {
              $('#workpermitRemaining').css('color', 'red')
              $('#workpermitStatus').css('color', 'red')
            }
            else if (workpermitStatus === 'warning') {
              $('#workpermitRemaining').css('color', 'orange')
              $('#workpermitStatus').css('color', 'orange')
            }
            else if (workpermitStatus === 'valid') {
              $('#workpermitRemaining').css('color', 'green')
              $('#workpermitStatus').css('color', 'green')
            }
          }
          if (visaStatus !== null) {
            clearInterval(checkOnloaded)

            if (visaStatus === 'expired') {
              $('#visaRemaining').css('color', 'red')
              $('#visaStatus').css('color', 'red')
            }
            else if (visaStatus === 'warning') {
              $('#visaRemaining').css('color', 'orange')
              $('#visaStatus').css('color', 'orange')
            }
            else if (visaStatus === 'valid') {
              $('#visaRemaining').css('color', 'green')
              $('#visaStatus').css('color', 'green')
            }
          }

        }, 1000)

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
                    
                </div>
            </div>

        </div>

        <div class="column cards is-5" id="field">
            <div class="field">
                <div class="control">

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
                    <figure class="image is-256x256">
                      <img src="${data.passport}">
                    </figure>
                    
                </div>
            </div>
        </div>

        

        <div class="column cards is-5" id="field">
            <div class="field">
                <div class="control">

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

                <figure class="image is-256x256">
                  <img src="${data.workpermit}">
                </figure>
                    
                </div>
            </div>
        </div>

        <div class="column cards is-5" id="field">
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
                        <label id="visaRemaining">${remainingVisa}</label>
                    </label>
                    <label class="label">Status :
                        <label id="visaStatus">${visaStatus}</label>
                    </label>
                    
                    <figure class="image is-256x256">
                      <img src="${data.visa}">
                    </figure>
                </div>
            </div>
        </div>

        <div class="column cards is-3" id="field">
            <div class="field">
                <div class="control">

                    
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

function edit() {
  remote.getCurrentWindow().loadURL(`file://${__dirname}/edit.html`)
}

