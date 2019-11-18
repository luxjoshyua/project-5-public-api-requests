/**
 *
 * darkmode function following this https://www.youtube.com/watch?v=wodWDIdV9BY tutorial
 */

//  check if user has local dark mode settings
// update dark mode every time someone clicks on it
let darkMode = localStorage.getItem('darkmode');
const darkModeToggle = document.querySelector("#dark-mode-toggle");

// check if dark mode is enabled,
// it it's enabled, turn it off,
// if it's disabled, turn it on
const enableDarkMode = () => {
  // 1. add the class darkmode to the body
  document.body.classList.add("darkmode");
  // 2. update darkMode in the localStorage so it remembers
  localStorage.setItem("darkMode", "enabled");

  document.querySelector('.header-text-container h1').style.color = "#FFF";
  const card = document.querySelectorAll('.card-name');
  for (let i = 0; i < card.length; i+=1) {
    card[i].style.color = "#000";
  }
}

const disableDarkMode = () => {
  // 1. remove the class darkmode to the body
  document.body.classList.remove('darkmode');
  // 2. update darkMode in the localStorage so it remembers
  localStorage.setItem('darkMode', null);
}

if (darkMode === "enabled") {
  enableDarkMode();
}

// When someone clicks the button
darkModeToggle.addEventListener('click', () => {
  // get their darkMode setting
  darkMode = localStorage.getItem('darkMode');
  // if it not current enabled, enable it
  if (darkMode !== 'enabled') {
    enableDarkMode();
    // if it has been enabled, turn it off
  } else {
    disableDarkMode();
  }
});
