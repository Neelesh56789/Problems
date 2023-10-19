require('text-encoding').TextEncoder;
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let window;
let document;

describe("Interactive resume tests", () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: "dangerously" });
        window = dom.window;
        document = dom.window.document;
    });

    test('expands and collapses the info section upon click', () => {
        const infoElement = document.getElementById('info1');
        expect(infoElement.style.maxHeight).toBe('');
        window.toggleInfo('info1');
        expect(infoElement.style.maxHeight).not.toBe('');
        window.toggleInfo('info1');
        expect(infoElement.style.maxHeight).toBe('');
    });
});
