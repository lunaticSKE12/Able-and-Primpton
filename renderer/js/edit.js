/**
 *   @author Napong Dungduangsasitorn
 * */
// Show detail from server
function newPerson(imageURL, passportURL, workpermitURL, visaURL) {
  // Get all field value
  let { name_en, name_th, nationality,
    passportNumber, datepickerPassport,
    datepickerWorkpermit, visaType,
    datepickerVisa,
    dateApplicationExtendsion,
    datepickerNextAppointment,
    applicationDescription,
    remark } = getField()

  // onAuthStateChanged
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      // Get current user 
      db.collection('users').doc(user.uid).get().then(doc => {
        // Selected company and person for this user
        company_id = doc.data().selected_company_id
        company_person = doc.data().selected_person_id

        // Update URL image passport, workpermit, visa
        if (imageURL !== '') {
          dbCom.doc(company_id).collection('people').doc(company_person).update({
            imageURL: imageURL
          })
        }
        if (passportURL !== '') {
          dbCom.doc(company_id).collection('people').doc(company_person).update({
            passportURL: passportURL
          })
        }
        if (workpermitURL !== '') {
          dbCom.doc(company_id).collection('people').doc(company_person).update({
            workpermitURL: workpermitURL
          })
        }
        if (visaURL !== '') {
          dbCom.doc(company_id).collection('people').doc(company_person).update({
            visaURL: visaURL
          })
        }

        if (dateApplicationExtendsion !== '' && datepickerNextAppointment !== '') {
          // Save details to server
          dbCom.doc(company_id).collection('people').doc(company_person).update({
            name_en: name_en,
            name_th: name_th,
            nationality: nationality,
            passportNumber: passportNumber,
            datepickerPassport: new Date(datepickerPassport),
            datepickerWorkpermit: new Date(datepickerWorkpermit),
            visaType: visaType,
            datepickerVisa: new Date(datepickerVisa),
            dateApplicationExtendsion: new Date(dateApplicationExtendsion),
            datepickerNextAppointment: new Date(datepickerNextAppointment),
            applicationDescription: applicationDescription,
            remark: remark
          }).then(function () {
            remote.getCurrentWindow().loadURL(`file://${__dirname}/personDetails.html`)
          })
        }
        else {
          dbCom.doc(company_id).collection('people').doc(company_person).update({
            name_en: name_en,
            name_th: name_th,
            nationality: nationality,
            passportNumber: passportNumber,
            datepickerPassport: new Date(datepickerPassport),
            datepickerWorkpermit: new Date(datepickerWorkpermit),
            visaType: visaType,
            datepickerVisa: new Date(datepickerVisa),
            dateApplicationExtendsion: "no extendsion",
            datepickerNextAppointment: "no appointment",
            applicationDescription: "no description",
            remark: remark
          }).then(function () {
            remote.getCurrentWindow().loadURL(`file://${__dirname}/personDetails.html`)
          })
        }


      })
    } else {
      // No user is signed in.
    }
  });
}

