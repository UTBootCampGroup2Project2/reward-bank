async function discardFormHandler(event) {
  event.preventDefault();

  document.querySelector('.add-new-post-section').style.display = "unset";
  document.querySelector('.new-post-section').style.display = "none";
  document.querySelector('input[name="post-title"]').value = "";
  document.querySelector('textarea[name="post-content"]').value = "";
}

document.querySelector('.discard-post-btn').addEventListener('click', discardFormHandler);