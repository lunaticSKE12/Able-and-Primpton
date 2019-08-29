/**
 *   @author Napong Dungduangsasitorn
 * */
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
// ******************

// Delete company
function deleteCardCompany(id) {
	// Get id of company to delete in firestore

	// Confirm before delete
	dialog.showMessageBox(null, confirmDeleteCompany, (response) => {
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
const confirmDeleteCompany = {
	type: 'question',
	buttons: ['Cancel', 'Yes, please', 'No, thanks'],
	defaultId: 2,
	title: 'Question',
	message: 'Do you want to do delete this?',
	detail: 'this company will permanent deleted'
};


// Add new company
function newCompany() {
	// Get company name from input
	let companyName = document.querySelector('#add-company-name').value;

	// If company name not empty can create new company
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

	// Clear input value
	document.querySelector('#add-company-name').value = ''

}

// Render all companies realtime  
function renderCompanies() {
	dbCom.orderBy('name').onSnapshot((snapshot) => {
		renderCompanies(snapshot.docs)
	})

	// Get where HTML div tag to render
	const companiesList = document.querySelector('.card-company')

	// Render
	const renderCompanies = (data) => {

		data.forEach(doc => {
			const detail = doc.data();
			const li = `
<div class="cards column is-one-fifth " id="${doc.id}" >
	<div class="cards-item">
		<header class="card-header">
    	<p class="card-header-title is-centered" id="${doc.id}" onclick="people(this.id)">
       	${detail.name}
			</p>
			<span class="icon has-text-danger" id="${doc.id}" onclick="deleteCardCompany(this.id)">
       	<i class="fas fa-lg fa-ban"></i>
      </span>
		</header>
  </div>
</div>`;

			// Temp all render items
			html += li

		});

		// Push all render items to replace
		companiesList.innerHTML = html;

	}
}

// Go to people page see all people in company
// Set company selected id to firestore
function people(click_id) {
	// Get current user login
	var user = firebase.auth().currentUser;

	// update selected for each user and go to company's people page
	db.collection('users').doc(user.uid).update({
		selected_company_id: click_id
	}).then(function () {
		remote.getCurrentWindow().loadURL(`file://${__dirname}/people.html`)
	})

}

// Check who will expire soon
function checkNotification() {
	window.open(`file://${__dirname}/notification.html`, 'Notification Board', 'nodeIntegration=yes')
}


