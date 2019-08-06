// searchbar
function searchBar() {
  // create the containing div
  const searchHTML = document.createElement('div');
  // set the div HTML using provided markup 
  searchHTML.innerHTML =
    `
      <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
      </form>
    `
  // append the div to the containing parent
  document.querySelector('.search-container').appendChild(searchHTML);
}

// gallery
function createGallery() {
  // run a for loop, need card in the DOM 12 times
  for (let i = 0; i <= 11; i++) {
    // check loop is running 12 times
    // console.log('working here' + i + 'times'); 
    // create the containing div
    const galleryHTML = document.createElement('div');
    // set the div HTML using provided markup 
    galleryHTML.innerHTML =
      `
      <div class="card">
      <div class="card-img-container">
          <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">first last</h3>
          <p class="card-text">email</p>
          <p class="card-text cap">city, state</p>
      </div>
    </div>
    `
    // append the div to the containing parent
    document.getElementById('gallery').appendChild(galleryHTML);
  }
}

// modal
function modal() {
  // create the containing div
  const modalHTML = document.createElement('div');
  // set the div HTML using provided markup 
  modalHTML.innerHTML =
    `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                <h3 id="name" class="modal-name cap">name</h3>
                <p class="modal-text">email</p>
                <p class="modal-text cap">city</p>
                <hr>
                <p class="modal-text">(555) 555-5555</p>
                <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
        </div>
        // IMPORTANT: Below is only for exceeds tasks 
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `
  // append the div to the body
  document.body.appendChild(modalHTML); 
}







/**  API STEPS

// 1. send a single request to the API

// 2. Use the response data to display 12 users, along with basic info



API
 * Basic data I need from the API
 
    With information provided from The Random User Generator API, 
    send a single request to the API, and use the response data to display 12 users, 
    along with some basic information for each:
    *  Image
    *  First and Last Name
    *  Email
    *  City or location
  

  When any part of an employee item in the directory is clicked, 
  a modal window should pop up with the following details displayed:
    *  Image
    *  Name
    *  Email
    *  City or location
    *  Cell Number
    *  Detailed Address, including street name and number, state or country, and post code.
    *  Birthday

 */


$.ajax({
  // customise the data returned using query? parameters
  url: 'https://randomuser.me/api/?inc=name,email,id,picture,nat,location,dob,cell?nat=au,ca,gb,us,nz',
  dataType: 'json',
  success: function(data) {
    console.log(data);
  }
});



// CALL MY FUNCTIONS
searchBar();
createGallery();
modal(); 