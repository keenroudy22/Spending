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

// Call the function to fetch the monthly total when the page loads
document.addEventListener('DOMContentLoaded', fetchMonthlyTotal);
