async function deleteRewardHandler(event) {
  event.preventDefault();
  
  const reward_id = parseInt(event.toElement.getAttribute('reward_id'));

  fetch(`/api/rewards/${reward_id}`, {
    method: 'DELETE'
  })
  .then(response =>{
    if (response.ok) {
      event.toElement.parentNode.remove();
    }
  })
  .catch(err => {
    console.log(err);
  });
}

document.querySelectorAll('.delete-reward-btn').forEach(btn => btn.addEventListener('click', deleteRewardHandler));