// Calls the api that destroys the user session and logs the user out
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

// Listens to the logout button
document.querySelector('#logout-btn').addEventListener('click', logout);
