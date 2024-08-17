document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const amount = document.getElementById('amount').value;
    
    fetch('https://script.google.com/macros/s/AKfycbxNO-KolwV0tNZ03lDblSS7vgMDWpKKYc-6ae4Dwy9NCskKwoNvA8LegKxdQu-9r4vN/exec', {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify({ amount: parseFloat(amount) })
    })
    .then(response => response.text())
    .then(text => {
        if (text === 'Success') {
            alert('Expense added successfully!');
            document.getElementById('amount').value = ''; // Clear the input field
            fetchTotal(); // Optionally update the displayed total
        } else {
            alert('Failed to add expense.');
        }
    });
});

function fetchTotal() {
    // Optionally, fetch and display the total from the Google Sheets
    // Implementation depends on how you wish to retrieve and display it
}
