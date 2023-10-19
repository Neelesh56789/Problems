let currentSortColumn = null;
let currentSortDirection = 1; // 1 for ascending, -1 for descending

function sortTable(column) {
    const table = document.getElementById("dataTable");
    const rows = Array.from(table.tBodies[0].rows);
    const isNumeric = table.tHead.rows[0].cells[column].getAttribute('data-type') === "number";

    // Toggle the sort direction if the column is clicked again
    if (currentSortColumn === column) {
        currentSortDirection *= -1;
    } else {
        currentSortDirection = 1;
    }
    currentSortColumn = column;

    rows.sort((a, b) => {
        const cellA = isNumeric ? Number(a.cells[column].textContent) : a.cells[column].textContent;
        const cellB = isNumeric ? Number(b.cells[column].textContent) : b.cells[column].textContent;

        return currentSortDirection * (cellA < cellB ? -1 : (cellA > cellB ? 1 : 0));
    });

    for (let row of rows) {
        table.tBodies[0].appendChild(row);
    }
}

// For Pagination:
let currentPage = 1;
const rowsPerPage = 10; // Adjust as required

function displayPage(page) {
    const table = document.getElementById("dataTable");
    const rows = table.tBodies[0].rows;
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = (i >= startIndex && i < endIndex) ? "" : "none";
    }
}

function nextPage() {
    currentPage++;
    displayPage(currentPage);
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
    }
}

// Initial setup
displayPage(currentPage);
