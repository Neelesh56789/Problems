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

  test.only("Clicking the button should generate a random quote", async (done) => {
    // Mock the initial text content for the quote element
    document.getElementById("quote").textContent =
      "Click the button below to get a random quote!";

    // Get the initial quote before clicking the button
    const initialQuote = document.getElementById("quote").textContent;
    console.log(initialQuote);
    expect(initialQuote).not.toBe(" ");
    // Get the button element
    const button = document.getElementById("quoteButton");

    // Click the button
    button.click();

    // Wait for the quote to update
    setTimeout(() => {
      const button1 = document.getElementById('quoteButton');
      button1.click();
      const previousQuote = document.getElementById('quote').textContent;
      const updatedQuote = document.getElementById("quote").textContent;
      console.log(updatedQuote);

      // Check if the quote has changed after clicking the button
      expect(updatedQuote).not.toBe(previousQuote);
    });

    done();
  });
  

  // test("Refreshing the page should generate a random quote", () => {
  //   // Mock the initial text content for the quote element
  //   document.getElementById("quote").textContent =
  //     "Click the button below to get a random quote!";

  //   // Get the initial quote before refreshing the page
  //   const initialQuote = document.getElementById("quote").textContent;

  //   // Refresh the page by reassigning the JSDOM object
  //   dom = new JSDOM(html, { runScripts: "dangerously" });
  //   document = dom.window.document;

  //   // Get the random quote after refreshing the page
  //   const updatedQuote = document.getElementById("quote").textContent;

  //   // Check if the quote has changed after refreshing the page
  //   expect(updatedQuote).not.toBe(initialQuote);
  // });



});
