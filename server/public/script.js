let total = 0;
let salary = 0;
let categoryExpenses = {};  // To track expenses by category

function updateBalance() {
    salary = parseFloat(document.getElementById("salary").value) || 0;
    document.getElementById("balance").textContent = (salary - total).toFixed(2);
}

function addCategory() {
    let newCategory = document.getElementById("new-category").value.trim();
    if (newCategory === "") {
        alert("Please enter a valid category");
        return;
    }
    let categorySelect = document.getElementById("category");
    let option = document.createElement("option");
    option.value = newCategory;
    option.textContent = newCategory;
    categorySelect.appendChild(option);
    document.getElementById("new-category").value = "";
}

function addExpense() {
    let category = document.getElementById("category").value;
    let amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    // Update total and category-specific expenses
    total += amount;
    if (!categoryExpenses[category]) {
        categoryExpenses[category] = 0;
    }
    categoryExpenses[category] += amount;

    document.getElementById("total").textContent = total.toFixed(2);
    document.getElementById("balance").textContent = (salary - total).toFixed(2);
    
    let expenseList = document.getElementById("expense-list");
    let entry = document.createElement("p");
    entry.textContent = `${category}: $${amount.toFixed(2)}`;
    expenseList.appendChild(entry);
    
    document.getElementById("amount").value = "";
}

// Submit form data
function submitSummary() {
    // Set the hidden inputs from the current values
    document.getElementById("form-total").value = total.toFixed(2);
    document.getElementById("form-balance").value = (salary - total).toFixed(2);
    document.getElementById("form-salary").value = salary.toFixed(2);  // Add salary

    // Create a category breakdown string
    let categoryBreakdown = JSON.stringify(categoryExpenses);
    document.getElementById("form-category-breakdown").value = categoryBreakdown;

    // Log data before submitting (for debugging)
    console.log({
        totalSpent: total.toFixed(2),
        remainingBalance: (salary - total).toFixed(2),
        categoryBreakdown: categoryBreakdown,
        salary: salary.toFixed(2)
    });

    // Submit the form
    document.getElementById("summary-form").submit();
}

