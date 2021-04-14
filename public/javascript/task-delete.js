async function deleteTaskHandler(event) {
  event.preventDefault();

  const task_id = parseInt(event.target.getAttribute('task_id'));
  let contentArray = [];

  event.target.parentNode.querySelectorAll('td').forEach(element => {
    contentArray.push(element.textContent);
  });

  fetch(`/api/tasks/${task_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: contentArray[0],
      value: parseInt(contentArray[1]) || 0,
      status: 'inactive'
    }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => {
      if (response.ok) {
        event.target.parentNode.remove();
      }
    })
    .catch(err => {
      console.log(err);
    });
}

async function editTaskHandler(event) {
  event.preventDefault();

  const task_id = parseInt(event.target.getAttribute('task_id'));
  const btnState = event.target.textContent.trim().toLowerCase();
  let contentArray = [];

  switch (btnState) {
    case 'edit':
      event.target.parentNode.querySelectorAll('td').forEach(element => {
        element.setAttribute('contenteditable', true);
        element.setAttribute('style', 'white-space:nowrap');
        element.classList.add('edit-mode');
        event.target.textContent = 'Confirm';

      });
      event.target.parentNode.querySelector('td').focus();
      break;
    case 'confirm':
      if (event.target.parentNode.querySelectorAll('td')[0].textContent != "") {
        event.target.parentNode.querySelectorAll('td').forEach(element => {
          element.setAttribute('contenteditable', false);
          element.classList.remove('edit-mode');
          event.target.textContent = 'Edit';
          contentArray.push(element.textContent);
        });

        event.target.parentNode.querySelectorAll('td')[1].textContent = parseInt(contentArray[1]) || 0;

        fetch(`/api/tasks/${task_id}`, {
          method: 'PUT',
          body: JSON.stringify({
            name: contentArray[0],
            value: parseInt(contentArray[1]) || 0,
            status: 'active'
          }),
          headers: { 'Content-Type': 'application/json' }
        })
          .catch(err => {
            console.log(err);
          });
      }
      else {
        if (event.target.parentNode.querySelectorAll('td')[0].textContent == "") {
          alert('Please enter a task!');
        }
      }

      break;
    default:
      break;
  }
}

document.querySelectorAll('.delete-task-btn').forEach(btn => btn.addEventListener('click', deleteTaskHandler));
document.querySelectorAll('.edit-task-btn').forEach(btn => btn.addEventListener('click', editTaskHandler));