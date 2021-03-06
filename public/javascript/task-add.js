async function createTaskHandler(event) {
  event.preventDefault();

  document.querySelectorAll('.create-new-task-section').forEach(element => element.style.display = "none");
  document.querySelectorAll('.add-new-task-section').forEach(element => element.style.display = "unset");
}

async function addTaskHandler(event) {
  event.preventDefault();

  const task_name = document.querySelector('#new-task-name').value.trim();
  const task_value = parseInt(document.querySelector('#new-task-value').value.trim());

  if(task_name && task_value){
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
        document.location.reload();
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
  else{
    alert('Missing information!');
  }

}

async function discardTaskHandler(event) {
  event.preventDefault();

  document.querySelectorAll('.create-new-task-section').forEach(element => element.style.display = "unset");
  document.querySelectorAll('.add-new-task-section').forEach(element => element.style.display = "none");
}

document.getElementById('create-task-btn').addEventListener('click', createTaskHandler);
document.getElementById('add-task-btn').addEventListener('click', addTaskHandler);
document.getElementById('discard-task-btn').addEventListener('click', discardTaskHandler);