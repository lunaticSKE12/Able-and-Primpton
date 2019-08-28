

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
                ${passportStatus === 'valid' ? (`
                <li><a><b style='color: green'>
                  Passport Remaining days : ${remainingPassport}
                </b></a></li>
                <li><a><b style='color: green' >
                  Passport Status : ${passportStatus}
                </b></a></li>`) :
        (`
                <li><a><b ${passportStatus === 'warning' ?
            "style='color: orange'" : "style='color: red'"}>
                  Passport Remaining days : ${remainingPassport}
                </b></a></li>
                <li><a><b ${passportStatus === 'warning' ?
            "style='color: orange'" : "style='color: red'"}>
                  Passport Status : ${passportStatus}
                </b></a></li>
        `)}
                </ul>
              <ul class="column">
                <li><a><b>Workpermit Date of expiry : ${dateWorkpermit}</b></a></li>
                ${workpermitStatus === 'valid' ? (`
                <li><a><b style='color: green'>
                  Workpermit Remaining days : ${remainingWorkpermit}
                </b></a></li>
                <li><a><b style='color: green'>
                  Workpermit Status : ${workpermitStatus}
                </b></a></li>`) :
        (`
                <li><a><b ${workpermitStatus === 'warning' ?
            "style='color: orange'" : "style='color: red'"}>
                  Workpermit Remaining days : ${remainingWorkpermit}
                </b></a></li>
                <li><a><b ${workpermitStatus === 'warning' ?
            "style='color: orange'" : "style='color: red'"}>
                  Workpermit Status : ${workpermitStatus}
                </b></a></li>
          `)}
              </ul>
              <ul class="column">
                <li><a><b>Visa Date of expiry : ${dateVisa}</b></a></li>
                ${visaStatus === 'valid' ? (`
                <li><a><b style='color: green'>
                  Workpermit Remaining days : ${remainingVisa}
                </b></a></li>
                <li><a><b style='color: green'>
                  Workpermit Status : ${visaStatus}
                </b></a></li>`) :
        (`
                <li><a><b ${visaStatus === 'warning' ?
            "style='color: orange'" : "style='color: red'"}>
                  Workpermit Remaining days : ${remainingVisa}
                </b></a></li>
                <li><a><b ${visaStatus === 'warning' ?
            "style='color: orange'" : "style='color: red'"}>
                  Workpermit Status : ${visaStatus}
                </b></a></li>
          `)}
              </ul>
            </ul>
          </li>
        </ul>
      </aside>
      `;

    html += li

  }

}

