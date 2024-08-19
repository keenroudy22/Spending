// Function to fetch and display the current month's total
async function fetchMonthlyTotal() {
  try {
    const response = await fetch('https://keenroudy.com/spending/api/exec');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    console.log('Fetched data:', data); // Log the data to check its structure

    // Ensure data.total is a number
    const total = parseFloat(data.total);
    if (isNaN(total)) {
      throw new Error('Invalid total value');
    }

    document.getElementById('month').textContent = data.month;
    document.getElementById('total').textContent = total.toFixed(2);
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('month').textContent = 'Error';
    document.getElementById('total').textContent = 'Error';
  }
}

// Function to handle adding a new expense
async function addExpense() {
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;

  if (amount) {
    try {
      const response = await fetch('https://keenroudy.com/spending/api/exec', { // Update this URL if needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: parseFloat(amount), description })
      });

      const result = await response.json();

      if (result.status === 'success') {
        alert('Expense added successfully');
        fetchMonthlyTotal(); // Refresh the total
      } else {
        alert('Failed to add expense: ' + result.message);
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  } else {
    alert('Please enter an amount.');
  }
}

// Add event listener to the button
document.getElementById('addExpenseButton').addEventListener('click', addExpense);

// Call the function to fetch the monthly total when the page loads
document.addEventListener('DOMContentLoaded', fetchMonthlyTotal);
