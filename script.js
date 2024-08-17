const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxNO-KolwV0tNZ03lDblSS7vgMDWpKKYc-6ae4Dwy9NCskKwoNvA8LegKxdQu-9r4vN/exec';

function addExpense() {
    const amount = document.getElementById('amount').value;
    if (amount) {
        fetch(SCRIPT_URL, {
            method: 'POST',
            contentType: 'application/json',
            body: JSON.stringify({ amount })
        })
        .then(response => response.text())
        .then(() => {
            document.getElementById('amount').value = '';
            getTotalForMonth();
        })
        .catch(error => console.error('Error:', error));
    }
}

function getTotalForMonth() {
    fetch(SCRIPT_URL + '?action=getTotal')
        .then(response => response.json())
        .then(data => {
            document.getElementById('month').innerText = `Month: ${data.month}`;
            document.getElementById('total').innerText = `Total: $${data.total.toFixed(2)}`;
        })
        .catch(error => console.error('Error:', error));
}

// Initialize display
getTotalForMonth();
