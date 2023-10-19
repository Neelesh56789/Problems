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

  test.only('Random Text is Generated or Not?', async(done)=>{
    const button = document.getElementById('btn');
    const msg = document.getElementById('msg');
    const initial = " ";
    console.log(initial);
    setTimeout(()=>{
      button.click();
      const msg = document.getElementById('msg');
      const final = msg.textContent;
      console.log(final);
      expect(final).not.toEqual(initial);
      done();
    },1000)
  })
});

describe ('Start button is converted into Done button after clicking', ()=>{
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  });
  test('Start button is converted', async(done)=>{
    const button = document.getElementById('btn');
    const btn1 = button.textContent;
    console.log(btn1);
    setTimeout(()=>{
      button.click();
      const btn2 = button.textContent;
      console.log(btn2);
      expect(btn1).not.toBe(btn2);
      done();
    }, 1000)
    

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
      }, 1000)
    }, 1000)
    

  })
})

