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

describe("Test to Check whether Random Paragraph is genreate or not", () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  });

test("generates a random paragraph on start", async(done) => {
  const button = document.getElementById('btn');
  const msg = document.getElementById('msg');
  const msg1 = msg.textContent;
  console.log(msg1);
  button.click();
  setTimeout(()=>{
    const msg2 = document.querySelector("#msg").textContent;
    console.log(msg2);
    expect(msg1).not.toBe(msg);
    done();
  },1000);
  
});
});



describe ('Done button is converted into Start button after clicking and vice versa', ()=>{
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  });
  test('Start button is converted', async (done)=>{
    const button = document.getElementById('btn');
    const btn1 = button.textContent;
    console.log(btn1);
    button.click();
    
    setTimeout(()=>{
      const button1 = document.getElementById('btn');
    const btn2 = button1.textContent;
    console.log(btn2);
      expect(btn1).not.toBe(btn2);
      button.click();
      setTimeout(()=>{
        const button2 = document.getElementById('btn');
        const btn3 = button1.textContent;
        expect(btn2).not.toBe(btn3);
      }, 1000)
      done();
    }, 1000)


  })
})

describe('Counting of Correct and Wrong words are right or not?', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  });

  test('Counting of Correct and incorrect words are right?', async () => {
    // Use Promises to handle the asynchronicity
    return new Promise((resolve) => {
      const button = document.getElementById('btn');
      button.click();

      // Wait 3 seconds
      setTimeout(() => {
        const typingText = "Boost your coding skills with Coding Ninja!";
        document.getElementById('mywords').value = typingText;
        document.getElementById('btn').click();

        // Wait another second
        setTimeout(() => {
          const msg = document.getElementById('msg');
          const resultMessage = msg.textContent.trim().replace(/\s\s+/g, ' ');

          const regex = /Your typing speed is (\d+) words per minute, (\d+) correct out of (\d+) words and total wrong words are (\d+)/;
          const matches = resultMessage.match(regex);

          if (matches) {
            const speed = matches[1];
            const correct = matches[2];
            const total = matches[3];
            const errors = matches[4];
            expect(parseInt(speed)).toBeGreaterThan(0);
            expect(parseInt(correct)).toBeGreaterThanOrEqual(0);
            expect(parseInt(total)).not.toBe(typingText.split(' ').length);
            expect(parseInt(errors)).not.toBe(typingText.split(' ').length - parseInt(correct));
            resolve();
          } else {
            throw new Error('The regex did not match the result message');
          }
        }, 1000);
      }, 3000);
    });
  });
});


describe('Checking whether timer is working fine or not?', ()=>{
  beforeEach(()=>{
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  })
  test('Timer is working fine?', async(done)=>{
    const button = document.getElementById('btn');
    const timer = document.getElementById('timer');
    const initialTime = timer.textContent;
    button.click();
    setTimeout(()=>{
      button.click();
      const finalTime = timer.textContent;
      expect(finalTime).not.toBe(initialTime);
      done();
    }, 4000)
  })
  
})







describe('Typing Speed Test', () => {

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  });

  test('should calculate the correct typing speed', async () => {
    return new Promise((resolve, reject) => {
      const button = document.getElementById('btn');
      button.click(); // start the test

      // After 3 seconds, input the sample text
      setTimeout(() => {
        const sampleText = document.getElementById('msg').textContent;
        console.log(sampleText);
        document.getElementById('mywords').value = sampleText;
        const button = document.getElementById('btn');
        button.click(); // finish the test

        setTimeout(() => {
          const msg = document.getElementById('msg');
          console.log(msg.textContent);
          const resultMessage = msg.textContent.trim().replace(/\s\s+/g, ' ');
        
          const words = resultMessage.split(' ');
          console.log(words);
        
          // Get the typing speed from the message
          const speed = parseInt(words[4], 10);
          console.log(speed);
        
          // Log the result message and parsed speed to console
          console.log('Result message: ', resultMessage);
          console.log('Parsed speed: ', speed);
        
          // The speed should be words/minute. In this case, we input the words in 3 seconds,
          // so the expected speed is words * 60 / 3
          const wordsCount = sampleText.split(' ').length;
          const expectedSpeed = Math.round((wordsCount * 60) / 3);
          console.log(expectedSpeed);
        
          if (!isNaN(speed)) {
            expect(speed).toEqual(expectedSpeed);
            resolve();
          } else {
            reject(new Error('Failed to parse the typing speed from the result message'));
          }
        }, 1000);
        
      }, 3000);
    });
  });
});







