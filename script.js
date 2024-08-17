// Initialize the expense tracker
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('expense-form');
    const totalDisplay = document.getElementById('total');

    // Load saved total from localStorage
    let total = parseFloat(localStorage.getItem('monthlyTotal')) || 0;
    let savedMonth = localStorage.getItem('month');
    let currentMonth = new Date().getMonth();

    // Reset total if it's a new month
    if (savedMonth == null || parseInt(savedMonth) !== currentMonth) {
        total = 0;
        localStorage.setItem('monthlyTotal', total);
        localStorage.setItem('month', currentMonth);
    }

    totalDisplay.textContent = total.toFixed(2);

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        if (amount > 0) {
            total += amount;
            localStorage.setItem('monthlyTotal', total);
            totalDisplay.textContent = total.toFixed(2);
            form.reset();
        }
    });
});
