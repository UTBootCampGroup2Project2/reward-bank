async function createRewardHandler(event) {
  event.preventDefault();

  document.querySelectorAll('.create-new-reward-section').forEach(element => element.style.display = "none");
  document.querySelectorAll('.add-new-reward-section').forEach(element => element.style.display = "unset");
}

async function addRewardHandler(event) {
  event.preventDefault();

  
  const reward_name = document.querySelector('#new-reward-name').value.trim();
  const reward_cost = parseInt(document.querySelector('#new-reward-cost').value.trim());

  fetch(`/api/rewards`, {
    method: 'POST',
    body: JSON.stringify({
      name: reward_name,
      cost: reward_cost,
      status: 'active'
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response =>{
    if (response.ok) {
      document.location.replace('/settings');
//       document.getElementById('reward-table').innerHTML+=`
//       <tr>
//         <th scope="row" class="btn1" type="button">Delete</th>
//         <td>${reward_name}</td>
//         <td>${reward_cost}</td>
//       </tr>      
// `;
    }
  })
  .then(() => {
    document.querySelector('#new-reward-name').value = "";
    document.querySelector('#new-reward-cost').value = "";
    document.querySelectorAll('.create-new-reward-section').forEach(element => element.style.display = "unset");
    document.querySelectorAll('.add-new-reward-section').forEach(element => element.style.display = "none");
  })
  .catch(err => {
    console.log(err);
  });
}

async function discardRewardHandler(event) {
  event.preventDefault();

  document.querySelectorAll('.create-new-reward-section').forEach(element => element.style.display = "unset");
  document.querySelectorAll('.add-new-reward-section').forEach(element => element.style.display = "none");
}

document.getElementById('create-reward-btn').addEventListener('click', createRewardHandler);
document.getElementById('add-reward-btn').addEventListener('click', addRewardHandler);
document.getElementById('discard-reward-btn').addEventListener('click', discardRewardHandler);