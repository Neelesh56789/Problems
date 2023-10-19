require('text-encoding').TextEncoder;
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

describe("Check all javascript is running fine or not?", () => {
let dom;
let document;
let window;
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  });
  test("Check whether alert is working fine or not", async(done)=>{
    const button = document.getElementById('btn');
    const mockAlert = jest.fn();
    window.alert = mockAlert;
    button.click();
    setTimeout(()=>{
      expect(mockAlert).toHaveBeenCalledWith('Please enter your birthdate');
      done();
    })
  })
//   test.only('Check age calculation', (done) => {
//     const button = document.getElementById('btn');
//     const birthdayInput = document.getElementById('birthday');
//     const result = document.getElementById('result');
//     // button.click();
//     // Provide a fixed date for the test
//     const fixedDate = new Date('1990-01-01');
//     birthdayInput.value = fixedDate.toISOString().substring(0, 10);
    

//     // Calculate the expected age
//     const currentDate = new Date();
//     const expectedAge = currentDate.getFullYear() - fixedDate.getFullYear();

//     button.click();

//     setTimeout(() => {
//       const result = document.getElementById('result');
//       console.log(result.textContent);
//         expect(result.textContent).toBe(`You are ${expectedAge} ${expectedAge > 1 ? "years" : "year"} old`);
//         done();
//     },4000);
// });
test.only('Check age calculation', (done) => {
  jest.useFakeTimers();
  const button = document.getElementById('btn');
  const birthdayInput = document.getElementById('birthday');
  const result = document.getElementById('result');

  const fixedDate = new Date('1990-01-01');
  birthdayInput.valueAsDate = fixedDate;

  const currentDate = new Date();
  const expectedAge = currentDate.getFullYear() - fixedDate.getFullYear();

  button.click();

  // use setTimeout to delay the check, use the time same as your function delay or longer
  setTimeout(() => {
    // Now run all timers
    jest.runAllTimers();
    expect(result.textContent).toBe(`You are ${expectedAge} ${expectedAge > 1 ? "years" : "year"} old`);
    done();
  }, 1000); // Change this time according to your need
}, 1000);



});





