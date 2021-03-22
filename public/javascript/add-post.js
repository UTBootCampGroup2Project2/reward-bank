async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#header-name').value;

  if (username && id) {
    const response = await fetch('/api/users/', {
      method: 'GET',
      body: JSON.stringify({
        username,
        id,
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard/')
    } else {
      console.log(response);
      alert(response.statusText);
    }
  }
}

//async function createFormHandler(event) {
//  event.preventDefault();

//  document.querySelector('.approve-list').style.display = "";
 // document.querySelector('.new-post-section').style.display = "unset";
// /}
// document.querySelector('.create-post-btn').addEventListener('click', createFormHandler);
// document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);