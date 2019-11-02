// GLOBAL CONSTS
const urlRequest = 'https://randomuser.me/api/?results=12&nat=us&inc=name,email,id,picture,nat,location,dob,phone';
const body = document.getElementsByTagName("body"); 
const gallery = document.getElementById("gallery");


// Handle fetch request to get the list of employees

async function fetchRequest(url) {
	try {
		const request = await fetch(url);
		const response = await request.json();
		return Promise.all(response.results);
	} catch (error) {
		gallery.innerHTML = `An error occured fetching the data, ${error}`;
	}
}

const userCardRequest = (data) => {
  data.forEach(user => {
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("card");
    gallery.appendChild(containerDiv);

    containerDiv.innerHTML = 
    `
      <div class="card">
      <div class="card-img-container">
          <img class="card-img" src="${user.picture.thumbnail}" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap"${user.name.first}${user.name.last}</h3>
          <p class="card-text">${user.email}</p>
          <p class="card-text cap">${user.location.city}</p>
      </div>
    </div>
    `

  })
}



// Setup gallery of 12 profiles you see on initial screen load
function createUserCard(data) {

  const card = data.map(card => `
    <div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${card.picture.thumbnail}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap" value="${data.results}>${card.name.first}${card.name.last}</h3>
        <p class="card-text">${card.email}</p>
        <p class="card-text cap">${card.location}</p>
    </div>
  </div>
  `)
}


const modalEvents = (data) => {

  // handle all modal click events here


}




fetchRequest(urlRequest)
  .then(createUserCard)
  // .then(modalEvents)
  .catch(error => {
    const errorPage = document.querySelector('.error');
    errorPage.style.display = 'flex';
    console.log('Our apologies but there is a' + error + 'with our API, it will be back up and running shortly!')
  }); 