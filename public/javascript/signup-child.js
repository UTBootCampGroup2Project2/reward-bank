async function signupFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && username && password) {
    fetch(`/api/users/exist/${username}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then(dbUserData => {

        if (dbUserData.usernameIsAvailable) {
          fetch('/api/users/child', {
            method: 'post',
            body: JSON.stringify({
              name,
              username,
              password
            }),
            headers: { 'Content-Type': 'application/json' }
          })
            .then(response => {
              // check the response status
              if (response.ok) {
                document.location.replace('/dashboard');
              } else {
                alert(response.statusText);
              }
            })
        }
        else {
          alert("Username already exists!");
        }
      })
  }
}



document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);