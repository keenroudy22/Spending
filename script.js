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
async function postExpenseData(amount, description) {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxNO-KolwV0tNZ03lDblSS7vgMDWpKKYc-6ae4Dwy9NCskKwoNvA8LegKxdQu-9r4vN/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: amount, description: description })
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const result = await response.text();
    console.log('Post result:', result);
    fetchMonthlyTotal(); // Refresh the total display
  } catch (error) {
    console.error('Error posting data:', error);
  }
}

// Event listener for the Add Expense button
document.getElementById('addExpenseButton').addEventListener('click', () => {
  const amount = parseFloat(document.getElementById('amount').value);
  const description = document.getElementById('description').value;
  
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount');
    return;
  }

  postExpenseData(amount, description);
});

// Fetch the monthly total when the page loads
document.addEventListener('DOMContentLoaded', fetchMonthlyTotal);