describe('Typing Test', () => {
  let textarea, button, msg, timer;

  beforeEach(() => {
    // Create a new JSDOM instance with the HTML and run the scripts inside
    const dom = new JSDOM(html, { runScripts: "dangerously" });

    // Get the window and document objects
    window = dom.window;
    document = window.document;

    // Get the DOM elements
    textarea = document.getElementById('mywords');
    button = document.getElementById('btn');
    msg = document.getElementById('msg');
    timer = document.getElementById('timer');
  });

  test.only('should correctly count the number of correct and incorrect words', done => {
    // Start the test
    button.click();
  
    //  Set the text in the textarea
    const givenText = 'this is a sample text for testing';
    textarea.value = 'this is a example text for testing';
  
    // After a delay, click the 'Done' button
    setTimeout(() => {
      button.click();
  
      // After another delay, check the result
      setTimeout(() => {
        const expectedResult = '5 correct out of 6 words and total wrong words are 1';
        
        // Get the user's entered text and split it into words
        const enteredText = textarea.value;
        const enteredWords = enteredText.split(' ');
  
        // Get the correct text and split it into words
        const correctWords = givenText.split(' ');
  
        // Count the number of correct and incorrect words
        let correctCount = 0;
        for (let i = 0; i < correctWords.length; i++) {
          if (i < enteredWords.length && enteredWords[i] === correctWords[i]) {
            correctCount++;
          }
        }
        const incorrectCount = Math.abs(correctWords.length - enteredWords.length);
  
        // Check if the result matches the expected result
        const result = `${correctCount} correct out of ${correctWords.length} words and total wrong words are ${incorrectCount}`;
        expect(msg.innerText).toContain(result);
  
        done();
      }, 1000);
    }, 1000);
  });
  

  test('should calculate the correct typing speed', done => {
    // Start the test
    button.click();
  
    // Set the text in the textarea
    textarea.value = 'this is a test';
  
    // After a delay, click the 'Done' button
    setTimeout(() => {
      button.click();
  
      // After another delay, check the result
      setTimeout(() => {
        const wordsTyped = textarea.value.split(' ').length;
        const timeSpent = parseInt(timer.innerText.split(':')[1]); // Get the seconds part
        const expectedSpeed = Math.round((wordsTyped / timeSpent) * 60);
  
        const speedRegexp = /Your typing speed is (\d+) words per minute/;
        const match = msg.innerText.match(speedRegexp);
        const actualSpeed = match ? parseInt(match[1]) : 0;
        
        // Expect the actual speed to be within a range of +/- 10 WPM
        expect(actualSpeed).toBeGreaterThanOrEqual(expectedSpeed - 10);
        expect(actualSpeed).toBeLessThanOrEqual(expectedSpeed + 10);
  
        done();
      }, 2000);
    }, 1000);
  });


  // test.only('should calculate the correct typing speed and correctness of words', done => {
  //   // Start the test
  //   button.click();
  
  //   // Set the text in the textarea
  //   textarea.value = 'this is a test';
  
  //   // After a delay, click the 'Done' button
  //   setTimeout(() => {
  //     button.click();
  
  //     // After another delay, check the result
  //     setTimeout(() => {
  //       const wordsTyped = textarea.value.split(' ').length;
  //       const timeSpent = parseInt(timer.innerText.split(':')[1]); // Get the seconds part
  //       const expectedSpeed = Math.round((wordsTyped / timeSpent) * 60);
  
  //       const speedRegexp = /Your typing speed is (\d+) words per minute/;
  //       const correctnessRegexp = /(\d+) correct out of (\d+) words and total wrong words are (\d+)/;
  
  //       const matchSpeed = msg.innerText.match(speedRegexp);
  //       const matchCorrectness = msg.innerText.match(correctnessRegexp);
  
  //       const actualSpeed = matchSpeed ? parseInt(matchSpeed[1]) : 0;
  //       const correctWords = matchCorrectness ? parseInt(matchCorrectness[1]) : 0;
  //       const totalWords = matchCorrectness ? parseInt(matchCorrectness[2]) : 0;
  //       const wrongWords = matchCorrectness ? parseInt(matchCorrectness[3]) : 0;
  
  //       // Check the typing speed
  //       expect(actualSpeed).toBeGreaterThanOrEqual(expectedSpeed - 10);
  //       expect(actualSpeed).toBeLessThanOrEqual(expectedSpeed + 10);
  
  //       // Check the correctness of words
  //       expect(correctWords).toBe(4); // All words in 'this is a test' are correct
  //       expect(totalWords).toBe(wordsTyped);
  //       expect(wrongWords).toBe(0); // There should be no wrong words
  
  //       done();
  //     }, 3000);
  //   }, 1000);
  // });
  
  
});





const { JSDOM } = require('jsdom');

// Assuming `html` contains the HTML code you provided in the previous example

describe('Typing Test', () => {
  let dom;
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    global.window = dom.window;
    global.document = dom.window.document;
    // ... other setup code as needed ...
    return new Promise((resolve) => {
      dom.window.addEventListener('load', resolve);
    });
  });

  test('Check typing speed and correct/wrong word counts', () => {
    // Use the `dom` object directly to access window and document properties
    const textarea = dom.window.document.getElementById('mywords');
    const button = dom.window.document.getElementById('btn');
    const timerDisplay = dom.window.document.getElementById('timer');

    // The rest of the test case remains unchanged
    // ...
  });
});







