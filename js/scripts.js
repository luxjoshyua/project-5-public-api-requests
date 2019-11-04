// GLOBAL CONSTS
const urlRequest = 'https://randomuser.me/api/?results=12&nat=us&inc=name,email,id,picture,nat,location,dob,phone';
const body = document.getElementsByTagName("body");
const gallery = document.getElementById("gallery");
// populate this late with the user data
let results = [];


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
    // push the results to my empty results array so I can access the data globally
    results.push(user);
    // console.log(user);
    
  })
}


/**
 * create the searchbar functionality 
 * What it needs to do:
 *  Search for people already on the page, so you're not adding a new API request, just using the one already made
 */

const createSearchBar = (data) => {

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
  // select the search input field
  const searchInput = document.querySelector('.search-input');
  const filter = searchInput.value.toUpperCase();
  const cards = document.querySelectorAll('.card');
  const names = document.getElementById('name');
  

  
  /**
   * 
   * I need my if else to test whether the text entered matches the content of my cards, specifically the first or last name
   * I have the data/content of my cards saved in the global variable results
   * 
   * I need to loop through my cards and test each one, then show / hide depending on the first or last name content
   */


  for (let i = 0; i < names.length; i++ ) {

    const txtValue = searchInput.textContent || searchInput.innerText; 
    
    // indexOf returns the first index at which a given element can be found in the array
    if (txtValue.toUpperCase().indexOf(filter) > -1 ) {
  
      console.log('Show the specific user card here!')
      cards[i].style.display = "";
  
    } else {
  
      searchInput.innerHTML = 'No matches, sorry!';
      cards[i].style.display = "none"; 
  
    }

  }

}


// const createModalCard = (data) => {

//   data.forEach(user => {

//     // Setup modal in the DOM
//     const modalContainer = document.createElement("div");
//     modalContainer.classList.add("modal-container");
//     document.body.appendChild(modalContainer);
//     // Set the modal HTML
//     modalContainer.innerHTML =
//       `
//       <div class="modal">
//         <button type="button" id="modal-close-btn" class="modal-close-btn">
//           <strong>X</strong>
//         </button>
//         <div class="modal-info-container">
//             <img class="modal-img" src="${user.picture.medium}" alt="profile picture">
//             <h3 id="name" class="modal-name cap">
//             ${user.name.first}
//             ${user.name.last}
//             </h3>
//             <p class="modal-text">
//             ${user.email}
//             </p>
//             <p class="modal-text cap">
//              ${user.location.city}
//             </p>
//             <hr>
//             <p class="modal-text">${user.cell}</p>
//             <p class="modal-text">
//             ${user.street.number}
//             ${user.street.name}
//             ${user.city}
//             ${user.postcode}
//             </p>
//             <p class="modal-text">Birthday: ${user.dob.date}</p>
//         </div>
//     `
//   })
// }


const modalEvents = (data) => {

// Setup event listener for card
// desired behaviour: when clicked, the modal for that card opens, the modal is then closed by hitting the X
const cards = document.querySelectorAll(".card");
// const modal = document.querySelectorAll(".modal");
// console.log(modal); 

cards.forEach(function (card) {
  // console.log(card);
  // addEventListener can only be invoked on a single node at a time
  card.addEventListener('click', (e) => {
    const clickedCard = e.target;
    // console.log(clickedCard);
    if (clickedCard) {
      //  modal.style.display = 'block';
      console.log('card has been clicked, now show the modal!'); 
    } else {
      console.log('card hasn\'t been clicked, carry on!'); 
      //  modal.style.display = 'none';
      // clickedCard.style.display = 'flex';
    }
  })
})






// Setup event listener on the modal
// modal.addEventListener('click', (e) => {
//   const event2 = event.target;
//   const close = modal.getElementById("modal-close-btn");

//   if (event2 === close || close.innerHTML === 'X') {
//     modal.style.display = 'none';
//     card.style.display = 'flex';
//   } else {
//     modal.style.display = 'block';
//     card.style.display = 'none';
//   }
// })
}




fetchRequest(urlRequest)
  .then(createUserCard)
  .then(createSearchBar)
  // .then(createModalCard)
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

   */