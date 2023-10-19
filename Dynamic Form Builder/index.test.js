require('text-encoding').TextEncoder;
import "@testing-library/jest-dom/extend-expect";
import { fireEvent } from "@testing-library/dom";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let document;
let window;

describe("Dynamic Form Builder Functionality", () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  });

// Test Case 1: Field Creation
test('it adds a text input field to the form when Text Field is selected', () => {
  const fieldLabelInput = document.getElementById('fieldLabel');
  fieldLabelInput.value = 'Field Label'; // Setting the value for the input

  // Click add field button
  const addFieldBtn = document.getElementById('addField');
  fireEvent.click(addFieldBtn);

  // Save the form
  const saveFormBtn = document.getElementById('saveForm');
  fireEvent.click(saveFormBtn);

  // Try to get the text field from the saved forms in formsContainer
  const textField = document.querySelector('#formsContainer form input[type="text"]');
  
  expect(textField).toBeInTheDocument();
  expect(textField).toHaveAttribute('placeholder', 'Field Label');
});

// Test Case 2: Checkbox Creation
test('it adds a checkbox with a label when Checkbox is selected', () => {
  // Set field type and label
  const fieldTypeSelect = document.getElementById('fieldType');
  const fieldLabelInput = document.getElementById('fieldLabel');

  fieldTypeSelect.value = 'checkbox';
  fireEvent.change(fieldTypeSelect); // to trigger any event listeners on change

  fieldLabelInput.value = 'Test Checkbox';

  // Click add field button
  const addFieldBtn = document.getElementById('addField');
  fireEvent.click(addFieldBtn);

  // Save the form
  const saveFormBtn = document.getElementById('saveForm');
  fireEvent.click(saveFormBtn);

  // Try to get the checkbox from the saved forms in formsContainer
  const checkbox = document.querySelector('#formsContainer form input[type="checkbox"]');
  
  expect(checkbox).toBeInTheDocument();
  expect(document.querySelector(`label[for="${checkbox.id}"]`)).toHaveTextContent('Test Checkbox');
});


  // Test Case 3: Saving Forms
  test('it saves the form with the correct name to the formsContainer', () => {
    const formNameInput = document.getElementById('formName');
    formNameInput.value = 'Test Form';

    const saveFormBtn = document.getElementById('saveForm');
    fireEvent.click(saveFormBtn);

    const savedForm = document.querySelector('.form-container .form-title');
    expect(savedForm).toHaveTextContent('Test Form');
  });

  test('it names the saved form "Unnamed Form" if no name is provided', () => {
    const saveFormBtn = document.getElementById('saveForm');
    fireEvent.click(saveFormBtn);

    const savedForm = document.querySelector('.form-container .form-title');
    expect(savedForm).toHaveTextContent('Unnamed Form');
  });

  // Test Case 4: Multiple Forms
  test('it can save multiple forms sequentially', () => {
    const saveFormBtn = document.getElementById('saveForm');

    // Save the first form
    fireEvent.click(saveFormBtn);

    // Save the second form
    fireEvent.click(saveFormBtn);

    const savedForms = document.querySelectorAll('.form-container');
    expect(savedForms.length).toBe(2);
  });

});
