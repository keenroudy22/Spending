
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
    localStorage.setItem('total', total.toFixed(2));
    localStorage.setItem('history', historyList.innerHTML);
}

function loadSavedData() {
    const savedTotal = localStorage.getItem('total');
    const savedHistory = localStorage.getItem('history');
    
    if (savedTotal) {
        total = parseFloat(savedTotal);
        totalElement.textContent = total.toFixed(2);
    }
    
    if (savedHistory) {
        historyList.innerHTML = savedHistory;
    }
}
