document.addEventListener('DOMContentLoaded', function() {
  // Fetch the current month's total and display it
  fetch('https://script.google.com/macros/s/AKfycbxNO-KolwV0tNZ03lDblSS7vgMDWpKKYc-6ae4Dwy9NCskKwoNvA8LegKxdQu-9r4vN/exec')
    .then(response => response.json())
    .then(data => {
      document.getElementById('total').innerText = `$${data.total.toFixed(2)}`;
      document.getElementById('month').innerText = data.month;
    });
});

function addExpense() {
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  
  const payload = JSON.stringify({ amount: amount, description: description });

  fetch('https://script.google.com/macros/s/AKfycbxNO-KolwV0tNZ03lDblSS7vgMDWpKKYc-6ae4Dwy9NCskKwoNvA8LegKxdQu-9r4vN/exec', {
    method: 'POST',
    contentType: 'application/json',
    body: payload
  })
  .then(response => response.text())
  .then(result => {
    if (result === 'Success') {
      alert('Expense added successfully!');
      document.getElementById('amount').value = '';
      document.getElementById('description').value = '';
      
      // Refresh the total and month
      fetch('https://script.google.com/macros/s/AKfycbxNO-KolwV0tNZ03lDblSS7vgMDWpKKYc-6ae4Dwy9NCskKwoNvA8LegKxdQu-9r4vN/exec')
        .then(response => response.json())
        .then(data => {
          document.getElementById('total').innerText = `$${data.total.toFixed(2)}`;
          document.getElementById('month').innerText = data.month;
        });
    } else {
      alert('Failed to add expense.');
    }
  });
}
