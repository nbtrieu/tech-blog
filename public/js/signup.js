console.log('anything');

const signupFormHandler = async (event) => {
  console.log('STARTING signup.js');
  event.preventDefault();
  
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    const response = await fetch('api/user/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('signup ok');
      document.location.replace('/dashboard');
    } else {
      window.alert('Failed to sign up');
    }
  };
};

document.addEventListener('submit', signupFormHandler);