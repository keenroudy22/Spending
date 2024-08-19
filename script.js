async function fetchMonthlyTotal() {
  try {
    const response = await fetch('https://keenroudy.com/spending/api/exec');
    console.log('GET response:', response); // Log response details

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Fetched data:', data); // Log fetched data

    document.getElementById('month').textContent = data.month;
    document.getElementById('total').textContent = data.total.toFixed(2);
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('month').textContent = 'Error';
    document.getElementById('total').textContent = 'Error';
  }
}

async function addExpense() {
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;

  if (amount) {
    try {
      const response = await fetch('https://keenroudy.com/spending/api/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: parseFloat(amount), description })
      });

      console.log('POST response:', response); // Log response details

      const text = await response.text();
      console.log('Response text:', text); // Log the response text

      const result = JSON.parse(text);
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

document.getElementById('addExpenseButton').addEventListener('click', addExpense);
document.addEventListener('DOMContentLoaded', fetchMonthlyTotal);
