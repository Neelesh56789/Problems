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

  // Single Title Tag Present
  test("Single Title Tag Present", () => {
    const titleTag = document.querySelectorAll("title");
    expect(titleTag).toHaveLength(1);
  });
 // Title Tag Present in the head tag
  test("The Title Tag present in Head Tag", () => {
    const headTag = document.querySelector("title").parentElement.nodeName;
    expect(headTag).toBe("HEAD");
  });
  // Title Present in title tag or not
  test("The title is present as - Best Coding Practices", () => {
    const headTag = document.querySelector("head > title").innerHTML;
    expect(headTag.trim()).toBe("Best Coding Practices");
  });
});