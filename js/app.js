const loginView = document.getElementById('login-view');
const appView = document.getElementById('app-view');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const pageHeading = document.getElementById('page-heading');

const pageTitles = {
  dashboard: 'Dashboard',
  profile: 'My Profile',
  attendance: 'Attendance',
  results: 'Examination Results',
  timetable: 'Timetable',
  announcements: 'Announcements'
};

// Demo-only credentials. Replace with secure server-side authentication for production.
const DEMO_USERNAME = 'student';
const DEMO_PASSWORD = '1234';

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('student-id').value.trim();
  const password = document.getElementById('password').value;

  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    loginError.textContent = '';
    loginView.hidden = true;
    appView.hidden = false;
    document.getElementById('header-student-name').textContent = 'Student';
    showPage('dashboard');
  } else {
    loginError.textContent = 'Incorrect Student ID or password. Please try again.';
  }
});

function showPage(pageName) {
  if (!pageTitles[pageName]) return;

  document.querySelectorAll('.page-section').forEach((section) => {
    section.hidden = section.id !== `page-${pageName}`;
  });

  document.querySelectorAll('.nav-link[data-page]').forEach((button) => {
    button.classList.toggle('active', button.dataset.page === pageName);
  });

  pageHeading.textContent = pageTitles[pageName];
}

document.getElementById('main-nav').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-page]');
  if (button) showPage(button.dataset.page);
});

document.querySelectorAll('[data-go]').forEach((button) => {
  button.addEventListener('click', () => showPage(button.dataset.go));
});

document.getElementById('logout-button').addEventListener('click', () => {
  appView.hidden = true;
  loginView.hidden = false;
  loginForm.reset();
  loginError.textContent = '';
});
