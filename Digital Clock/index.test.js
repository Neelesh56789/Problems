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