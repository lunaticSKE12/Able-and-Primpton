

// Delay to load all companies
let start
var check = function () {
  if (start) {
    // run when condition is met
    renderBoard()
    start = false;
  }
  else {
    setTimeout(check, 500); // check again in a second
    start = true;
  }
}
check();


$ = require('jquery')

let html = '';

function renderBoard() {

  dbCom.orderBy('name').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data().name);
      let companyName = doc.data().name

      // Render all people in company
      dbCom.doc(doc.id).collection('people')
        .orderBy('name_en').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(companyName, " => ", doc.data().name_en);

            let { datePassport, remainingPassport,
              passportStatus,
              dateWorkpermit, remainingWorkpermit,
              workpermitStatus,
              dateVisa, remainingVisa,
              visaStatus }
              = convert(doc.data().datepickerPassport.seconds,
                doc.data().datepickerWorkpermit.seconds,
                doc.data().datepickerVisa.seconds);

            console.log(datePassport, remainingPassport,
              passportStatus,
              dateWorkpermit, remainingWorkpermit,
              workpermitStatus,
              dateVisa, remainingVisa,
              visaStatus)

            let isWarning =
              passportStatus === 'warning' ||
              workpermitStatus === 'warning' ||
              visaStatus === 'warning' ||
              passportStatus === 'expired' ||
              workpermitStatus === 'expired' ||
              visaStatus === 'expired'

            if (isWarning) {
              renderCompanies(companyName, doc,
                datePassport, remainingPassport,
                passportStatus,
                dateWorkpermit, remainingWorkpermit,
                workpermitStatus,
                dateVisa, remainingVisa,
                visaStatus)
            }
            notiBoard.innerHTML = html;
          });
        });

    })
  }).then(function () {
    let checkOnloaded = setInterval(function () {
      let passportStatus = document.getElementById('passportStatus').textContent
      let workpermitStatus = document.getElementById('workpermitStatus').textContent
      let visaStatus = document.getElementById('visaStatus').textContent
      if (passportStatus !== null) {
        console.log("after")
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
  });




  const notiBoard = document.querySelector('.notiBoard')
  const renderCompanies = (companyName, doc,
    datePassport, remainingPassport,
    passportStatus,
    dateWorkpermit, remainingWorkpermit,
    workpermitStatus,
    dateVisa, remainingVisa,
    visaStatus) => {


    const detail = doc.data();
    const li = `
      <aside class="menu column is-12">
        <ul class="menu-list">
          <li >
            <a class="is-active">${companyName}</a>
            <ul class="columns">
              <ul class="column">
                <li><a><b>${detail.name_en}</b></a></li>
                <li><a><b>Passport Date of expiry : ${datePassport}</b></a></li>
                <li id="passportRemaining"><a><b >Passport Remaining days : ${remainingPassport}</b></a></li>
                <li id="passportStatus"><a><b>Passport Status : ${passportStatus}</b></a></li>
              </ul>
              <ul class="column">
                <li><a><b>Workpermit Date of expiry : ${dateWorkpermit}</b></a></li>
                <li id="workpermitRemaining"><a><b>Workpermit Remaining days : ${remainingWorkpermit}</b></a></li>
                <li id="workpermitStatus"><a><b>Workpermit Status : ${workpermitStatus}</b></a></li>
              </ul>
              <ul class="column">
                <li><a><b>Visa Date of expiry : ${dateVisa}</b></a></li>
                <li id="visaRemaining"><a><b>Visa Remaining days : ${remainingVisa}</b></a></li>
                <li id="visaStatus"><a><b>Visa Status : ${visaStatus}</b></a></li>
              </ul>
            </ul>
          </li>
        </ul>
      </aside>
      <div class="is-divider" id="line1"></div>
      `;

    html += li

  }

}

