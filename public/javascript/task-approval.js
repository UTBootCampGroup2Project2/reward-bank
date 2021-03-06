async function taskApprovalHandler(event) {
  event.preventDefault();

  const task_history_id = parseInt(event.target.getAttribute('task_history_id'));
  const completed_by_user_id = parseInt(event.target.getAttribute('completed_by_user_id'));
  const task_value = parseInt(event.target.getAttribute('task_value'));
  const user_balance = parseInt(document.getElementById(`user_balance_${completed_by_user_id}`).textContent);

  if (task_history_id) {
    fetch(`/api/task-history/${task_history_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        status: 'completed'
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response =>{
      if (response.ok) {
        document.getElementById(`task_history_entry_${task_history_id}`).style.display = "none";
      }
    })
    .then(() => fetch(`/api/users/balance/${completed_by_user_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        balance: user_balance + task_value
      }),
      headers: { 'Content-Type': 'application/json' }
    }))
    .then(response =>{
      if (response.ok) {
        document.getElementById(`user_balance_${completed_by_user_id}`).textContent = user_balance + task_value;
      } 
    })
    .catch(err => {
      console.log(err);
    });

  }
}

document.querySelectorAll('.approve-task-btn').forEach(btn => btn.addEventListener('click', taskApprovalHandler));