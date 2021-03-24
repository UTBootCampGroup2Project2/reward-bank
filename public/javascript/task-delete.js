async function deleteTaskHandler(event) {
  event.preventDefault();
  
  const task_id = parseInt(event.toElement.getAttribute('task_id'));
  
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