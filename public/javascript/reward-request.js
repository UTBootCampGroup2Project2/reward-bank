async function rewardRequestHandler(event) {
  event.preventDefault();

  const reward_id = event.toElement.getAttribute('reward_id');
  const user_id = parseInt(document.getElementById(`current_user_id`).getAttribute('user_id'));
  const user_balance = parseInt(document.getElementById(`user_balance`).textContent);
  const reward_cost = parseInt(document.getElementById(`reward_cost_${reward_id}`).textContent);
  const reward_name = event.toElement.getAttribute('reward_name');

  console.log(user_id);
  if(user_balance > reward_cost){
    fetch(`/api/reward-history`, {
      method: 'POST',
      body: JSON.stringify({
        reward_id: reward_id
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response =>{
      if (response.ok) {
        // document.location.replace('/dashboard');
        // document.getElementById(`task_history_entry_${task_history_id}`).style.display = "none";

      }
    })
    .then(() => fetch(`/api/users/balance/${user_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        balance: user_balance - reward_cost
      }),
      headers: { 'Content-Type': 'application/json' }
    }))
    .then(response =>{
      if (response.ok) {
        document.getElementById(`user_balance`).textContent = user_balance - reward_cost;

        document.getElementById('reward_history_table').innerHTML+=`
        <tr>
          <th scope="row">${reward_name}</td>
          <td>${reward_cost}</td>
        </tr>      
  `;
      } 
    })
    .catch(err => {
      console.log(err);
    });
  }
  else{
    alert("Insufficient balance!");
  }
    
}

document.querySelectorAll('.request-reward-btn').forEach(btn => btn.addEventListener('click', rewardRequestHandler));