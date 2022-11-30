let tab = document.querySelector('.tab-form');
let tabHeader = tab.querySelector('.tab-header');
let tabHeaderElements = tab.querySelectorAll('.tab-header > div');
let tabBody = tab.querySelector('.tab-body');
let tabBodyElements = tab.querySelectorAll('.tab-body > div');

for (let i = 0; i < tabHeaderElements.length; i++) {
  tabHeaderElements[i].addEventListener('click', function () {
    tabHeader.querySelector('.active').classList.remove('active');
    tabHeaderElements[i].classList.add('active');
    tabBody.querySelector('.active').classList.remove('active');
    tabBodyElements[i].classList.add('active');
  });
}

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the homepage
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
