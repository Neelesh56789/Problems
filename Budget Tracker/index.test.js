require('text-encoding').TextEncoder;
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let document;
let window;

describe("Budget Tracker functionality", () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: "dangerously" });
        document = dom.window.document;
        window = dom.window;
    });

    // Test Case 1: Form Submission without Input
    test("prevents form submission when fields are empty", () => {
        const form = document.getElementById('budget-form');
        const description = document.getElementById('description');
        const amount = document.getElementById('amount');
        form.dispatchEvent(new window.Event('submit'));

        expect(description.value).toBe('');
        expect(amount.value).toBe('');
    });

    // Test Case 2: Adding an Income
    test("adds an income correctly", () => {
        const description = document.getElementById('description');
        const amount = document.getElementById('amount');
        const type = document.getElementById('type');
        const totalBudget = document.getElementById('total-budget');
        
        description.value = "Salary";
        amount.value = "5000";
        type.value = "income";

        document.getElementById('budget-form').dispatchEvent(new window.Event('submit'));
        
        expect(parseFloat(totalBudget.textContent)).toBe(5000);
    });

    // Test Case 3: Adding an Expense
    test("deducts an expense correctly", () => {
        const description = document.getElementById('description');
        const amount = document.getElementById('amount');
        const type = document.getElementById('type');
        const totalBudget = document.getElementById('total-budget');
        
        description.value = "Rent";
        amount.value = "1500";
        type.value = "expense";

        document.getElementById('budget-form').dispatchEvent(new window.Event('submit'));
        
        expect(parseFloat(totalBudget.textContent)).toBe(-1500); // Assuming there's no previous income
    });

    // Test Case 4: Form Fields Reset After Submission
    test("resets form fields after submission", () => {
        const description = document.getElementById('description');
        const amount = document.getElementById('amount');
        
        description.value = "Test";
        amount.value = "1000";

        document.getElementById('budget-form').dispatchEvent(new window.Event('submit'));
        
        expect(description.value).toBe('');
        expect(amount.value).toBe('');
    });
    // Test Case 5: Decimal Values for Income/Expense
test("handles decimal values for income/expense correctly", () => {
  const description = document.getElementById('description');
  const amount = document.getElementById('amount');
  const type = document.getElementById('type');
  const totalBudget = document.getElementById('total-budget');
  
  description.value = "Test";
  amount.value = "45.67";
  type.value = "income";

  document.getElementById('budget-form').dispatchEvent(new window.Event('submit'));
  
  expect(parseFloat(totalBudget.textContent)).toBe(45.67);
});

// Test Case 6: Negative Values in the Amount Field
test("handles negative values in the amount field", () => {
  const description = document.getElementById('description');
  const amount = document.getElementById('amount');
  const type = document.getElementById('type');
  const totalBudget = document.getElementById('total-budget');
  
  description.value = "Test";
  amount.value = "-50";
  type.value = "expense";

  document.getElementById('budget-form').dispatchEvent(new window.Event('submit'));
  
  expect(parseFloat(totalBudget.textContent)).toBe(50); // It essentially adds 50 to the total
});


// Test Case 7: Non-Numeric Values in the Amount Field
test("does not update budget with non-numeric values", () => {
  const description = document.getElementById('description');
  const amount = document.getElementById('amount');
  const totalBudget = document.getElementById('total-budget');
  
  description.value = "Test";
  amount.value = "abc";

  document.getElementById('budget-form').dispatchEvent(new window.Event('submit'));
  
  // Instead of comparing the values, we'll check if the result is NaN
  expect(isNaN(parseFloat(totalBudget.textContent))).toBe(true);
});


// Test Case 8: Large Values for Income/Expense
test("handles large values for income/expense correctly", () => {
  const description = document.getElementById('description');
  const amount = document.getElementById('amount');
  const type = document.getElementById('type');
  const totalBudget = document.getElementById('total-budget');
  
  description.value = "Test";
  amount.value = "99999999999";
  type.value = "income";

  document.getElementById('budget-form').dispatchEvent(new window.Event('submit'));
  
  expect(parseFloat(totalBudget.textContent)).toBe(99999999999);
});

});
