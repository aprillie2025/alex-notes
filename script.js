const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('is-open', !open);
  });
}

const filterButtons = document.querySelectorAll('.filter-button');
const projects = document.querySelectorAll('.project-row');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
  projects.forEach(project => { project.hidden = filter !== 'all' && project.dataset.category !== filter; });
}));

const form = document.querySelector('#contact-form');
if (form) form.addEventListener('submit', event => { event.preventDefault(); form.querySelector('.form-status').textContent = 'Thanks — your note is ready to send. I’ll get back to you soon.'; form.reset(); });
