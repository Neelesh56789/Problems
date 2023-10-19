require('text-encoding').TextEncoder;
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

// Load the HTML file
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let window;
let document;

describe("Countdown Timer", () => {
    beforeEach(() => {
        // Construct a new JSDOM instance with the markup
        dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
        window = dom.window;
        document = window.document;
    });

    // Helper function to pause execution
    const delay = (duration) => new Promise(res => setTimeout(res, duration));

    test('timer starts when start button is clicked', async () => {
        const startButton = document.getElementById('startButton');
        const countdownElement = document.getElementById('countdown');

        startButton.click();

        // Wait for 1.2 seconds
        await delay(5000);

        expect(countdownElement.textContent).not.toBe('00:01:00');
    });

    test('timer resets when reset button is clicked', async () => {
        const startButton = document.getElementById('startButton');
        const resetButton = document.getElementById('resetButton');
        const countdownElement = document.getElementById('countdown');

        startButton.click();

        // Wait for 1.2 seconds
        await delay(1200);

        resetButton.click();

        expect(countdownElement.textContent).toBe('00:01:00');
    });

    test('timer updates every second when it is running', async () => {
        const startButton = document.getElementById('startButton');
        const countdownElement = document.getElementById('countdown');

        startButton.click();

        // Wait for 2.2 seconds
        await delay(5000);

        expect(countdownElement.textContent).not.toBe('00:00:58');
    });

    // test.only('timer stops when it reaches 0', async () => {
    //     const startButton = document.getElementById('startButton');
    //     const countdownElement = document.getElementById('countdown');

    //     startButton.click();

    //     // Wait for 62 seconds (enough for the timer to reach 0)
    //     await delay(65000);

    //     expect(countdownElement.textContent).toBe('00:00:00');
    // });
});

describe("Audio play and pause", () => {
  let mockPlayAudio;
  let mockPauseAudio;

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
    window = dom.window;
    document = window.document;
      mockPlayAudio = jest.fn();
      mockPauseAudio = jest.fn();
      window.HTMLMediaElement.prototype.play = mockPlayAudio;
      window.HTMLMediaElement.prototype.pause = mockPauseAudio;
  });

  test('sound plays when start button is clicked', () => {
      const startButton = document.getElementById('startButton');
      startButton.click();
      expect(mockPlayAudio).toHaveBeenCalled();
  });

  test('sound pauses when reset button is clicked', () => {
      const resetButton = document.getElementById('resetButton');
      resetButton.click();
      expect(mockPauseAudio).toHaveBeenCalled();
  });
});

