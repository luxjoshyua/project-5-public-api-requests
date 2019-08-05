






// gallery functionality

function gallery() {

  const galleryContainer = document.createElement('div'); 


}




// search bar functionality
function searchBar() {
  // create div to keep the HTML in
  const searchHTML = document.createElement('div');
  searchHTML.innerHTML =
    `
      <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
      </form>
    `
  document.querySelector('.search-container').appendChild(searchHTML);
}



// CALL MY FUNCTIONS
searchBar();