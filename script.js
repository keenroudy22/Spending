// Replace with your web app URL
const scriptUrl = 'https://script.google.com/macros/s/AKfycbxNO-KolwV0tNZ03lDblSS7vgMDWpKKYc-6ae4Dwy9NCskKwoNvA8LegKxdQu-9r4vN/exec';

async function updateTotal() {
  try {
    const response = await fetch(`${scriptUrl}?action=getTotal`);
    const data = await response.json();
    document.getElementById('month').textContent = `Month: ${data.month}`;
    document.getElementById('total').textContent = `Total: $${data.total.toFixed(2)}`;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function addExpense() {
  const amount = parseFloat(document.getElementById('amount').value);
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount');
    return;
  }

  try {
    await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
    document.getElementById('amount').value = ''; // Clear the input
    updateTotal(); // Update the total after adding
  } catch (error) {
    console.error('Error adding expense:', error);
  }
}

// Initial load
updateTotal();
