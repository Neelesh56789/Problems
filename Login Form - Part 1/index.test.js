// require('text-encoding').TextEncoder;
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

 