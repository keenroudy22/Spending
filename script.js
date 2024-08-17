const SHEET_ID = '1dpTRaHfpATX85PvcrcTStXHvFdL_NqXG4UhvQXHqfSs'; // Your Sheet ID
const API_KEY = 'AIzaSyBS60n0zmjiZJgHHHIB4AXGlE6_DfoTXag'; // Your API key
const RANGE = 'Sheet1!A:D'; // Adjust the range if needed

async function addExpense() {
    const date = document.getElementById('date').value;
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;

    if (!date || !amount || !description) {
        alert('Please fill all fields.');
        return;
    }

    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}:append?valueInputOption=RAW&key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            values: [[date, amount, description]]
        })
    });

    if (response.ok) {
        alert('Expense added!');
        updateTotal();
    } else {
        alert('Failed to add expense.');
    }
}

async function updateTotal() {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`);
    const data = await response.json();
    const rows = data.values || [];
    let total = 0;

    rows.forEach(row => {
        const amount = parseFloat(row[1]);
        if (!isNaN(amount)) total += amount;
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

// Initialize total on page load
window.onload = updateTotal;
