

// Delay to load all companies
let start
var check = function () {
  if (start) {
    // run when condition is met
    renderBoard()
    start = false;
  }
  else {
    setTimeout(check, 500); // check again in a second
    start = true;
  }
}
check();

let html = '';

function renderBoard() {

  dbCom.orderBy('name').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data().name);
      let companyName = doc.data().name

      // Render all people in company
      dbCom.doc(doc.id).collection('people')
        .orderBy('name_en').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(companyName, " => ", doc.data().name_en);
            renderCompanies(companyName, doc)
            notiBoard.innerHTML = html;
          });
        });

    })
  });

  const notiBoard = document.querySelector('.notiBoard')
  const renderCompanies = (companyName, doc) => {


    const detail = doc.data();
    const li = `
      <aside class="menu column is-4">
        <ul class="menu-list">
          <li>
            <a class="is-active">${companyName}</a>
            <ul>
              <li><a>${detail.name_en}</a></li>
            </ul>
          </li>
        </ul>
      </aside>
      <div class="is-divider" id="line1"></div>
      `;

    html += li

  }

}

