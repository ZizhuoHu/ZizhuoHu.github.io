const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const dropTrigger = document.querySelector('.drop-trigger');
const dropdown = document.querySelector('.dropdown');

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

if (dropTrigger && dropdown) {
  dropTrigger.addEventListener('click', (event) => {
    event.preventDefault();
    dropdown.classList.toggle('open');
  });
}

document.addEventListener('click', (event) => {
  if (dropdown && !dropdown.contains(event.target)) dropdown.classList.remove('open');
});
