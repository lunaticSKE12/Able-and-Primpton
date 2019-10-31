/**
 *   @author Napong Dungduangsasitorn
 * */
// Change to seconds or milliseconds
let changeSeconds = 1000
// Seconds in one day
let secondsPerDay = 86400
// warning days for passport, workpermit, visa
let passportWarningDays = 195
let workpermitWarningDays = 60
let visaWarningDays = 45

// warning days for appointment
let applicationWarningDays = 5

// Convert time for timestamp to date dd-mm-yyyy for passport, workpermit, visa
// return expire date, remaining days, status for passport, workpermit, visa
function convert(timePassport, timeWorkpermit, timeVisa) {

  // Unixtimestamp
  // get now date in seconds
  let now = Math.round(+new Date() / changeSeconds);

  // elapsed time in day
  let elapsedPassport = Math.ceil((timePassport - now) / secondsPerDay)
  let elapsedWorkpermit = Math.ceil((timeWorkpermit - now) / secondsPerDay)
  let elapsedVisa = Math.ceil((timeVisa - now) / secondsPerDay)
  // Months array
  let months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Convert timestamp to milliseconds
  let dateP = new Date(timePassport * changeSeconds);
  let dateW = new Date(timeWorkpermit * changeSeconds)
  let dateV = new Date(timeVisa * changeSeconds)
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

  // Display date time in dd-MM-yyyy h:m:s format
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


// check status for passport, workpermit, visa. Return valid, warning, expired
function checkStatus(elapsedPassport, elapsedWorkpermit, elapsedVisa) {

  // passportStatus ----------------------
  if (elapsedPassport >= 1 && elapsedPassport <= passportWarningDays) {
    passportStatus = 'warning'
  }
  else if (elapsedPassport > passportWarningDays) {
    passportStatus = 'valid'
  }
  else {
    passportStatus = 'expired'
  }
  // end passportStatus ----------------------

  // workpermitStatus ----------------------
  if (elapsedWorkpermit >= 1 && elapsedWorkpermit <= workpermitWarningDays) {
    workpermitStatus = 'warning'
  }
  else if (elapsedWorkpermit > workpermitWarningDays) {
    workpermitStatus = 'valid'
  }
  else {
    workpermitStatus = 'expired'
  }
  // end workpermitStatus ----------------------

  // visaStatus ----------------------
  if (elapsedVisa >= 1 && elapsedVisa <= visaWarningDays) {
    visaStatus = 'warning'
  }
  else if (elapsedVisa > visaWarningDays) {
    visaStatus = 'valid'
  }
  else {
    visaStatus = 'expired'
  }
  // end visaStatus ----------------------

  return {
    passportStatus, workpermitStatus, visaStatus
  }
}

// Convert time for timestamp to date dd-mm-yyyy for application extendsion, new appointment
// return 
function convertApplication(timeApplicationExtendsion, timeNewAppointment) {

  if (
    (timeApplicationExtendsion === 'no extendsion' &&
      timeNewAppointment === 'no appointment') ||
    (timeApplicationExtendsion === undefined &&
      timeNewAppointment === undefined)
  ) {
    return {
      dateApplicationExtendsion: 'no extendsion',
      datepickerNextAppointment: 'no appointment',
      remainingApplication: '-',
      applicationStatus: '-'
    }
  }

  // Unixtimestamp
  // get now date in seconds
  let now = Math.round(+new Date() / changeSeconds);
  // elapsed time in day
  let elapsedAppointment = Math.ceil((timeNewAppointment - now) / secondsPerDay)
  // Months array
  let months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // Convert timestamp to milliseconds
  let dateE = new Date(timeApplicationExtendsion * changeSeconds)
  let dateA = new Date(timeNewAppointment * changeSeconds);
  // Year
  let yearE = dateE.getFullYear();
  let yearA = dateA.getFullYear();
  // Month
  let monthE = months_arr[dateE.getMonth()];
  let monthA = months_arr[dateA.getMonth()];


  // Day
  let dayE = dateE.getDate();
  let dayA = dateA.getDate();


  // Display date time in dd-MM-yyyy h:m:s format
  let convdataTimeE = dayE + ' ' + monthE + ' ' + yearE
  let convdataTimeA = dayA + ' ' + monthA + ' ' + yearA
  // Check status
  console.log(elapsedAppointment)
  let applicationStatus = statusApplication(elapsedAppointment)

  return {
    dateApplicationExtendsion: convdataTimeE,
    datepickerNextAppointment: convdataTimeA,
    remainingApplication: elapsedAppointment,
    applicationStatus: applicationStatus

  }

}

function statusApplication(elapsedAppointment) {
  if (elapsedAppointment >= 1 && elapsedAppointment <= applicationWarningDays) {
    applicationStatus = 'warning'
  }
  else if (elapsedAppointment > applicationWarningDays) {
    applicationStatus = 'in process'
  }
  else {
    applicationStatus = 'Done'
  }

  return applicationStatus

}