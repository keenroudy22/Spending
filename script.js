const API_URL = 'https://script.google.com/macros/s/AKfycbxNO-KolwV0tNZ03lDblSS7vgMDWpKKYc-6ae4Dwy9NCskKwoNvA8LegKxdQu-9r4vN/exec';

document.getElementById('add-expense').addEventListener('click', async () => {
  const amount = parseFloat(document.getElementById('amount').value);
  const description = document.getElementById('description').value;

  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ amount: amount, description: description })
  });

  if (response.ok) {
    alert('Expense added successfully.');
    loadTotals(); // Update the total amount on the page
  } else {
    alert('Failed to add expense.');
  }
});

async function loadTotals() {
  const response = await fetch(API_URL);
  const data = await response.json();

  document.getElementById('month').textContent = `Month: ${data.month}`;
  document.getElementById('total').textContent = `Total: $${data.total.toFixed(2)}`;
}

// Load the totals when the page is loaded
window.onload = loadTotals;
