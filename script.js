async function fetchTotals() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxNO-KolwV0tNZ03lDblSS7vgMDWpKKYc-6ae4Dwy9NCskKwoNvA8LegKxdQu-9r4vN/exec');
    const data = await response.json();
    
    document.getElementById('month').innerText = data.month;
    document.getElementById('total').innerText = data.total.toFixed(2);
}

async function addExpense() {
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    
    const response = await fetch('https://script.google.com/macros/s/AKfycbxNO-KolwV0tNZ03lDblSS7vgMDWpKKYc-6ae4Dwy9NCskKwoNvA8LegKxdQu-9r4vN/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: amount, description: description })
    });
    
    const result = await response.text();
    alert(result);

    // Refresh totals after adding an expense
    fetchTotals();
}

// Load totals when the page is loaded
window.onload = fetchTotals;

document.getElementById('addExpenseButton').addEventListener('click', addExpense);
