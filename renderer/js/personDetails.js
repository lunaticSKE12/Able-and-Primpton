/**
 *   @author Napong Dungduangsasitorn
 * */
$ = require('jquery')
const { clipboard } = require('electron')

// Render person detail
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

  // Render 
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

    let { dateApplicationExtendsion, datepickerNextAppointment,
      remainingApplication, applicationStatus }
      = convertApplication(data.dateApplicationExtendsion,
        data.datepickerNextAppointment);


    // Push render to HTML
    document.querySelector('.card-detail').innerHTML = `
        
        <div class="column cards is-4" id="field">
            <div class="field">
                <div class="control">
                    <label class="label">Name :
                        <label>${data.name_en}</label>
                    </label>
                    <label class="label">ชื่อ :
                        <label>${data.name_th}</label>
                    </label>
                    <label class="label">Nationality :
                        <label>${data.nationality}</label>
                    </label>

                    <figure class="column image">
                      <img src="${data.imageURL}">
                    </figure>
                    
                </div>
            </div>
        </div>

        <div class="column cards is-3" id="field">
            <div class="field">
                <div class="control">
                <label class="label"><u>Passport</u></label>
                    <label class="label">Passport Number :
                        <label>${data.passportNumber}</label>
                    </label>
                    <label class="label">Date of expiry :
                        <label>${datePassport}</label>
                    </label>
                    ${passportStatus === 'valid' ?
        (`
                    <label class="label" style='color: green'>
                      Remaining days : ${remainingPassport}
                    </label>
                    <label class="label" style='color: green'>
                      Status : ${passportStatus}
                    </label>
        `) :
        (`
                    <label class="label" ${passportStatus === 'warning' ?
            "style='color: orange'" : "style='color: red'"}>
                      Remaining days : ${remainingPassport}
                    </label>
                    <label class="label" ${passportStatus === 'warning' ?
            "style='color: orange'" : "style='color: red'"}>
                      Status : ${passportStatus}
                    </label>
        `)}
                  <label class="label">
                    <a id="${data.passportURL}" onclick="copyURL(this.id)"><u>passport link</u></a>
                  </label>
                </div>
            </div>
        </div>

        <div class="column cards is-3" id="field">
            <div class="field">
                <div class="control">
                <label class="label"><u>Work Permit</u></label>
                <label class="label">Date of expiry :
                    <label>${dateWorkpermit}</label>
                </label>
                ${workpermitStatus === 'valid' ?
        (`
                <label class="label" style='color: green'>
                  Remaining days : ${remainingWorkpermit}
                </label>
                <label class="label" style='color: green'>
                  Status : ${workpermitStatus}
                </label>
        `) :
        (`
                <label class="label" ${workpermitStatus === 'warning' ?
            "style='color: orange'" : "style='color: red'"}>
                  Remaining days : ${remainingWorkpermit}
                </label>
                <label class="label" ${workpermitStatus === 'warning' ?
            "style='color: orange'" : "style='color: red'"}>
                  Status : ${workpermitStatus}
                </label>
        `)}
        
                  <label class="label">
                    <a id="${data.workpermitURL}" onclick="copyURL(this.id)"><u>workpermit link</u></a>
                  </label>
                </div>
            </div>
        </div>

        <div class="column cards" id="field">
            <div class="field">
                <div class="control">
                    <label class="label"><u>Visa</u></label>
                    <label class="label">Visa Type :
                        <label>${data.visaType}</label>
                    </label>
                    <label class="label">Date of expiry :
                        <label>${dateVisa}</label>
                    </label>
                    ${visaStatus === 'valid' ?
        (`
                    <label class="label" style='color: green'>
                      Remaining days : ${remainingVisa}
                    </label>
                    <label class="label" style='color: green'>
                      Status : ${visaStatus}
                    </label>
                    `) :
        (`
                    <label class="label" ${visaStatus === 'warning' ?
            "style='color: orange'" : "style='color: red'"}>
                      Remaining days : ${remainingVisa}
                    </label>
                    <label class="label" ${visaStatus === 'warning' ?
            "style='color: orange'" : "style='color: red'"}>
                      Status : ${visaStatus}
                    </label>
        `)}

                  <label class="label">
                    <a id="${data.visaURL}" onclick="copyURL(this.id)"><u>visa link</u></a>
                  </label>    
                </div>
            </div>
        </div>




        <div class="field column cards" id="field">
          <label class="label"><u>Application Submission</u></label>
          <label class="label">Date of application for extension : ${dateApplicationExtendsion}</label>
          <label class="label">Next appointment : ${datepickerNextAppointment}</label>
          <label class="label">Application Description : ${data.applicationDescription === undefined ?
        (`no description`) : (`${data.applicationDescription}`)}</label>
        ${applicationStatus === 'warning' ? (`
          <label class="label" style='color: orange'>Remaining days : ${remainingApplication}</label>
          <label class="label" style='color: orange'>Status : ${applicationStatus}</label>
        `) :
        (`
          <label class="label" style='color: green'>Remaining days : ${remainingApplication}</label>
          <label class="label" style='color: green'>Status : ${applicationStatus}</label>
        `)}  
          
        </div>
        



        <div class="column cards is-3" id="field">
            <div class="field">
                <div class="control">
                    <label class="label"><u>Remark</u></label>
                    <br>
                    <div class="field">
                        <div class="control">
                            <textarea class="textarea is-primary is-medium" disabled>${data.remark}</textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        `;
  }

}

// Call render
renderDetails();

// Go to edit person page
function edit() {
  remote.getCurrentWindow().loadURL(`file://${__dirname}/edit.html`)
}

function copyURL(url) {
  clipboard.writeText(url, 'selection')
  console.log(clipboard.readText('selection'))
  alert("Copy link, please paste in browser")
}

