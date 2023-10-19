require('text-encoding').TextEncoder;
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";



const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let document;
let window;
let changeColor;
let generateRandomColorCode;


describe('changeColor', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
    changeColor = window.changeColor;
    generateRandomColorCode = window.generateRandomColorCode;

    // Mock navigator.clipboard
    global.navigator.clipboard = {
      writeText: jest.fn()
    };
  });

  test('should return a color code string', () => {
    const colorCode = generateRandomColorCode();
    expect(colorCode).toMatch(/^#([0-9A-F]{6})$/i);
  });


test('should change the text content of the color element', () => {
  document.body.innerHTML = '<div id="color"></div>';

  const colorCode = changeColor();
  console.log(colorCode);

  expect(document.getElementById('color').innerText).toBe(colorCode);
});
});


describe("Check whether we are copying the color code when we press the Click button",()=>{
  beforeEach(()=>{
    
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
    
    // Mock the clipboard
    dom.window.navigator.clipboard = {
      writeText: jest.fn(),
    };
    
    // Run the script in your HTML
    // dom.runVMScript(script);
    
    // Trigger the DOMContentLoaded event
    dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
  });
  
  test('should call the navigator.clipboard.writeText method with the new color', async () => {
    const clipboardSpy = jest.spyOn(dom.window.navigator.clipboard, 'writeText');
    
    // Simulate the button click
    const button = document.getElementById('btn');
    button.dispatchEvent(new dom.window.MouseEvent('click'));
    
    // Allow any async actions to finish
    // await new Promise((resolve) => setTimeout(resolve, 0));

    // Verify clipboard.writeText was called
    expect(clipboardSpy).toHaveBeenCalled();
    
    clipboardSpy.mockRestore();
  });
});

