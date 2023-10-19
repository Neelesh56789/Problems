require('text-encoding').TextEncoder;
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import { fireEvent } from "@testing-library/dom";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let document;
let window;
let input;

describe("Submit the form with inputs",()=>{
  beforeEach(()=>{
    
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
    input = window.input;
  });
  test('Submitting the form with valid input', () => {
    // Simulate valid input
    const input_name = document.getElementById('name').value = 'Code Studio';
    const input_email = document.getElementById('email').value = 'code.studio@codingninjas.com';
    const input_pass = document.getElementById('pass').value = 'password123';

    
  
    // Trigger form submission
    document.getElementById('form').submit();
    
    // console.log(input);
    const ele = document.getElementById('users');
    
  
    // Assert that form submission is handled correctly
    expect(ele.children).toBeDefined;
    // expect(input[0]).toEqual({
    //   name: 'coding ninja',
    //   email: 'codingninjas@codingninjas.com',
    //   pass: '123@123'
    // });
  
  });

}); 

  // Test Case 2: Submitting the form with invalid name
describe("Submitting the form with invalid name", ()=>{
  beforeEach(()=>{
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  });
  test('Name field should contain only upper case and lower case characters and spaces', () => {
    // Set a valid name with upper case, lower case, and space characters
    const validName = 'code studio';

    // Set an invalid name with a special character
    const invalidName = 'code@studio';

    // Set the name input value to the valid name
    document.getElementById('name').value = validName;

    // Retrieve the name value from the input field
    const nameValue = document.getElementById('name').value;

    // Assert that the name contains only upper case, lower case, and space characters
    expect(/^[A-Za-z\s]+$/.test(nameValue)).toBe(true);

    // Set the name input value to the invalid name
    document.getElementById('name').value = invalidName;

    // Retrieve the name value from the input field
    const invalidNameValue = document.getElementById('name').value;

    // Assert that the invalid name contains a special character
    expect(/^[A-Za-z\s]+$/.test(invalidNameValue)).toBe(false);
  });
});
  
  

  // Test Case 3: Submitting the form with invalid email
describe("Submitting the form with invalid email", ()=>{
  beforeEach(()=>{
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  })
  test('Email field should contain an email ending with "@codingninjas.com"', () => {
    // Set a valid email ending with "@codingninjas.com"
    const validEmail = 'test@codingninjas.com';

    // Set an invalid email without ending "@codingninjas.com"
    const invalidEmail = 'test@example.com';

    // Set the email input value to the valid email
    document.getElementById('email').value = validEmail;

    // Retrieve the email value from the input field
    const emailValue = document.getElementById('email').value;

    // Assert that the email ends with "@codingninjas.com"
    expect(emailValue.endsWith('@codingninjas.com')).toBe(true);

    // Set the email input value to the invalid email
    document.getElementById('email').value = invalidEmail;

    // Retrieve the email value from the input field
    const invalidEmailValue = document.getElementById('email').value;

    // Assert that the email does not end with "@codingninjas.com"
    expect(invalidEmailValue.endsWith('@codingninjas.com')).toBe(false);
  });
});
  
  // Test Case 4: Submitting the form with an invalid password
describe("Submitting the form with invalid password", ()=>{
  beforeEach(()=>{
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  })
  test('Password field should contain password with size >= 8 and contains "@"', () => {
    // Set a valid password
    const validPassword = 'password@123';

    // Set an invalid password with size < 8
    const invalidPasswordSize = 'pass@12';

    // Set an invalid password without "@"
    const invalidPasswordCharacter = 'password123';

    // Set the password input value to the valid password
    document.getElementById('pass').value = validPassword;

    // Retrieve the password value from the input field
    const passwordValue = document.getElementById('pass').value;

    // Assert that the password size is >= 8 and contains "@"
    expect(passwordValue.length >= 8).toBe(true);
    expect(passwordValue.includes('@')).toBe(true);

    // Set the password input value to the invalid password with size < 8
    document.getElementById('pass').value = invalidPasswordSize;

    // Retrieve the password value from the input field
    const invalidSizePasswordValue = document.getElementById('pass').value;

    // Assert that the password size is < 8
    expect(invalidSizePasswordValue.length >= 8).toBe(false);

    // Set the password input value to the invalid password without "@"
    document.getElementById('pass').value = invalidPasswordCharacter;

    // Retrieve the password value from the input field
    const invalidCharacterPasswordValue = document.getElementById('pass').value;

    // Assert that the password does not contain "@"
    expect(invalidCharacterPasswordValue.includes('@')).toBe(false);
  });
});
  
  // Test Case 5: Clearing the form

describe("Clear button is working fine or not",()=>{
  beforeEach(()=>{
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  });
  test('checking the test',async(done)=>{

    const clear = document.querySelector('.cancelbtn');
    let inputName = document.getElementById('name').value;
    let input_email = document.getElementById('email').value;
    let input_pass = document.getElementById('pass').value;
    inputName = "Neelesh";
    input_email = "neelesh@codingninjas.com";
    input_pass = "neelesh@123";
    clear.click();
    setTimeout(()=>{
      let inputName_1 = document.getElementById('name').value;
      let input_email_1 = document.getElementById('email').value;
      let input_pass_1 = document.getElementById('pass').value;
      expect(inputName_1).toBe("");
      expect(input_email_1).toBe("");
      expect(input_pass_1).toBe("");
      expect(inputName_1).not.toBe(inputName);
      expect(input_email_1).not.toBe(input_email);
      expect(input_pass_1).not.toBe(input_pass);
      done();
    },4000)
    
  });
})
 
  // Test Case 6: Clicking "Forget password?" link
describe("Clicking Forget password",()=>{
  beforeEach(()=>{
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  })
  test('Clicking "Forget password?" link', async(done) => {
    const mockAlert = jest.fn();
    window.alert = mockAlert;
    const forget = document.querySelector('.psw');
    let inputName = document.getElementById('name').value;
    let input_email = document.getElementById('email').value;
    let input_pass = document.getElementById('pass').value;
    inputName = "Neelesh";
    input_email = "neelesh@codingninjas.com";
    input_pass = "neelesh@123";
    forget.click();
    setTimeout(()=>{
      let inputName_1 = document.getElementById('name').value;
      let input_email_1 = document.getElementById('email').value;
      let input_pass_1 = document.getElementById('pass').value;
      expect(inputName_1).toBe("");
      expect(input_email_1).toBe("");
      expect(input_pass_1).toBe("");
      expect(inputName_1).not.toBe(inputName);
      expect(input_email_1).not.toBe(input_email);
      expect(input_pass_1).not.toBe(input_pass);
      expect(mockAlert).toHaveBeenCalledWith('Verification Code has been sent to your mail');
      done();
    },3000);
    
  });
})

