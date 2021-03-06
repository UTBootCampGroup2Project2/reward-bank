async function deleteRewardHandler(event) {
  event.preventDefault();
  
  const reward_id = parseInt(event.target.getAttribute('reward_id'));
  let contentArray = [];
  
  event.target.parentNode.querySelectorAll('td').forEach(element => {
    contentArray.push(element.textContent);
  });

  fetch(`/api/rewards/${reward_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: contentArray[0],
      cost: parseInt(contentArray[1])||0,
      status: 'inactive'
    }),
  })
  .then(response =>{
    if (response.ok) {
      event.target.parentNode.remove();
    }
  })
  .catch(err => {
    console.log(err);
  });
}

async function editRewardHandler(event) {
  event.preventDefault();
  
  const reward_id = parseInt(event.target.getAttribute('reward_id'));
  const btnState = event.target.textContent.trim().toLowerCase();
  let contentArray = [];

  switch(btnState){
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
      if(event.target.parentNode.querySelectorAll('td')[0].textContent != ""){
        event.target.parentNode.querySelectorAll('td').forEach(element => {
          element.setAttribute('contenteditable', false);
          element.classList.remove('edit-mode');
          event.target.textContent = 'Edit';
          contentArray.push(element.textContent);
        });

        event.target.parentNode.querySelectorAll('td')[1].textContent = parseInt(contentArray[1])||0;

        fetch(`/api/rewards/${reward_id}`, {
          method: 'PUT',
          body: JSON.stringify({
            name: contentArray[0],
            cost: parseInt(contentArray[1])||0,
            status: 'active'
          }),
          headers: { 'Content-Type': 'application/json' }
        })
        .catch(err => {
          console.log(err);
        });
      }
      else{
        if(event.target.parentNode.querySelectorAll('td')[0].textContent == ""){
          alert('Please enter a reward!');
        }
      }

      break;
    default:
      console.log("Edit button error");
      break;
  }
}

document.querySelectorAll('.delete-reward-btn').forEach(btn => btn.addEventListener('click', deleteRewardHandler));
document.querySelectorAll('.edit-reward-btn').forEach(btn => btn.addEventListener('click', editRewardHandler));