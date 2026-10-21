const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  });
  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      menuButton.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      menuButton.focus();
    }
  });
}
const filters = document.querySelectorAll('.filter-button');
const projects = document.querySelectorAll('.project-row');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  let count = 0;
  projects.forEach(project => {
    project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
    if (!project.hidden) count++;
  });
  document.querySelector('#filter-status').textContent = `${count} entries shown.`;
}));
const form = document.querySelector('#task-form');
if (form) {
  const input = document.querySelector('#task');
  const list = document.querySelector('#tasks');
  const status = document.querySelector('#task-status');
  const download = document.querySelector('#download-tasks');
  function update() {
    const total = list.children.length;
    const completed = list.querySelectorAll('input:checked').length;
    status.textContent = `${completed} of ${total} tasks complete.`;
    download.disabled = total === 0;
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) { input.setCustomValidity('Enter a task, not just spaces.'); input.reportValidity(); return; }
    const row = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const span = document.createElement('span');
    span.textContent = text;
    label.append(checkbox, span);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'Remove';
    remove.setAttribute('aria-label', `Remove task: ${text}`);
    remove.addEventListener('click', () => { row.remove(); update(); input.focus(); });
    checkbox.addEventListener('change', update);
    row.append(label, remove);
    list.append(row);
    form.reset(); update(); input.focus();
  });
  input.addEventListener('input', () => input.setCustomValidity(''));
  download.addEventListener('click', () => {
    const lines = Array.from(list.children, row => `${row.querySelector('input').checked ? '[x]' : '[ ]'} ${row.querySelector('span').textContent}`);
    const url = URL.createObjectURL(new Blob([lines.join('\n')], {type:'text/plain;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url; link.download = 'study-checklist.txt';
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
}
