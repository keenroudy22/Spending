// Function to fetch and display the current month's total
async function fetchMonthlyTotal() {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxNO-KolwV0tNZ03lDblSS7vgMDWpKKYc-6ae4Dwy9NCskKwoNvA8LegKxdQu-9r4vN/exec');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    document.getElementById('month').textContent = data.month;
    document.getElementById('total').textContent = data.total.toFixed(2);
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('month').textContent = 'Error';
    document.getElementById('total').textContent = 'Error';
  }
}

// Function to post new expense data
document.getElementById('addExpenseButton').addEventListener('click', async () => {
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;

  if (!amount) {
    alert('Amount is required.');
    return;
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxNO-KolwV0tNZ03lDblSS7vgMDWpKKYc-6ae4Dwy9NCskKwoNvA8LegKxdQu-9r4vN/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, description })
    });

    if (response.ok) {
      alert('Expense added successfully');
      document.getElementById('amount').value = '';
      document.getElementById('description').value = '';
      fetchMonthlyTotal();
    } else {
      alert('Failed to add expense');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred');
  }
});

// Fetch the monthly total when the page loads
document.addEventListener('DOMContentLoaded', fetchMonthlyTotal);
