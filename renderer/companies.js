
// Delay to load all companies
let start
var check = function () {
	if (start) {
		// run when condition is met
		render()
		start = false;
		console.log('time')
	}
	else {
		setTimeout(check, 1000); // check again in a second
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
		})
		document.querySelector('#add-company-name').value = "";
	}
}

// Render all companies realtime  
function render() {
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
        <header class="card-header" >
          <p class="card-header-title is-centered" onclick="people()">
            ${detail.name}
          </p>
          <span class="icon has-text-danger" onclick="deleteCard()">
            <i class="fas fa-lg fa-ban"></i>
          </span>
        </header>
      </div>
    </div>
      `;

			html += li

		});
		companiesList.innerHTML = html;

	}
}

// Go to people page see all people in company
function people() {
	myId = $(".cards").attr("id")
	remote.getCurrentWindow().loadURL(`file://${__dirname}/people.html`)
}


