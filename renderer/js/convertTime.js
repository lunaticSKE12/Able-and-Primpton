// Convert time for timestamp to date dd-mm-yyyy for passport, workpermit, visa
// return expire date, remaining days, status for passport, workpermit, visa
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
  if (elapsedPassport >= 1 && elapsedPassport <= 195) {
    passportStatus = 'warning'
  }
  else if (elapsedPassport > 195) {
    passportStatus = 'valid'
  }
  else {
    passportStatus = 'expired'
  }
  // end passportStatus ----------------------

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
  // end workpermitStatus ----------------------

  // visaStatus ----------------------
  if (elapsedVisa >= 1 && elapsedVisa <= 45) {
    visaStatus = 'warning'
  }
  else if (elapsedVisa > 45) {
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