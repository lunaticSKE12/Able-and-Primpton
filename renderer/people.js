
// Delay to load all companies
let start
var check = function () {
	if (start) {
		// run when condition is met
		render()
		start = false;
		// console.log('time')
	}
	else {
		setTimeout(check, 1000); // check again in a second
		start = true;
	}
}
check();
// ************************



// Render all people in company realtime  
function render() {
	console.log("id1234 : " + myId);
	firebase.firestore().collection('companies').doc('O2UsfiIHVN8wMPuZFkNx').collection('people').onSnapshot((snapshot) => {
		renderPeople(snapshot.docs)
	})

	const peopleList = document.querySelector('.card-people')

	const renderPeople = (data) => {

		let html = '';
		data.forEach(doc => {
			const detail = doc.data();
			const li = `
			<div class="cards column is-3" id="${doc.id}">
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
      `;

			html += li

		});
		peopleList.innerHTML = html;


	}

}