// Render page
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
          // Show person name in breadcrumb
          let text2 = document.getElementById('personTxt')
          text2.innerHTML = snapshot.data().name_en

          // Render
          renderDetail(snapshot.data())
        })
      })
    } else {
      // No user is signed in.
    }
  });


  const renderDetail = (data) => {

    // Get timestamp
    let { datePassport,
      dateWorkpermit,
      dateVisa }
      = convert(data.datepickerPassport.seconds,
        data.datepickerWorkpermit.seconds,
        data.datepickerVisa.seconds);

    let { dateApplicationExtendsion, datepickerNextAppointment } =
      convertApplication(data.dateApplicationExtendsion,
        data.datepickerNextAppointment);

    document.querySelector('.editField').innerHTML = `

  <!-- Field name email -->
  <div class="column cards" id="field">
    <div class="field">
    <label class="label"><u>Name</u></label>
      <div class="control">
        <label class="label">Full name
          <label class="redDot">*</label>
        </label>
        <input class="input inputPerson" id="name_en" value="${data.name_en}" type="text" placeholder="e.g Alice Tanya">
        <label class="label">Full name in Thai</label>
        <input class="input inputPerson" id="name_th" type="text" value="${data.name_th}" placeholder="e.g อลิส ธัญญา">
      </div>
    </div>

    <!-- Select nationality -->
    <div class="field">
      <label class="label">Nationality
        <label class="redDot">*</label>
      </label>
      <p class="control has-icons-left">
        <span class="select" id="nationality">
          <select id="nation">
            <option selected>Selected</option>
            <option value="Afghan">Afghan</option>
            <option value="Albanian">Albanian</option>
            <option value="Algerian">Algerian</option>
            <option value="American">American</option>
            <option value="Andorran">Andorran</option>
            <option value="Angolan">Angolan</option>
            <option value="Antiguans">Antiguans</option>
            <option value="Argentinean">Argentinean</option>
            <option value="Armenian">Armenian</option>
            <option value="Australian">Australian</option>
            <option value="Austrian">Austrian</option>
            <option value="Azerbaijani">Azerbaijani</option>
            <option value="Bahamian">Bahamian</option>
            <option value="Bahraini">Bahraini</option>
            <option value="Bangladeshi">Bangladeshi</option>
            <option value="Barbadian">Barbadian</option>
            <option value="Barbudans">Barbudans</option>
            <option value="Batswana">Batswana</option>
            <option value="Belarusian">Belarusian</option>
            <option value="Belgian">Belgian</option>
            <option value="Belizean">Belizean</option>
            <option value="Beninese">Beninese</option>
            <option value="Bhutanese">Bhutanese</option>
            <option value="Bolivian">Bolivian</option>
            <option value="Bosnian">Bosnian</option>
            <option value="Brazilian">Brazilian</option>
            <option value="British">British</option>
            <option value="Bruneian">Bruneian</option>
            <option value="Bulgarian">Bulgarian</option>
            <option value="Burkinabe">Burkinabe</option>
            <option value="Burmese">Burmese</option>
            <option value="Burundian">Burundian</option>
            <option value="Cambodian">Cambodian</option>
            <option value="Cameroonian">Cameroonian</option>
            <option value="Canadian">Canadian</option>
            <option value="Cape Verdean">Cape Verdean</option>
            <option value="Central African">Central African</option>
            <option value="Chadian">Chadian</option>
            <option value="Chilean">Chilean</option>
            <option value="Chinese">Chinese</option>
            <option value="Colombian">Colombian</option>
            <option value="Comoran">Comoran</option>
            <option value="Congolese">Congolese</option>
            <option value="Costa Rican">Costa Rican</option>
            <option value="Croatian">Croatian</option>
            <option value="Cuban">Cuban</option>
            <option value="Cypriot">Cypriot</option>
            <option value="Czech">Czech</option>
            <option value="Danish">Danish</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominican">Dominican</option>
            <option value="Dutch">Dutch</option>
            <option value="East Timorese">East Timorese</option>
            <option value="Ecuadorean">Ecuadorean</option>
            <option value="Egyptian">Egyptian</option>
            <option value="Emirian">Emirian</option>
            <option value="Equatorial Guinean">Equatorial Guinean</option>
            <option value="Eritrean">Eritrean</option>
            <option value="Estonian">Estonian</option>
            <option value="Ethiopian">Ethiopian</option>
            <option value="Fijian">Fijian</option>
            <option value="Filipino">Filipino</option>
            <option value="Finnish">Finnish</option>
            <option value="French">French</option>
            <option value="Gabonese">Gabonese</option>
            <option value="Gambian">Gambian</option>
            <option value="Georgian">Georgian</option>
            <option value="German">German</option>
            <option value="Ghanaian">Ghanaian</option>
            <option value="Greek">Greek</option>
            <option value="Grenadian">Grenadian</option>
            <option value="Guatemalan">Guatemalan</option>
            <option value="Guinea-Bissauan">Guinea-Bissauan</option>
            <option value="Guinean">Guinean</option>
            <option value="Guyanese">Guyanese</option>
            <option value="Haitian">Haitian</option>
            <option value="Herzegovinian">Herzegovinian</option>
            <option value="Honduran">Honduran</option>
            <option value="Hungarian">Hungarian</option>
            <option value="Icelander">Icelander</option>
            <option value="Indian">Indian</option>
            <option value="Indonesian">Indonesian</option>
            <option value="Iranian">Iranian</option>
            <option value="Iraqi">Iraqi</option>
            <option value="Irish">Irish</option>
            <option value="Israeli">Israeli</option>
            <option value="Italian">Italian</option>
            <option value="Ivorian">Ivorian</option>
            <option value="Jamaican">Jamaican</option>
            <option value="Japanese">Japanese</option>
            <option value="Jordanian">Jordanian</option>
            <option value="Kazakhstani">Kazakhstani</option>
            <option value="Kenyan">Kenyan</option>
            <option value="Kittian and Nevisian">Kittian and Nevisian</option>
            <option value="Kuwaiti">Kuwaiti</option>
            <option value="Kyrgyz">Kyrgyz</option>
            <option value="Laotian">Laotian</option>
            <option value="Latvian">Latvian</option>
            <option value="Lebanese">Lebanese</option>
            <option value="Liberian">Liberian</option>
            <option value="Libyan">Libyan</option>
            <option value="Liechtensteiner">Liechtensteiner</option>
            <option value="Lithuanian">Lithuanian</option>
            <option value="Luxembourger">Luxembourger</option>
            <option value="Macedonian">Macedonian</option>
            <option value="Malagasy">Malagasy</option>
            <option value="Malawian">Malawian</option>
            <option value="Malaysian">Malaysian</option>
            <option value="Maldivan">Maldivan</option>
            <option value="Malian">Malian</option>
            <option value="Maltese">Maltese</option>
            <option value="Marshallese">Marshallese</option>
            <option value="Mauritanian">Mauritanian</option>
            <option value="Mauritian">Mauritian</option>
            <option value="Mexican">Mexican</option>
            <option value="Micronesian">Micronesian</option>
            <option value="Moldovan">Moldovan</option>
            <option value="Monacan">Monacan</option>
            <option value="Mongolian">Mongolian</option>
            <option value="Moroccan">Moroccan</option>
            <option value="Mosotho">Mosotho</option>
            <option value="Motswana">Motswana</option>
            <option value="Mozambican">Mozambican</option>
            <option value="Namibian">Namibian</option>
            <option value="Nauruan">Nauruan</option>
            <option value="Nepalese">Nepalese</option>
            <option value="New Zealander">New Zealander</option>
            <option value="Ni-Vanuatu">Ni-Vanuatu</option>
            <option value="Nicaraguan">Nicaraguan</option>
            <option value="Nigerien">Nigerien</option>
            <option value="North Korean">North Korean</option>
            <option value="Northern Irish">Northern Irish</option>
            <option value="Norwegian">Norwegian</option>
            <option value="Omani">Omani</option>
            <option value="Pakistani">Pakistani</option>
            <option value="Palauan">Palauan</option>
            <option value="Panamanian">Panamanian</option>
            <option value="Papua New Guinean">Papua New Guinean</option>
            <option value="Paraguayan">Paraguayan</option>
            <option value="Peruvian">Peruvian</option>
            <option value="Polish">Polish</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Qatari">Qatari</option>
            <option value="Romanian">Romanian</option>
            <option value="Russian">Russian</option>
            <option value="Rwandan">Rwandan</option>
            <option value="Saint Lucian">Saint Lucian</option>
            <option value="Salvadoran">Salvadoran</option>
            <option value="Samoan">Samoan</option>
            <option value="San Marinese">San Marinese</option>
            <option value="Sao Tomean">Sao Tomean</option>
            <option value="Saudi">Saudi</option>
            <option value="Scottish">Scottish</option>
            <option value="Senegalese">Senegalese</option>
            <option value="Serbian">Serbian</option>
            <option value="Seychellois">Seychellois</option>
            <option value="Sierra Leonean">Sierra Leonean</option>
            <option value="Singaporean">Singaporean</option>
            <option value="Slovakian">Slovakian</option>
            <option value="Slovenian">Slovenian</option>
            <option value="Solomon Islander">Solomon Islander</option>
            <option value="Somali">Somali</option>
            <option value="South African">South African</option>
            <option value="South Korean">South Korean</option>
            <option value="Spanish">Spanish</option>
            <option value="Sri Lankan">Sri Lankan</option>
            <option value="Sudanese">Sudanese</option>
            <option value="Surinamer">Surinamer</option>
            <option value="Swazi">Swazi</option>
            <option value="Swedish">Swedish</option>
            <option value="Swiss">Swiss</option>
            <option value="Syrian">Syrian</option>
            <option value="Taiwanese">Taiwanese</option>
            <option value="Tajik">Tajik</option>
            <option value="Tanzanian">Tanzanian</option>
            <option value="Thai">Thai</option>
            <option value="Togolese">Togolese</option>
            <option value="Tongan">Tongan</option>
            <option value="Trinidadian or Tobagonian">Trinidadian or Tobagonian</option>
            <option value="Tunisian">Tunisian</option>
            <option value="Turkish">Turkish</option>
            <option value="Tuvaluan">Tuvaluan</option>
            <option value="Ugandan">Ugandan</option>
            <option value="Ukrainian">Ukrainian</option>
            <option value="Uruguayan">Uruguayan</option>
            <option value="Uzbekistani">Uzbekistani</option>
            <option value="Venezuelan">Venezuelan</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Welsh">Welsh</option>
            <option value="Yemenite">Yemenite</option>
            <option value="Zambian">Zambian</option>
            <option value="Zimbabwean">Zimbabwean</option>
          </select>
        </span>
        <span class="icon is-small is-left">
          <i class="fas fa-globe"></i>
        </span>
      </p>
    </div>
    <!-- Select nationality -->

    <!-- Uploading image -->
      <br>

      <label class="label"><u>Image</u></label>
      <div class="file has-name is-boxed upload-box is-centered">
        <label class="file-label">
          <input class="file-input" type="file" name="resume" id="imageFile" onchange="showFileName('image')">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
          </span>
          <span class="file-name" id="textInput_image">
          </span>
        </label>
      </div>
      <div class="progress-wrapper">
        <progress class="progress is-link is-medium" value="0" max="100" id="progressImage"></progress>
        <p class="progress-value" id="uploaderImageValue">0%</p>
      </div>

      <!-- end Uploading image -->
  </div>
  <!-- Field name email -->

  <!-- Field passport -->
  <div class="field column cards" id="field">
    <label class="label"><u>Passport</u></label>
    <br>
    <label class="label">Passport Number
      <label class="redDot">*</label>
    </label>
    <div class="control">
      <input class="input" id="passportNumber" type="text" value="${data.passportNumber}" placeholder="e.g A1B2C3">
    </div>
    <br>
    <label class="label">Date of expiry
      <label class="redDot">*</label>
    </label>
    <div class="control datepicker">
      <input type="date" class="select-date" id="datepickerPassport" value="${datePassport}">
    </div>

    <br>
      <div class="file has-name is-boxed upload-box is-centered">
        <label class="file-label">
          <input class="file-input" type="file" name="resume" id="passportFile" onchange="showFileName('passport')">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
          </span>
          <span class="file-name" id="textInput_passport">
          </span>
        </label>
      </div>
      <div class="progress-wrapper">
        <progress class="progress is-link is-medium" value="0" max="100" id="progressPassport"></progress>
        <p class="progress-value" id="uploaderPassportValue">0%</p>
      </div>
    </div>
  </div>
  <!-- Field passport -->


  <!-- Field workpermit -->
  <div class="field column cards" id="field">
    <br>
    <label class="label"><u>Work Permit</u></label>
    <br>
    <label class="label">Date of expiry
      <label class="redDot">*</label>
    </label>
    <div class="control datepicker">
      <input type="date" class="select-date" id="datepickerWorkpermit" value="${dateWorkpermit}">
    </div>

    <br>
      <div class="file has-name is-boxed upload-box is-centered">
        <label class="file-label">
          <input class="file-input" type="file" name="resume" id="workpermitFile" onchange="showFileName('workpermit')">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
          </span>
          <span class="file-name" id="textInput_workpermit">
          </span>
        </label>
      </div>
      <div class="progress-wrapper">
        <progress class="progress is-link is-medium" value="0" max="100" id="progressWorkpermit"></progress>
        <p class="progress-value" id="uploaderWorkpermitValue">0%</p>
      </div>
  </div>
  <!-- Field workpermit -->

  <!-- Field Visa -->
  <div class="field column cards" id="field">
    <br>
    <label class="label"><u>Visa (Non-Immigrant B)</u></label>
    <br>
    <label class="label">Visa Type
      <label class="redDot">*</label>
    </label>
    <span class="select" id="visaType">
      <select id="type">
      <option selected>Selected</option>
      <option value="Tourist Visa">Tourist Visa</option>
      <option value="Transit Visa">Transit Visa</option>
      <option value="Non-Quota Immigrant">Non-Quota Immigrant</option>
      <option value="Non – Immigrant Visa “F”">Non – Immigrant Visa “F”</option>
      <option value="Non - Immigrant Visa “IB”">Non - Immigrant Visa “IB”</option>
      <option value="Non – Immigrant Visa “B”">Non – Immigrant Visa “B”</option>
      <option value="Non – Immigrant Visa “ED”">Non – Immigrant Visa “ED”</option>
      <option value="Non – Immigrant Visa “M”">Non – Immigrant Visa “M”</option>
      <option value="Non – Immigrant Visa “R”">Non – Immigrant Visa “R”</option>
      <option value="Non – Immigrant Visa “EX”">Non – Immigrant Visa “EX”</option>
      <option value="Non – Immigrant Visa “RS”">Non – Immigrant Visa “RS”</option>
      <option value="Non – Immigrant Visa “O”">Non – Immigrant Visa “O”</option>
      <option value="Non – Immigrant Visa “O-A”">Non – Immigrant Visa “O-A”</option>
      <option value="Non – Immigrant Visa “O-X”">Non – Immigrant Visa “O-X”</option>
      </select>
    </span>
    <label class="label">Date of expiry
      <label class="redDot">*</label>
    </label>
    <div class="control datepicker">
      <input type="date" class="select-date" id="datepickerVisa" value="${dateVisa}">
    </div>

    <br>
      <div class="file has-name is-boxed upload-box is-centered">
        <label class="file-label">
          <input class="file-input" type="file" name="resume" id="visaFile" onchange="showFileName('visa')">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
          </span>
          <span class="file-name" id="textInput_visa">
          </span>
        </label>
      </div>
      <div class="progress-wrapper">
        <progress class="progress is-link is-medium" value="0" max="100" id="progressVisa"></progress>
        <p class="progress-value" id="uploaderVisaValue">0%</p>
      </div>
  </div>
  <!-- Field Visa -->

  <!-- Field Application -->
    <div class="field column cards " id="field">
      <br>
      <label class="label"><u>Application Submission</u></label>
      <br>
      <label class="label">Date of application for extension</label>

      <div class="control datepicker">
        <input type="date" class="select-date" id="datepickerExtension" value="${dateApplicationExtendsion}">
      </div>

      <br>
      <label class="label">Next appointment</label>
      <div class="control datepicker">
        <input type="date" class="select-date" id="datepickerNextAppointment" value="${datepickerNextAppointment}">
      </div>
      <br>
      <label class="label">Application Description</label>
      <span class="select" id="application">
        <select id="applicationDescription">
          <option selected>Selected</option>
          <option value="1 month">1 month</option>
          <option value="90 days">90 days</option>
          <option value="1 year">1 year</option>
        </select>
      </span>
    </div>
    <!-- end Field Application -->

  <!-- Field Remark -->
  <div class="field column cards" id="field">
    <br>
    <label class="label"><u>Remark</u></label>
    <br>
    <div class="field">
      <div class="control">
        <textarea class="textarea is-primary is-medium" id="remark" placeholder="Remark something">${data.remark}</textarea>
      </div>
    </div>
  </div>
  <!-- Field Remark -->
        `;

    // Set dropdown nation and visa type value
    SelectElement("nation", `${data.nationality}`)
    SelectElement("type", `${data.visaType}`)
    SelectElement("applicationDescription", `${data.applicationDescription}`)

    // Set dropdown value
    function SelectElement(id, valueToSelect) {
      var element = document.getElementById(id);
      element.value = valueToSelect;

    }
  }

}

