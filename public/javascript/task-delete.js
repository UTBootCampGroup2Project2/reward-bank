async function deleteTaskHandler(event) {
  event.preventDefault();

  // console.log(event.toElement.parentNode);
  
  const task_id = event.toElement.getAttribute('task_id');
  event.toElement.parentNode.remove();
  fetch(`/api/tasks/${task_id}`, {
    method: 'DELETE'
  })
  .then(response =>{
    if (response.ok) {
      event.toElement.parentNode.remove();
    }
  })
  .catch(err => {
    console.log(err);
  });
}

document.querySelectorAll('.delete-task-btn').forEach(btn => btn.addEventListener('click', deleteTaskHandler));