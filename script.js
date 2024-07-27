// URL of the CSV file
const csvUrl = 'https://alan134yt.github.io/ideas.csv';

// Function to fetch and parse the CSV file
async function fetchAndDisplayIdeas() {
    try {
        const response = await fetch(csvUrl);
        const csvData = await response.text();

        const ideas = parseCsv(csvData);

        displayIdeas(ideas);
    } catch (error) {
        console.error('Error fetching or processing the CSV file:', error);
    }
}

// Function to parse the CSV data into an array of objects
function parseCsv(data) {
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',');

    return lines.slice(1).map(line => {
        const values = line.split(',');
        const ideaObject = {};

        headers.forEach((header, index) => {
            ideaObject[header.trim()] = values[index].trim();
        });

        return ideaObject;
    }).filter(idea => idea.show.toLowerCase() === 'true');
}

// Function to display the filtered ideas on the page
function displayIdeas(ideas) {
    const tableBody = document.querySelector('#ideasTable tbody');

    ideas.forEach(idea => {
        const row = document.createElement('tr');
        
        const numberCell = document.createElement('td');
        numberCell.textContent = idea.number;
        row.appendChild(numberCell);

        const ideaCell = document.createElement('td');
        ideaCell.textContent = idea.idea;
        row.appendChild(ideaCell);

        tableBody.appendChild(row);
    });
}

// Initialize the fetching and displaying process
fetchAndDisplayIdeas();
