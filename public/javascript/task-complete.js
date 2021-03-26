async function taskCompleteHandler(event) {
  event.preventDefault();

  const task_id = parseInt(event.target.getAttribute('task_id'));
  const task_name = event.target.getAttribute('task_name');
  const task_value = parseInt(event.target.getAttribute('task_value'));

  fetch(`/api/task-history`, {
    method: 'POST',
    body: JSON.stringify({
      task_id: task_id
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response =>{
    if (response.ok) {
      // alert("Task is now pending!");
      let tempStr =`
      <tr>
        <th scope="row">${task_name}</td>
        <td>${task_value}</td>
      </tr>
`+ document.getElementById('pending_task_table').innerHTML
      document.getElementById('pending_task_table').innerHTML = tempStr;
    }
  })
  .catch(err => {
    console.log(err);
  });
}

document.querySelectorAll('.complete-task-btn').forEach(btn => btn.addEventListener('click', taskCompleteHandler));