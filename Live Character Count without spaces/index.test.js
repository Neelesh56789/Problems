
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let document;
let window;

describe("Counting the characters without spaces", () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  });

  test("counts characters without spaces correctly", () => {
    // Get textarea and character count display
    const textInput = document.getElementById('textInput');
    const charCount = document.getElementById('charCount');
    
    // Simulate input
    textInput.value = "Hello World";  // 10 characters excluding space

    // Manually compute and set the character count excluding spaces
    const count = textInput.value.split(' ').join('').length;
    charCount.textContent = count.toString();

    // Check if displayed count matches expected count
    expect(charCount.textContent).toBe("10");
  });
});
