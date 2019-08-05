// Delay to load all companies
let start
var check = function () {
	if (start) {
		// run when condition is met
		renderCompanies()
		start = false;
	}
	else {
		setTimeout(check, 500); // check again in a second
		start = true;
	}
}
check();
// ************************

// Delete company
function deleteCard() {
	// Get id of company to delete in firestore
	let id = document.querySelector('.cards').getAttribute('id')

	// Confirm before delete
	dialog.showMessageBox(null, options, (response) => {
		if (response === 1) {
			console.log('delete')
			console.log(id)
			firebase.firestore().collection('companies').doc(id).delete();
		}
	});
}

// Dialog confirm delete
const options = {
	type: 'question',
	buttons: ['Cancel', 'Yes, please', 'No, thanks'],
	defaultId: 2,
	title: 'Question',
	message: 'Do you want to do delete this?',
	detail: 'this company will permanent deleted'
};


// Add new company
function newCompany() {
	let companyName = document.querySelector('#add-company-name').value;
	if (companyName != '' || companyName == null) {
		firebase.firestore().collection('companies').add({
			name: companyName
		}).then(function (docRef) {
			// Create sub collection for people in company
			// console.log("Document written with ID: ", docRef.id);
			firebase.firestore().collection('companies').doc(docRef.id).collection('people').add({
				status: 'create'
			})
		}).catch(function (error) {
			console.error("Error adding document: ", error);
		});
	}

}

// Render all companies realtime  
function renderCompanies() {
	firebase.firestore().collection('companies').orderBy('name').onSnapshot((snapshot) => {
		renderCompanies(snapshot.docs)
	})

	const companiesList = document.querySelector('.card-company')

	const renderCompanies = (data) => {

		let html = '';
		data.forEach(doc => {
			const detail = doc.data();
			const li = `
<div class="cards column is-one-fifth " id="${doc.id}" >
	<div class="cards-item">
		<header class="card-header">
    		<p class="card-header-title is-centered" id="${doc.id}" onclick="people(this.id)">
        	${detail.name}
			</p>
			
        	<span class="icon has-text-danger" onclick="deleteCard()">
        	<i class="fas fa-lg fa-ban"></i>
        	</span>
        </header>
    </div>
</div>`;

			html += li

		});
		companiesList.innerHTML = html;

	}
}

// Go to people page see all people in company
// Set company selected id to firestore
function people(click_id) {
	firebase.firestore().collection('selected_company').doc('9z9ibXKG7U02MEcDBfwO').update({
		"selected_card": click_id
	})
	remote.getCurrentWindow().loadURL(`file://${__dirname}/people.html`)
}




