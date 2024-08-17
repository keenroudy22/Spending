const apiUrl = 'https://script.google.com/macros/s/AKfycbxNO-KolwV0tNZ03lDblSS7vgMDWpKKYc-6ae4Dwy9NCskKwoNvA8LegKxdQu-9r4vN/exec';

// Function to update total and month
async function updateTotals() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        document.getElementById('month').textContent = `Month: ${data.month}`;
        document.getElementById('total').textContent = `Total: $${data.total.toFixed(2)}`;
    } catch (error) {
        console.error('Error fetching totals:', error);
    }
}

// Function to handle adding expense
async function addExpense(amount) {
    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount })
        });
        updateTotals();
    } catch (error) {
        console.error('Error adding expense:', error);
    }
}

// Event listener for add expense button
document.getElementById('add-expense').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('amount').value);
    if (!isNaN(amount)) {
        addExpense(amount);
        document.getElementById('amount').value = '';
    } else {
        alert('Please enter a valid amount');
    }
});

// Initial load
updateTotals();
