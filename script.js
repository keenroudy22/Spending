document.getElementById('expense-form').addEventListener('submit', addExpense);

let total = 0;
const totalElement = document.getElementById('total');
const historyList = document.getElementById('history-list');

// Load saved data
document.addEventListener('DOMContentLoaded', loadSavedData);

function addExpense(event) {
    event.preventDefault();
    
    const amount = parseFloat(document.getElementById('amount').value);
    
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }
    
    // Add to total
    total += amount;
    totalElement.textContent = total.toFixed(2);
    
    // Add to history
    const listItem = document.createElement('li');
    listItem.textContent = `$${amount.toFixed(2)}`;
    historyList.appendChild(listItem);
    
    // Save to local storage
    saveData();
    
    // Clear the input
    document.getElementById('amount').value = '';
}

function saveData() {
    const expenses = Array.from(historyList.children).map(item => item.textContent);
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    localStorage.setItem(`total_${currentMonth}`, total.toFixed(2));
    localStorage.setItem(`expenses_${currentMonth}`, JSON.stringify(expenses));
}

function loadSavedData() {
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    const savedTotal = localStorage.getItem(`total_${currentMonth}`);
    const savedExpenses = localStorage.getItem(`expenses_${currentMonth}`);
    
    if (savedTotal) {
        total = parseFloat(savedTotal);
        totalElement.textContent = total.toFixed(2);
    }
    
    if (savedExpenses) {
        const expenses = JSON.parse(savedExpenses);
        expenses.forEach(expense => {
            const listItem = document.createElement('li');
            listItem.textContent = expense;
            historyList.appendChild(listItem);
        });
    }

    // Reset data at the start of a new month
    checkAndResetMonth();
}

function checkAndResetMonth() {
    const lastMonth = localStorage.getItem('lastMonth');
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if (lastMonth && lastMonth !== currentMonth) {
        // Send email report
        sendEmailReport(lastMonth);
        // Clear old month data
        localStorage.removeItem(`total_${lastMonth}`);
        localStorage.removeItem(`expenses_${lastMonth}`);
    }
    
    // Update lastMonth in local storage
    localStorage.setItem('lastMonth', currentMonth);
}

function sendEmailReport(month) {
    // You need a backend service to send emails
    // This is a placeholder function
    console.log(`Sending email report for ${month}...`);
}
