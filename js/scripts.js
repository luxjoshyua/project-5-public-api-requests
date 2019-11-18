// GLOBAL CONSTS
const urlRequest = 'https://randomuser.me/api/?results=12&nat=us&inc=name,email,id,picture,nat,location,dob,phone';
// const body = document.getElementsByTagName("body");
const gallery = document.getElementById("gallery");
// select the cards
const cards = document.querySelectorAll('.card');


/**
 * @param {data} create the 12 user cards on load,
 * populate it with the data fetched
 */
const createUserCard = (data) => {
  // loop through each user and populate the card with the fetched data
  // second parameter i = index, index is where you are at currently in the loop
  data.forEach((user, i) => {
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
    // call create modal function on specific card click
    cardContainerDiv.addEventListener('click', (e) => {
      // call the modal you want and populate with user
      // get the index position of this clicked user, assign to my global index
      clickedModal(user, i);
    })
  })
}

/**
 * setup the searchbar in the DOM, the actual functionality is handled in
 * the createSearchAction function below
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
  })
}

/**
 * Sets up the modal in the DOM, doesn't contain any parameters as I populate it with the user data
 * in the clickedModal function below
 */
const createModalCard = (data) => {
  // Setup modal in the DOM
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");
  modalContainer.style.display = 'none';
  document.body.appendChild(modalContainer);
  // Set the modal HTML
  modalContainer.innerHTML =
    `
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn">
          <strong>X</strong>
        </button>
        <div class="modal-info-container">
            <img class="modal-img" src="" alt="profile picture">
            <h3 id="name" class="modal-name cap">

            </h3>
            <p class="modal-text modal-email"></p>
            <p class="modal-text modal-cap"></p>
            <hr>
            <p class="modal-text modal-number"></p>
            <p class="modal-text modal-address"></p>
            <p class="modal-text modal-birthday">Birthday: </p>

            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `
  // close the modal window
  const closeModal = document.getElementById('modal-close-btn');
  closeModal.addEventListener('click', (e) => {
    // remember: addEventListener can only be invoked on a single node at a time
    modalContainer.style.display = 'none';
  })
  // setup event listeners for left and right arrows
  const left = document.getElementById("modal-prev");
  const right = document.getElementById("modal-next");
  left.addEventListener("click", (e) => {
    // -1 means go back one modal
    cycleModal(data, -1);
  })
  right.addEventListener("click", (e) => {
    // +1 means go forward one modal
    cycleModal(data, 1);
  })
}

/**
 * @param {user} is the user card that has been clicked,
 * populate it with the data already fetched
 */
const clickedModal = (user, i) => {
  // current position in the loop
  index = i;
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.style.display = 'block';
  const modal = document.querySelector('.modal');
  modal.querySelector('.modal-img').src = user.picture.large;
  modal.querySelector('.modal-name').innerHTML = user.name.first + ' ' + user.name.last;
  modal.querySelector('.modal-email').innerHTML = user.email;
  modal.querySelector('.modal-cap').innerHTML = user.location.city;
  modal.querySelector('.modal-number').innerHTML = user.phone;
  modal.querySelector('.modal-address').innerHTML = user.location.street.number + ' ' + user.location.street.name + ' ' + user.location.state + ' ' + user.location.postcode;
  modal.querySelector('.modal-birthday').innerHTML = "Birthday: " + user.dob.date.slice(0, 10);
}

// when the modal window is open, I need to toggle back and forth bewtween the employees fetched
// there should be no errors once the end or beginning of the list is reached
// direction parameter = left or right
const cycleModal = (data, direction) => {
  // the index is the current position of the card
  // go forward one modal window
  if (direction === 1) {
    // newIndex = the index position + 1
    const newIndex = index + 1;
    // check the modal index isn't at 12 or above, because it will break!
    if (newIndex < 12) {
      clickedModal(data[newIndex], newIndex);
      // console.log(newIndex);
    }
    // go back one modal window
  } else if (direction === -1) {
    // show data back
    const newIndex = index - 1;
    // check the modal index isn't below 0, because it will break!
    if (newIndex >= 0) {
      clickedModal(data[newIndex], newIndex);
    }
  }
}

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
let index = null;
createSearchBar();
fetchRequest(urlRequest)
  .then((data) => {
    createUserCard(data);
    createModalCard(data);
    // call function that sets up change listener on input
    const input = document.getElementById('search-input');
    input.addEventListener('keyup', (e) => {
      // console.log("the " + e + " is doing this");
      createSearchAction(e, data);
    })
    // the search event is fired when a search is initiated using an <input> element of type="search"
    input.addEventListener('search', (e) => {
      createSearchAction(e, data);
    });
  })

  .catch(error => {
    const errorPage = document.querySelector('.error');
    errorPage.style.display = 'flex';
    console.log('Our apologies but there is a' + error + 'with our API, it will be back up and running shortly!')
  });
