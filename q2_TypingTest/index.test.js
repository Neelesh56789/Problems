require('text-encoding').TextEncoder;
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let document;
let window;

describe("Test to Check whether Random Paragraph is genreate or not", () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  });

  test('Random Text is Generated or Not?', ()=>{
    const button = document.getElementById('btn');
    const msg = document.getElementById('msg');

    button.click();
    setTimeout(()=>{

      const oldMessage = msg.textContent;
      button.click();
      button.click();
      setTimeout(()=>{
        const latestMessage = msg.textContent;
        expect(latestMessage).not.toBe(oldMessage);
    
      },1000);
      
  
    },1000)
  })
});

describe ('Start button is converted into Done button after clicking', ()=>{
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  });
  test('Start button is converted', ()=>{
    const button = document.getElementById('btn');
    const btn1 = "Start";
    button.click();
    setTimeout(()=>{
      const btn2 = "Done";
      expect(btn1).toBe(btn2);
    })
  })
})

describe ('Done button is converted into Start button after clicking', ()=>{
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  });
  test('Start button is converted', ()=>{
    const button = document.getElementById('btn');
    const btn1 = "Start";
    button.click();
    setTimeout(()=>{
      const btn2 = "Done";
      expect(btn1).toBe(btn2);
      button.click();
      setTimeout(()=>{
        const btn3 = "Start";
        expect(btn2).toBe(btn3);
      }, 100)
    }, 100)
    

  })
})

describe('Checking the speed per minute is right or not?', ()=>{
  beforeEach(()=>{
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  })

  test('Calculate typing speed correctly', () => {
    const msg = document.getElementById('msg');
    const button = document.getElementById('btn');
    button.click();
    // Simulate button click to start the test
    setTimeout(()=>{
      
    //console.log(msg.textContent);

    // Type some text in the textarea
    const typingText = "Boost your coding skills with Coding Ninja!";
    document.getElementById('mywords').value = typingText;
    console.log(document.getElementById('mywords').value);

    // Simulate button click to end the test
    document.getElementById('btn').click();

      setTimeout(()=>{
        // Get the result message after the test
      const resultMessage = msg.textContent;
      //console.log(resultMessage);

      const regex = /Your typing speed is (\d+) words per minute/;
      const speed = resultMessage.match(regex);

      // Test the typing speed calculation
      expect(parseInt(speed)).toBeGreaterThan(0);
      // expect(parseInt(correct)).toBeGreaterThan(0);
      // expect(parseInt(total)).toBe(typingText.split(' ').length);
      // expect(parseInt(errors)).toBe(typingText.split(' ').length - parseInt(correct));
      }, 100)
    }, 100)

    
    
  });
})




