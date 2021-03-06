async function signupFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const role = document.querySelector('#signup-role').value.trim();

  if (name && username && password && role) {
    fetch(`/api/users/exist/${username}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then(dbUserData => {

        if (dbUserData.usernameIsAvailable) {
          return fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
              name,
              username,
              password,
              role
            }),
            headers: { 'Content-Type': 'application/json' }
          })
            .then(response => {
              // check the response status
              if (!response.ok) {
                alert(response.statusText);
              }
            })
            .then(() => {
              // login after signing up
              return fetch('/api/users/login', {
                method: 'post',
                body: JSON.stringify({
                  username,
                  password
                }),
                headers: { 'Content-Type': 'application/json' }
              });
            })
            .then(response => {
              if (response.ok) {
                document.location.replace('/dashboard/');
              } else {
                alert(response.statusText);
              }
            });
        }
        else {
          alert("Username already exists!");
        }
      })

  }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);