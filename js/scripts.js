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

const createUserCard = (data) => {

  data.forEach(user => {
    // Setup card in the DOM
    const cardContainerDiv = document.createElement("div");
    cardContainerDiv.classList.add("card");
    
    gallery.appendChild(cardContainerDiv);
    // Set the card HMTL
    cardContainerDiv.innerHTML =
      `
      <div class="card-img-container">
          <img class="card-img" src="${user.picture.large}" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${user.name.first}${user.name.last}</h3>
          <p class="card-text">${user.email}</p>
          <p class="card-text cap">${user.location.city}</p>
      </div>
    
    `
    // Setup modal in the DOM
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
    document.body.appendChild(modalContainer);
    // Set the modal HTML
    modalContainer.innerHTML =
      `
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${user.picture.medium}" alt="profile picture">
            <h3 id="name" class="modal-name cap">
            ${user.name.first}
            ${user.name.last}
            </h3>
            <p class="modal-text">
            ${user.email}
            </p>
            <p class="modal-text cap">
             ${user.location.city}
            </p>
            <hr>
            <p class="modal-text">${user.cell}</p>
            <p class="modal-text">
            ${user.street.number}
            ${user.street.name}
            ${user.city}
            ${user.postcode}
            </p>
            <p class="modal-text">Birthday: ${user.dob.date}</p>
        </div>
    `
  })
}


const modalEvents = (data) => {
  const card = document.querySelectorAll(".card");
  const modal = document.querySelectorAll(".modal");
  // Setup event listener on the card
  card.addEventListener('click', (e) => {
    const event1 = event.target;
    console.log(event1);
    if (event1 === true) {
      modal.style.display = 'block';
      card.style.display = 'none';
    } else {
      modal.style.display = 'none';
      card.style.display = 'flex';
    }
  })
  // Setup event listener on the modal
  modal.addEventListener('click', (e) => {
    const event2 = event.target;
    const close = modal.getElementById("modal-close-btn");

    if (event2 === close || close.innerHTML === 'X') {
      modal.style.display = 'none';
      card.style.display = 'flex';
    } else {
      modal.style.display = 'block';
      card.style.display = 'none';
    }
  })
}




fetchRequest(urlRequest)
  .then(createUserCard)
  .then(modalEvents)
  .catch(error => {
    const errorPage = document.querySelector('.error');
    errorPage.style.display = 'flex';
    console.log('Our apologies but there is a' + error + 'with our API, it will be back up and running shortly!')
  });



/**
   * === JUNK CODE ====
   * 
   * 
// Setup gallery of 12 profiles you see on initial screen load
// function createUserCard(data) {

//   const card = data.map(card => `
//     <div class="card">
//     <div class="card-img-container">
//         <img class="card-img" src="${card.picture.thumbnail}" alt="profile picture">
//     </div>
//     <div class="card-info-container">
//         <h3 id="name" class="card-name cap" value="${data.results}>${card.name.first}${card.name.last}</h3>
//         <p class="card-text">${card.email}</p>
//         <p class="card-text cap">${card.location}</p>
//     </div>
//   </div>
//   `)
// }
   * 
   * 
   * 
   * 
   */