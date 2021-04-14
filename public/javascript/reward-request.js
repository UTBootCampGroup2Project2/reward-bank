async function rewardRequestHandler(event) {
  event.preventDefault();

  const reward_id = parseInt(event.target.getAttribute('reward_id'));
  const user_id = parseInt(document.getElementById(`current_user_id`).getAttribute('user_id'));
  const user_balance = parseInt(document.getElementById(`user_balance`).textContent);
  const reward_cost = parseInt(document.getElementById(`reward_cost_${reward_id}`).textContent);
  const reward_name = event.target.getAttribute('reward_name');

  if(user_balance >= reward_cost){
    fetch(`/api/reward-history`, {
      method: 'POST',
      body: JSON.stringify({
        reward_id: reward_id
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response =>{
      if (response.ok) {

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
        document.getElementById(`user_balance`).textContent += ' points';
        let tempStr =`
        <tr class="rb-task-reward-layout">
          <th scope="row">${reward_name}</td>
          <td>${reward_cost}</td>
        </tr>
  `+ document.getElementById('reward_history_table').innerHTML
        document.getElementById('reward_history_table').innerHTML = tempStr;
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