// // Initialize all input of type date
// var calendars = bulmaCalendar.attach('[type="date"]', options);

// // Loop on each calendar initialized
// for (var i = 0; i < calendars.length; i++) {
// 	// Add listener to date:selected event
// 	calendars[i].on('select', date => {
// 		console.log(date);
// 	});
// }

// To access to bulmaCalendar instance of an element
var element = document.querySelector('#my-element');
if (element) {
	// bulmaCalendar instance is available as element.bulmaCalendar
	element.bulmaCalendar.on('select', function (datepicker) {
		console.log(datepicker.data.value());
	});
}


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


	let check = (name_en != '' || name_en == null)
	// &&
	// 	(nationality != '' || nationality == null) &&
	// 	(passportNumber != '' || passportNumber == null) &&
	// 	(datepickerPassport != '' || datepickerPassport == null) &&
	// 	(datepickerWorkpermit != '' || datepickerWorkpermit == null) &&
	// 	(visaType != '' || visaType == null) &&
	// 	(datepickerVisa != '' || datepickerVisa == null)

	if (check) {
		console.log(name_en, name_th)

		firebase.firestore().collection('selected_company').get().then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				// doc.data() is never undefined for query doc snapshots
				company_id = doc.data().selected_card

				console.log(company_id)

				firebase.firestore().collection('companies').doc(company_id).collection('people').add({
					name_en: name_en,
					name_th: name_th
				})

			});
		});

	}
	else {
		dialog.showMessageBox(null, options, (response) => {
			if (response === 1) {
				console.log('alert')
			}
		});


	}
}

const options = {
	type: 'question',
	buttons: ['Ok'],
	defaultId: 2,
	title: 'Alert',
	message: 'Please fill all require field'
};