// GLOBAL CONSTS
const urlRequest = 'https://randomuser.me/api/?results=12&nat=us&inc=name,email,id,picture,nat,location,dob,phone';
// const body = document.getElementsByTagName("body");
const gallery = document.getElementById("gallery");
// select the cards
const cards = document.querySelectorAll('.card');


// create the 12 user cards on initial load
const createUserCard = (data) => {
  // loop through each user and populate the card with the fetched data
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
          <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="card-text">${user.email}</p>
          <p class="card-text cap">${user.location.city}</p>
      </div>
    `
    user.cardElement = cardContainerDiv;
    user.visible = true;
  })
}

// user is the object {}

/**
 * create the searchbar functionality 
 * What it needs to do:
 *  Search for people already on the page, so you're not adding a new API request, just using the one already made
 */

const createSearchBar = () => {
  // add the search to the DOM
  const searchContainer = document.querySelector('.search-container');
  // set the search innerHTML
  searchContainer.innerHTML =
    `
    <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `
}





/**
 * 
 * @param {e} capture the user event 
 * @param {data} pass the data to test, better than looking at the DOM names, more reliable
 */
const createSearchAction = (e, data) => {
  // need to convert both to lower case or upper case because otherwise they'll never match
  const query = e.target.value.toLowerCase();
  // loop through each user, test if the characters entered match the fetched data
  data.forEach(user => {
    // for each card, test if the data matches the const query
    // if it does, add a class of visible and set user visible to true
    // have to convert the data to lower case, otherwise will return nothing!
    if (user.name.first.toLowerCase().includes(query) || user.name.last.toLowerCase().includes(query)) {
      user.cardElement.style.display = 'flex';
      user.visible = true;
    } else {
      // if it doesn't, add a class of hidden and set user visible to false
      user.visible = false;
      user.cardElement.style.display = 'none';
    }
    return;
  })
}



const createModalCard = (e, data) => {
  const click = e.target; 
  // loop through each user
  data.forEach(user => {

    // Setup modal in the DOM
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
    document.body.appendChild(modalContainer);
    console.log(user.name.first); 
    // Set the modal HTML
    modalContainer.innerHTML =
      `
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn">
          <strong>X</strong>
        </button>
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


// const modalEvents = (data) => {

//   // Setup event listener for card
//   // desired behaviour: when clicked, the modal for that card opens, the modal is then closed by hitting the X

//   cards.forEach(function (card) {
//     // console.log(card);
//     // addEventListener can only be invoked on a single node at a time
//     card.addEventListener('click', (e) => {
//       const clickedCard = e.target;
//       // console.log(clickedCard);
//       if (clickedCard) {
//         //  modal.style.display = 'block';
//         // console.log('card has been clicked, now show the modal!');
//         clickedCard.style.backgroundColor = 'red';
//       } else {

//         //  modal.style.display = 'none';
//         // clickedCard.style.display = 'flex';
//       }
//     })
//   })
//   // Setup event listener on the modal
//   // modal.addEventListener('click', (e) => {
//   //   const event2 = event.target;
//   //   const close = modal.getElementById("modal-close-btn");

//   //   if (event2 === close || close.innerHTML === 'X') {
//   //     modal.style.display = 'none';
//   //     card.style.display = 'flex';
//   //   } else {
//   //     modal.style.display = 'block';
//   //     card.style.display = 'none';
//   //   }
//   // })
// }



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

// Call my functions
createSearchBar();
fetchRequest(urlRequest)
  .then((data) => {
    createUserCard(data);
    // console.log(data);
    // modalEvents(data);

    // call function that sets up change listener on input
    const input = document.getElementById('search-input');
    input.addEventListener('keydown', (e) => {
      createSearchAction(e, data);
    })

    // call create modal function
    // createModalCard(data);
  })

  .catch(error => {
    const errorPage = document.querySelector('.error');
    errorPage.style.display = 'flex';
    console.log('Our apologies but there is a' + error + 'with our API, it will be back up and running shortly!')
  });




/**
   * === JUNK CODE ====
   * 
   * 

   */