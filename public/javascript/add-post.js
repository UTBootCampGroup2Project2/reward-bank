async function newFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('input').value;

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  

  const response = await fetch(`/api/users/${id}`, {
    method: 'GET',
    body: JSON.stringify({
      username,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

async function createFormHandler(event) {
  event.preventDefault();

  document.querySelector('.approve-list').style.display = "";
 // document.querySelector('.new-post-section').style.display = "unset";
}
// document.querySelector('.create-post-btn').addEventListener('click', createFormHandler);
// document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);