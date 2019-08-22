// Delay to load all companies
let start
var check = function () {
	if (start) {
		// run when condition is met
		renderPeople()
		start = false;
	}
	else {
		setTimeout(check, 500); // check again in a second
		start = true;
	}
}
check();
// ************************

// Render all people in company realtime  
function renderPeople() {

	// onAuthStateChanged
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			db.collection('users').doc(user.uid).get().then(doc => {
				// Selected company for this user
				company_id = doc.data().selected_company_id
				dbCom.doc(company_id).get().then(function (doc) {
					// Show company name on breadcrumbs
					let text = document.getElementById('companyTxt')
					text.innerHTML = doc.data().name
				})
				// Render all people in company
				dbCom.doc(company_id).collection('people').orderBy('name_en').onSnapshot((snapshot) => {
					renderPeople(snapshot.docs)
				})
			})
		} else {
			// No user is signed in.
		}
	});

	const peopleList = document.querySelector('.card-people')

	const renderPeople = (data) => {

		let html = '';
		let li = ``;
		data.forEach(doc => {

			const detail = doc.data();
			li = `
<div class="cards column is-3">
	<div class="person" id="${doc.id}" onclick="selectPerson(this.id)">
		<div class="card-content">
			<div class="content">
				<p id="name_en">${detail.name_en}</p>
				<p id="name_th">${detail.name_th}</p>
			</div>
		</div>
	</div>
	<span class="icon has-text-danger is-pulled-right" id="${doc.id}" onclick="deleteCard(this.id)">
		<i class="fas fa-lg fa-ban" ></i>
	</span>
</div>`;
			html += li
		});
		peopleList.innerHTML = html;
	}

}

// Delete person
function deleteCard(id) {
	// Get selected company id 
	console.log(id)
	var user = firebase.auth().currentUser;
	db.collection('users').doc(user.uid).get().then(doc => {
		company_id = doc.data().selected_company_id
		dialog.showMessageBox(null, options, (response) => {
			if (response === 1) {
				dbCom.doc(company_id).collection('people').doc(id).delete();
			}
		});
	})
}

// Dialog confirm delete
const options = {
	type: 'question',
	buttons: ['Cancel', 'Yes, please', 'No, thanks'],
	defaultId: 2,
	title: 'Question',
	message: 'Do you want to do delete this?',
	detail: 'this person will permanent deleted'
};

// Open person details
function selectPerson(id) {
	var user = firebase.auth().currentUser;

	// update selected for each user
	db.collection('users').doc(user.uid).update({
		selected_person_id: id
	}).then(function () {
		remote.getCurrentWindow().loadURL(`file://${__dirname}/personDetails.html`)
	})
}

// New person
function newPerson() {
	remote.getCurrentWindow().loadURL(`file://${__dirname}/editPerson.html`)
}


function newPage() {
	remote.getCurrentWindow().loadURL(`file://${__dirname}/new.html`)
}