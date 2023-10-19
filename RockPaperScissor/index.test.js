// require('text-encoding').TextEncoder;
// import "@testing-library/jest-dom/extend-expect";
// import { JSDOM } from "jsdom";
// import fs from "fs";
// import path from "path";

// const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

// let dom;
// let container;
// let window;

// describe('Rock Paper Scissors Game', () => {


//   beforeEach(() => {
//     dom = new JSDOM(html, { runScripts: 'dangerously' });
//     window = dom.window;
//     container = dom.window.document;
//   });

//   test('Computer function returns a valid choice', () => {
//     const computerChoice = window.Computer();
//     expect(['rock', 'paper', 'scissor']).toContain(computerChoice);
//   });

//   test('Play function updates score and returns the correct result when user wins', () => {
//     const result = window.Play('rock', 'scissor');
//     expect(result).toBe("You have Won the game");
//     expect(window.userScore).toBe(1);
//   });


//   test('Play function updates score and returns the correct result when user loses', () => {
//     const result = window.Play('rock', 'paper');
//     expect(result).toBe("You have lost the game");
//     expect(window.computerScore).toBe(1);
//   });

//   test('Play function does not update score and returns the correct result when game is tied', () => {
//     const result = window.Play('rock', 'rock');
//     expect(result).toBe("The Game has been tied");
//     expect(window.userScore).toBe(0);
//     expect(window.computerScore).toBe(0);
//   });
// });

// let Play;
// describe('Play function with mocked Computer function', () => {
//   // const originalComputer = window.Computer;

//   beforeEach(()=>{
//     dom = new JSDOM(html, { runScripts: 'dangerously' });
//     window = dom.window;
//     container = dom.window.document;
//     Play = window.Play;

//   })


//   test.each([
//     ['rock', 'rock', "The Game has been tied"],
//     ['rock', 'scissor', "You have Won the game"],
//     ['rock', 'paper', "You have lost the game"],
//     ['paper', 'rock', "You have Won the game"],
//     ['paper', 'scissor', "You have lost the game"],
//     ['paper', 'paper', "The Game has been tied"],
//     ['scissor', 'rock', "You have lost the game"],
//     ['scissor', 'paper', "You have Won the game"],
//     ['scissor', 'scissor', "The Game has been tied"],
//   ])('returns correct result for userChoice %s and computerChoice %s', (userChoice, computerChoice, expectedResult) => {
//     window.Computer = jest.fn().mockReturnValue(computerChoice);
//     const result = Play(userChoice, computerChoice);
//     expect(result).toBe(expectedResult);
//   });
// });




require('text-encoding').TextEncoder;
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let document;
let window;

describe("The title tag is added correctly", () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  });

  test("check whether timer is working fine or not?",async(done)=>{
    const clock = document.getElementById('clock');
    // const date1 = new Date();
    // clock.innerHTML = date1.toLocaleTimeString();

    const previousTime = clock.innerHTML;
    console.log(previousTime);
    setInterval(()=>{
      // const date = new Date()
      // clock.innerHTML = date.toLocaleTimeString();
      const clock = document.getElementById('clock');
      const finalTime = clock.innerHTML;
      console.log(finalTime);
      expect(finalTime).not.toEqual(previousTime);
      done();
      

    }, 1000)
  })
});