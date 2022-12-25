const logout = async () => {
  console.log('starting logout.js')
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log('logged out successfully');
    document.location.replace('/');
  } else {
    console.log('failed to log out');
    alert('Failed to log out.');
  }
};

// *BUG: Whenever i put .queryselector it would crash i think because the HTML from handlebars has not finished being rendered??
document.querySelector('#logout-link').addEventListener('click', logout);
