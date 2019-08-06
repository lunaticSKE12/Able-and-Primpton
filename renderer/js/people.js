// Delay to load all companies
let start
var check = function () {
	if (start) {
		// run when condition is met
		renderPeople()
		start = false;
		console.log('time')
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
	var company_id
	// Get selected company id 
	firebase.firestore().collection('selected_company').get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			company_id = doc.data().selected_card
			firebase.firestore().collection('companies').doc(company_id).onSnapshot((snapshot) => {
				let text = document.getElementById('companyTxt')
				console.log(snapshot.data().name)
				text.innerHTML = snapshot.data().name
			})

			// Render people from selected company
			firebase.firestore().collection('companies').doc(company_id).collection('people').orderBy('name_en').onSnapshot((snapshot) => {
				renderPeople(snapshot.docs)
			})
		});
	});


	const peopleList = document.querySelector('.card-people')

	const renderPeople = (data) => {

		let html = '';
		data.forEach(doc => {

			const detail = doc.data();
			const li = `
<div class="cards column is-3" id="${doc.id}" onclick="selectPerson(this.id)">
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
</div>`;

			html += li


		});
		peopleList.innerHTML = html;


	}

}

function selectPerson(id) {

	firebase.firestore().collection('selected_company').doc('9z9ibXKG7U02MEcDBfwO').update({
		"selected_person": id
	}).then(function () {
		remote.getCurrentWindow().loadURL(`file://${__dirname}/personDetails.html`)
	})
}


function newPerson() {
	remote.getCurrentWindow().loadURL(`file://${__dirname}/editPerson.html`)
}


