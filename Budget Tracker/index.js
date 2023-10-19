document.getElementById('budget-form').addEventListener('submit', function(event) {
    // Prevent form from submitting normally
    event.preventDefault();
  
    let description = document.getElementById('description').value;
    let amount = document.getElementById('amount').value;
    let type = document.getElementById('type').value;
  
    let totalBudget = document.getElementById('total-budget');
  
    // Depending on whether the type is an income or expense, add or subtract the amount
    if (type === 'income') {
        totalBudget.textContent = parseFloat(totalBudget.textContent) + parseFloat(amount);
    } else if (type === 'expense') {
        totalBudget.textContent = parseFloat(totalBudget.textContent) - parseFloat(amount);
    }
  
    // Clear the form fields
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
});
