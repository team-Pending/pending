const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    console.log(email, password);
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#newUsername').value.trim();
  const email = document.querySelector('#newEmail').value.trim();
  const password = document.querySelector('#newPassword').value.trim();

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

document.querySelector('.column-1').addEventListener('submit', loginFormHandler);

document.querySelector('.column-2').addEventListener('submit', signupFormHandler);
