const expenseForm = document.getElementById('expense-form');
const totalDisplay = document.getElementById('total');
let total = 0;

// Load total from localStorage if available
window.onload = function() {
    if (localStorage.getItem('monthlyTotal')) {
        total = parseFloat(localStorage.getItem('monthlyTotal'));
        totalDisplay.textContent = total.toFixed(2);
    }
};

// Add expense and update total
expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    if (amount > 0) {
        total += amount;
        totalDisplay.textContent = total.toFixed(2);
        localStorage.setItem('monthlyTotal', total.toFixed(2));
        document.getElementById('amount').value = '';
    }
});

// Reset total at the beginning of a new month
const currentMonth = new Date().getMonth();
if (localStorage.getItem('month') !== currentMonth.toString()) {
    localStorage.setItem('monthlyTotal', '0');
    localStorage.setItem('month', currentMonth.toString());
    total = 0;
    totalDisplay.textContent = total.toFixed(2);
}
