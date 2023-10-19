require('text-encoding').TextEncoder;
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let document;
let window;

describe("Character counter functionality", () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  });

  test("counts characters correctly", () => {
    // Get textarea and character count display
    const textInput = document.getElementById('textInput');
    const charCount = document.getElementById('charCount');
    
    // Simulate input
    const testString = "Hello Jest Testing!";
    textInput.value = testString;
    
    // Manually trigger the 'input' event
    const event = new window.Event('input');
    textInput.dispatchEvent(event);
    
    // Check if displayed count matches expected count
    expect(charCount.textContent).toBe(testString.length.toString());
  });
});
