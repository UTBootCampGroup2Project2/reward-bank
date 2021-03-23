async function taskCompleteHandler(event) {
  event.preventDefault();

  const task_id = event.toElement.getAttribute('task_id');

    fetch(`/api/task-history`, {
      method: 'POST',
      body: JSON.stringify({
        task_id: task_id
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response =>{
      if (response.ok) {
        // document.location.replace('/dashboard');
        // document.getElementById(`task_history_entry_${task_history_id}`).style.display = "none";
      }
    })
    .catch(err => {
      console.log(err);
    });
}

document.querySelectorAll('.complete-task-btn').forEach(btn => btn.addEventListener('click', taskCompleteHandler));