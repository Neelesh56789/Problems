require('text-encoding').TextEncoder;
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let document;
let window;

describe("Notes app", () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
        document = dom.window.document;
        window = dom.window;
    });

    // Test 1: Adding New Notes
    it("should add a new note when 'Add note' button is clicked", () => {
        const addBtn = document.getElementById("add");
        addBtn.click();
        const notes = document.querySelectorAll('.note');
        expect(notes.length).toBe(1);
    });

    // Test 2: Editing a Note
    it("should show textarea and hide the main div in edit mode", () => {
        const addBtn = document.getElementById("add");
        addBtn.click();
        const editBtn = document.querySelector(".edit");
        const textArea = document.querySelector("textarea");
        const main = document.querySelector(".main");
        expect(textArea).not.toHaveClass("hidden");
        expect(main).toHaveClass("hidden");
        editBtn.click();
        expect(textArea).toHaveClass("hidden");
        expect(main).not.toHaveClass("hidden");
    });

    // Test 3: Deleting a Note
    it("should delete a note when the delete button is clicked", () => {
        const addBtn = document.getElementById("add");
        addBtn.click();
        const deleteBtn = document.querySelector(".delete");
        deleteBtn.click();
        const notes = document.querySelectorAll('.note');
        expect(notes.length).toBe(0);
    });

    // Test 4: Ensuring Marked.js Integration (simplified without checking actual markdown)
    it("should populate textarea for a new note", () => {
        const addBtn = document.getElementById("add");
        addBtn.click();
        const textArea = document.querySelector("textarea");
        expect(textArea.value).toBe("");
    });
});

