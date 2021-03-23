async function taskApprovalHandler(event) {
  event.preventDefault();

  const task_history_id = event.toElement.getAttribute('task_history_id');
  const status = 'completed';
  // console.log(task_history_id);

  if (task_history_id) {
    const response = await fetch(`/api/task-history/${task_history_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        status
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      // document.location.replace('/dashboard');
      const elementId = `task_history_entry_${task_history_id}`;
      console.log(elementId);
      document.getElementById(elementId).style.display = "none";
    } else {
      console.log(response);
      alert(response.statusText);
    }
  }
}

document.querySelectorAll('.approve-task-btn').forEach(btn => btn.addEventListener('click', taskApprovalHandler))