require('text-encoding').TextEncoder;
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let document;
let window;

describe("Table Sorter Functionality", () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: "dangerously" });
        document = dom.window.document;
        window = dom.window;
    });

    // Test for initial setup
    test("initially displays the first 10 rows", () => {
        const displayedRows = [...document.querySelectorAll('#dataTable tbody tr')].filter(row => window.getComputedStyle(row).display !== 'none');
        expect(displayedRows.length).toBe(10);
    });

    // Tests for sorting functionality
    test("sorts table by Name (string)", () => {
        const nameHeader = document.querySelector('#dataTable th[data-type="string"]');
        nameHeader.click();
        const firstRowName = document.querySelector('#dataTable tbody tr:first-child td:nth-child(1)').textContent;
        // Based on the provided data, "Aditya" should be first when sorted alphabetically
        expect(firstRowName).toBe("Aditya");
    });

    test("sorts table by Age (number)", () => {
        const ageHeader = document.querySelector('#dataTable th[data-type="number"]');
        ageHeader.click();
        const firstRowAge = Number(document.querySelector('#dataTable tbody tr:first-child td:nth-child(2)').textContent);
        // The youngest age, 20, should be at the top
        expect(firstRowAge).toBe(20);
    });

    test("sorts table by Correctness (boolean), placing false values first", () => {
      const correctnessHeader = document.querySelector('#dataTable th[data-type="boolean"]');
      correctnessHeader.click();
      const firstRowCorrectness = document.querySelector('#dataTable tbody tr:first-child td:nth-child(3)').textContent;
      expect(firstRowCorrectness).toBe("false");
  });
  

    // Tests for pagination
    test("navigates to the next page using the Next button", () => {
        const nextPageButton = document.querySelector('#pagination button:nth-child(2)');
        nextPageButton.click();
        const displayedRows = [...document.querySelectorAll('#dataTable tbody tr')].filter(row => window.getComputedStyle(row).display !== 'none');
        // Only one row on the second page
        expect(displayedRows.length).toBe(1);
    });

    test("navigates to the previous page using the Previous button", () => {
        const prevPageButton = document.querySelector('#pagination button:nth-child(1)');
        const nextPageButton = document.querySelector('#pagination button:nth-child(2)');
        
        nextPageButton.click(); // First go to the next page
        prevPageButton.click(); // Then go back to the previous page

        const displayedRows = [...document.querySelectorAll('#dataTable tbody tr')].filter(row => window.getComputedStyle(row).display !== 'none');
        // Ten rows should be displayed on the first page
        expect(displayedRows.length).toBe(10);
    });

    // Ensure Previous button doesn't go beyond the first page
    test("stays on the first page if Previous button is clicked on the first page", () => {
        const prevPageButton = document.querySelector('#pagination button:nth-child(1)');
        
        prevPageButton.click();

        const displayedRows = [...document.querySelectorAll('#dataTable tbody tr')].filter(row => window.getComputedStyle(row).display !== 'none');
        // Ten rows should still be displayed on the first page
        expect(displayedRows.length).toBe(10);
    });
});
