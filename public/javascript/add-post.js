async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('textarea[name="post-content"]').value;

  if(title){
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_content
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
  else{
    alert('Please enter a title!');
  }
}

async function createFormHandler(event) {
  event.preventDefault();

  document.querySelector('.add-new-post-section').style.display = "none";
  document.querySelector('.new-post-section').style.display = "unset";
}
document.querySelector('.create-post-btn').addEventListener('click', createFormHandler);
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);