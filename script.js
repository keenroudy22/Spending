// Function to fetch and display the current month's total
async function fetchMonthlyTotal() {
  try {
    // Fetch data from the Google Apps Script web app
    const response = await fetch('https://script.google.com/macros/s/AKfycbxNO-KolwV0tNZ03lDblSS7vgMDWpKKYc-6ae4Dwy9NCskKwoNvA8LegKxdQu-9r4vN/exec');
    
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    // Parse the JSON data from the response
    const data = await response.json();
    
    // Display the month and total in the appropriate HTML elements
    document.getElementById('month').textContent = data.month;
    document.getElementById('total').textContent = data.total.toFixed(2);
  } catch (error) {
    // Log the error and display an error message
    console.error('Error fetching data:', error);
    document.getElementById('month').textContent = 'Error';
    document.getElementById('total').textContent = 'Error';
  }
}

// Function to post expense data to Google Apps Script
async function postExpense(amount, description) {
  try {
    // Post data to the Google Apps Script web app
    const response = await fetch('https://script.google.com/macros/s/AKfycbxNO-KolwV0tNZ03lDblSS7vgMDWpKKYc-6ae4Dwy9NCskKwoNvA8LegKxdQu-9r4vN/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: parseFloat(amount), description: description })
    });
    
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    // Parse the response text
    const result = await response.text();
    
    // Handle success or error based on response
    if (result === 'Success') {
      alert('Expense added successfully');
      fetchMonthlyTotal(); // Refresh the total after adding the expense
    } else {
      alert('Failed to add expense: ' + result);
    }
  } catch (error) {
    console.error('Error posting data:', error);
    alert('Error posting data: ' + error.message);
  }
}

// Event listener for form submission
document.getElementById('addExpenseButton').addEventListener('click', () => {
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  
  if (amount) {
    postExpense(amount, description);
  } else {
    alert('Amount is required');
  }
});

// Call the function to fetch the monthly total when the page loads
document.addEventListener('DOMContentLoaded', fetchMonthlyTotal);
