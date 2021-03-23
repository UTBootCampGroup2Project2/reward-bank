async function createTaskHandler(event) {
  event.preventDefault();

  document.querySelectorAll('.create-new-task-section').forEach(element => element.style.display = "none");
  document.querySelectorAll('.add-new-task-section').forEach(element => element.style.display = "unset");
}

async function addTaskHandler(event) {
  event.preventDefault();

  
  const task_name = document.querySelector('#new-task-name').value.trim();
  const task_value = parseInt(document.querySelector('#new-task-value').value.trim());

  fetch(`/api/tasks`, {
    method: 'POST',
    body: JSON.stringify({
      name: task_name,
      value: task_value,
      status: 'active'
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response =>{
    if (response.ok) {
      // document.location.replace('/settings');
      // document.getElementById(`task_history_entry_${task_history_id}`).style.display = "none";
      document.getElementById('task-table').innerHTML+=`
      <tr>
        <th scope="row" class="btn1" type="button">Delete</th>
        <td>${task_name}</td>
        <td>${task_value}</td>
      </tr>      
`;
    }
  })
  .then(() => {
    document.querySelector('#new-task-name').value = "";
    document.querySelector('#new-task-value').value = "";
    document.querySelectorAll('.create-new-task-section').forEach(element => element.style.display = "unset");
    document.querySelectorAll('.add-new-task-section').forEach(element => element.style.display = "none");
  })
  .catch(err => {
    console.log(err);
  });
}

async function discardTaskHandler(event) {
  event.preventDefault();

  document.querySelectorAll('.create-new-task-section').forEach(element => element.style.display = "unset");
  document.querySelectorAll('.add-new-task-section').forEach(element => element.style.display = "none");
}

document.getElementById('create-task-btn').addEventListener('click', createTaskHandler);
document.getElementById('add-task-btn').addEventListener('click', addTaskHandler);
document.getElementById('discard-task-btn').addEventListener('click', discardTaskHandler);