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
	// Get selected company id 
	dbSelectedCom.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			// Get id selected company
			company_id = doc.data().selected_card

			// Find match company id selected to show name
			dbCom.doc(company_id).onSnapshot((snapshot) => {
				let text = document.getElementById('companyTxt')
				console.log(snapshot.data().name)
				// Show company name in breadcrumb
				text.innerHTML = snapshot.data().name
			})

			// Render people from selected company
			dbCom.doc(company_id).collection('people').orderBy('name_en').onSnapshot((snapshot) => {
				renderPeople(snapshot.docs)
			})
		});
	});


	const peopleList = document.querySelector('.card-people')

	const renderPeople = (data) => {

		let html = '';
		data.forEach(doc => {

			const detail = doc.data();
			if (detail.img === '' || detail.img === null) {
				console.log("1 ")
				const li = `
<div class="cards column is-3">
	<div class="person" id="${doc.id}" onclick="selectPerson(this.id)">
	<div class="card-people-image">
		<figure class="image">
		<img src="../picture/account-tie.png" alt="Person image">
		</figure>
	</div>
	<div class="card-content">
		<div class="content">
			<p id="name_en">${detail.name_en}</p>
			<p id="name_th">${detail.name_th}</p>
		</div>
	</div>
	</div>

	<span class="icon has-text-danger is-pulled-right" id="deletePerson" onclick="deleteCard()">
		<i class="fas fa-lg fa-ban" ></i>
	</span>
</div>`;
				html += li
			} else if (detail.img !== '' || detail.img !== null) {
				console.log("2 ")
				const li = `
<div class="cards column is-3">
	<div class="person" id="${doc.id}" onclick="selectPerson(this.id)">
	<div class="card-people-image">
		<figure class="image">
		<img src="${detail.img}" alt="Person image">
		</figure>
	</div>
	<div class="card-content">
		<div class="content">
			<p id="name_en">${detail.name_en}</p>
			<p id="name_th">${detail.name_th}</p>
		</div>
	</div>
	</div>

	<span class="icon has-text-danger is-pulled-right" id="deletePerson" onclick="deleteCard()">
		<i class="fas fa-lg fa-ban" ></i>
	</span>
</div>`;
				html += li
			}




		});
		peopleList.innerHTML = html;
	}

}

// Delete person
function deleteCard() {
	// Get selected company id 
	dbSelectedCom.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			// Find match company id selected to show name
			company_id = doc.data().selected_card

			// Get id of company to delete in firestore
			let id = document.querySelector('.person').getAttribute('id')

			// Confirm before delete
			dialog.showMessageBox(null, options, (response) => {
				if (response === 1) {
					dbCom.doc(company_id).collection('people').doc(id).delete();
				}
			});
		});
	});

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
	dbSelectedCom.doc(selected_company_id).update({
		"selected_person": id
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