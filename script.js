const apiUrl = 'https://script.google.com/macros/s/AKfycbxNO-KolwV0tNZ03lDblSS7vgMDWpKKYc-6ae4Dwy9NCskKwoNvA8LegKxdQu-9r4vN/exec';

document.addEventListener('DOMContentLoaded', function() {
  updateTotal();
});

document.getElementById('addExpense').addEventListener('click', function() {
  const amount = parseFloat(document.getElementById('amount').value);
  if (isNaN(amount)) {
    alert('Please enter a valid amount');
    return;
  }

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: amount })
  }).then(response => response.text()).then(result => {
    if (result === 'Success') {
      updateTotal();
      document.getElementById('amount').value = ''; // Clear input field
    } else {
      alert('Error: ' + result);
    }
  });
});

function updateTotal() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById('total').textContent = `Total for ${data.month}: $${data.total.toFixed(2)}`;
    });
}
