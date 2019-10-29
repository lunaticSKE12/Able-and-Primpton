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
let applicationWarningDays = 5

// Convert time for timestamp to date dd-mm-yyyy for passport, workpermit, visa
// return expire date, remaining days, status for passport, workpermit, visa
function convert(timePassport, timeWorkpermit, timeVisa, timeApplicationExtendsion, timeNewAppointment) {

  // Unixtimestamp
  // get now date in seconds
  let now = Math.round(+new Date() / changeSeconds);

  // elapsed time in day
  let elapsedPassport = Math.ceil((timePassport - now) / secondsPerDay)
  let elapsedWorkpermit = Math.ceil((timeWorkpermit - now) / secondsPerDay)
  let elapsedVisa = Math.ceil((timeVisa - now) / secondsPerDay)
  let elapsedNextAppointment = Math.ceil((timeNewAppointment - now) / secondsPerDay)
  // Months array
  let months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Convert timestamp to milliseconds
  let dateP = new Date(timePassport * changeSeconds);
  let dateW = new Date(timeWorkpermit * changeSeconds)
  let dateV = new Date(timeVisa * changeSeconds)
  let dateAE = new Date(timeApplicationExtendsion * changeSeconds);
  let dateNA = new Date(timeNewAppointment * changeSeconds);

  // Year
  let yearP = dateP.getFullYear();
  let yearW = dateW.getFullYear();
  let yearV = dateV.getFullYear();
  let yearAE = dateAE.getFullYear();
  let yearNA = dateNA.getFullYear();

  // Month
  let monthP = months_arr[dateP.getMonth()];
  let monthW = months_arr[dateW.getMonth()];
  let monthV = months_arr[dateV.getMonth()];
  let monthAE = months_arr[dateAE.getMonth()];
  let monthNA = months_arr[dateNA.getMonth()];

  // Day
  let dayP = dateP.getDate();
  let dayW = dateW.getDate();
  let dayV = dateV.getDate();
  let dayAE = dateAE.getDate();
  let dayNA = dateNA.getDate();

  // Display date time in dd-MM-yyyy h:m:s format
  let convdataTimeP = dayP + ' ' + monthP + ' ' + yearP
  let convdataTimeW = dayW + ' ' + monthW + ' ' + yearW
  let convdataTimeV = dayV + ' ' + monthV + ' ' + yearV
  let convdataTimeAE = dayAE + ' ' + monthAE + ' ' + yearAE
  let convdataTimeNA = dayNA + ' ' + monthNA + ' ' + yearNA

  // Check status
  let { passportStatus, workpermitStatus, visaStatus, appointmentStatus } =
    checkStatus(elapsedPassport, elapsedWorkpermit, elapsedVisa, elapsedNextAppointment)

  return {
    datePassport: convdataTimeP,
    remainingPassport: elapsedPassport,
    passportStatus: passportStatus,
    dateWorkpermit: convdataTimeW,
    remainingWorkpermit: elapsedWorkpermit,
    workpermitStatus: workpermitStatus,
    dateVisa: convdataTimeV,
    remainingVisa: elapsedVisa,
    visaStatus: visaStatus,
    dateAppcationExtension: convdataTimeAE,
    dateNextAppointment: convdataTimeNA,
    appointmentStatus: appointmentStatus,
    remainingAppoinment: elapsedNextAppointment
  };
}

// check status for passport, workpermit, visa. Return valid, warning, expired
function checkStatus(elapsedPassport, elapsedWorkpermit, elapsedVisa, elapsedNextAppointment) {

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

  // AppoinmentStatus -------
  if (elapsedNextAppointment > 1 && elapsedNextAppointment <= applicationWarningDays) {
    appointmentStatus = 'Prepare to Pick-up'
  }
  else if (elapsedNextAppointment > applicationWarningDays) {
    appointmentStatus = 'Send'
  }
  else {
    appointmentStatus = 'Done'
  }

  return {
    passportStatus, workpermitStatus, visaStatus, appointmentStatus
  }
}