function loadCSV() {
    fetch('https://alan134yt.github.io/ideas.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n');
            const ideaList = document.getElementById('idea-list'); // Get the list element from the DOM

            rows.forEach((row, index) => {
                if (index === 0 || row.trim() === '') return; // Skip header and empty lines
                const columns = row.split(',');

                if (columns.length >= 3) {
                    const idea = columns[1].trim();
                    const show = columns[2].trim().toLowerCase() === 'true';

                    // Only add to list if 'show' is true
                    if (show) {
                        const listItem = document.createElement('li'); // Create a new list item
                        listItem.textContent = idea; // Set the text content to the idea
                        ideaList.appendChild(listItem); // Add the list item to the list
                    }
                } else {
                    console.error('Invalid row format:', row);
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar el archivo CSV:', error);
        });
}

document.addEventListener('DOMContentLoaded', loadCSV); // Ensure the DOM is loaded before running the script
