document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = document.getElementById('amount').value;
    if (!amount) {
        document.getElementById('message').innerHTML = '<p class="error">Please enter an amount.</p>';
        return;
    }
    fetch('https://script.google.com/macros/s/AKfycbxNO-KolwV0tNZ03lDblSS7vgMDWpKKYc-6ae4Dwy9NCskKwoNvA8LegKxdQu-9r4vN/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: parseFloat(amount) })
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            document.getElementById('message').innerHTML = '<p class="success">Expense added successfully!</p>';
            document.getElementById('amount').value = '';
        } else {
            document.getElementById('message').innerHTML = '<p class="error">There was an error adding the expense.</p>';
        }
    })
    .catch(error => {
        document.getElementById('message').innerHTML = '<p class="error">Network error. Please try again later.</p>';
    });
});
