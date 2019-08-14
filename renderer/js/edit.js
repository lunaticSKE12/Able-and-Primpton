
function renderDetails() {
  var company_person
  // Get selected company id 
  dbSelectedCom.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      // Get id selected company and person
      company_id = doc.data().selected_card
      company_person = doc.data().selected_person

      // Find match company id selected to show name
      dbCom.doc(company_id).onSnapshot((snapshot) => {
        let text = document.getElementById('companyTxt')
        console.log(snapshot.data().name)
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
    });
  });

  const renderDetail = (data) => {

    let { datePassport,
      dateWorkpermit,
      dateVisa }
      = convert(data.datepickerPassport.seconds,
        data.datepickerWorkpermit.seconds,
        data.datepickerVisa.seconds);

    document.querySelector('.editField').innerHTML = `
    <div class="column cards" id="field">
      <label class="label"><u>Photo</u></label>
      <figure class="image is-256x256" id="personImage">
        <img style="width: 256px;" src="${data.img}">
        <div class="field">
          <div class="file is-info is-small has-name ">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" id="file2" onchange="showFileName()">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label ">
                  upload file…
                </span>
              </span>
              <span class="file-name" id="textInput">
              </span>
            </label>
          </div>
        </div>
      </figure>
    </div>

  <!-- Field name email -->
  <div class="column cards" id="field">
    <div class="field">
      <!-- <label class="label">Name</label> -->
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
  </div>
  <!-- Field Visa -->

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

    SelectElement("nation", `${data.nationality}`)
    SelectElement("type", `${data.visaType}`)

    function SelectElement(id, valueToSelect) {
      var element = document.getElementById(id);
      element.value = valueToSelect;
    }
  }

}

renderDetails();


function convert(timePassport, timeWorkpermit, timeVisa) {

  // Convert timestamp to milliseconds
  let dateP = new Date(timePassport * 1000);
  let dateW = new Date(timeWorkpermit * 1000)
  let dateV = new Date(timeVisa * 1000)

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
        company_person = doc.data().selected_person

        // Save detail to server
        dbCom.doc(company_id).collection('people').doc(company_person).update({
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
          remote.getCurrentWindow().loadURL(`file://${__dirname}/personDetails.html`)
        })
      });
    });

  }
  else {
    dialog.showMessageBox(null, options, (response) => {
      if (response === 1) {
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
