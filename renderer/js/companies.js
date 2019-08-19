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
function deleteCard(id) {
	// Get id of company to delete in firestore
	// let id = document.querySelector('.cards').getAttribute('id')
	console.log(id)

	// Confirm before delete
	dialog.showMessageBox(null, options, (response) => {
		if (response === 1) {
			dbCom.doc(id).delete().then(function () {
				console.log("Document successfully deleted!");
			}).catch(function (error) {
				console.error("Error removing document: ", error);
			});
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

	if (companyName !== '') {
		dbCom.add({
			name: companyName
		}).then(function (docRef) {
			// Create sub collection for people in company
			console.log("Document written with ID: ", docRef.id);
			dbCom.doc(docRef.id).collection('people').add({
				status: 'create'
			})

		}).catch(function (error) {
			console.error("Error adding document: ", error);
		});
	}
	document.querySelector('#add-company-name').value = ''

}

// Render all companies realtime  
function renderCompanies() {
	dbCom.orderBy('name').onSnapshot((snapshot) => {
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
			<span class="icon has-text-danger" id="${doc.id}" onclick="deleteCard(this.id)">
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

	dbSelectedCom.doc(selected_company_id).update({
		"selected_card": click_id
	}).then(function () {
		remote.getCurrentWindow().loadURL(`file://${__dirname}/people.html`)
	})

}




