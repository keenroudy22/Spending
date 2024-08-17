const expenseForm = document.getElementById('expenseForm');
const amountInput = document.getElementById('amount');
const totalDisplay = document.getElementById('total');
const emailButton = document.getElementById('emailButton');

const sheetId = '1dpTRaHfpATX85PvcrcTStXHvFdL_NqXG4UhvQXHqfSs';
const apiKey = 'AIzaSyBS60n0zmjiZJgHHHIB4AXGlE6_DfoTXag';

let totalExpenses = 0;

async function fetchExpenses() {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Expenses?key=${apiKey}`);
    const data = await response.json();
    const values = data.values || [];
    totalExpenses = values.reduce((sum, row) => sum + parseFloat(row[1] || 0), 0);
    totalDisplay.textContent = totalExpenses.toFixed(2);
}

async function addExpense(amount) {
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Expenses:append?valueInputOption=RAW&key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            range: 'Expenses',
            values: [[today, amount]]
        })
    });
    const result = await response.json();
    console.log('Expense added:', result);
    totalExpenses += parseFloat(amount);
    totalDisplay.textContent = totalExpenses.toFixed(2);
}

async function sendEmailReport() {
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Expenses?key=${apiKey}`);
    const data = await response.json();
    const values = data.values || [];
    const reportData = values.map(row => `${row[0]}: ${row[1]}`).join('\n');

    // Use your email service provider here to send the email.
    console.log('Sending email report with data:', reportData);
}

expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = amountInput.value;
    if (amount) {
        addExpense(amount);
        amountInput.value = '';
    }
});

emailButton.addEventListener('click', () => {
    sendEmailReport();
});

fetchExpenses();