// Call render
renderDetails();

// Change to seconds or milliseconds
let changeSeconds = 1000
// Convert timestamp
function convert(timePassport, timeWorkpermit, timeVisa) {

  // Convert timestamp to milliseconds
  let dateP = new Date(timePassport * changeSeconds);
  let dateW = new Date(timeWorkpermit * changeSeconds)
  let dateV = new Date(timeVisa * changeSeconds)

  // Year
  let yearP = dateP.getFullYear();
  let yearW = dateW.getFullYear();
  let yearV = dateV.getFullYear();

  // Month 
  // Set for datepicker format
  let monthP = dateP.getMonth() + 1;
  if (monthP < 10) {
    monthP = "0" + monthP
  }
  let monthW = dateW.getMonth() + 1;
  if (monthW < 10) {
    monthW = "0" + monthW
  }
  let monthV = dateV.getMonth() + 1;
  if (monthV < 10) {
    monthV = "0" + monthV
  }

  // Day
  // Set for datepicker format
  let dayP = dateP.getDate();
  if (dayP < 10) {
    dayP = "0" + dayP
  }
  let dayW = dateW.getDate();
  if (dayW < 10) {
    dayW = "0" + dayW
  }
  let dayV = dateV.getDate();
  if (dayV < 10) {
    dayV = "0" + dayV
  }

  // Display date time in yyyy-MM-dd format
  let convdataTimeP = yearP + '-' + monthP + '-' + dayP
  let convdataTimeW = yearW + '-' + monthW + '-' + dayW
  let convdataTimeV = yearV + '-' + monthV + '-' + dayV

  return {
    datePassport: convdataTimeP,
    dateWorkpermit: convdataTimeW,
    dateVisa: convdataTimeV
  };
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

  // Convert timestamp to milliseconds
  let dateE = new Date(timeApplicationExtendsion * changeSeconds)
  let dateA = new Date(timeNewAppointment * changeSeconds);
  // Year
  let yearE = dateE.getFullYear();
  let yearA = dateA.getFullYear();

  // Month 
  // Set for datepicker format
  let monthE = dateE.getMonth() + 1;
  if (monthE < 10) {
    monthE = "0" + monthE
  }
  let monthA = dateA.getMonth() + 1;
  if (monthA < 10) {
    monthA = "0" + monthA
  }

  // Day
  // Set for datepicker format
  let dayE = dateE.getDate();
  if (dayE < 10) {
    dayE = "0" + dayE
  }
  let dayA = dateE.getDate();
  if (dayA < 10) {
    dayA = "0" + dayA
  }

  // Display date time in yyyy-MM-dd format
  let convdataTimeE = yearE + '-' + monthE + '-' + dayE
  let convdataTimeA = yearA + '-' + monthA + '-' + dayA

  return {
    dateApplicationExtendsion: convdataTimeE,
    datepickerNextAppointment: convdataTimeA,

  }

}
