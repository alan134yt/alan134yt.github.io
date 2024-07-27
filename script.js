

function loadCSV() {
    fetch('https://alan134yt.github.io/ideas.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n');
            rows.forEach((row, index) => {
                if (index === 0) return; // Skip header row
                const columns = row.split(',');
                if (columns.length >= 3) { // Ensure there are at least 3 columns
                    const idea = columns[1].trim();
                    const show = columns[2].trim().toLowerCase() === 'true'; // Convert to boolean
                    //console.log('Idea:', idea, 'Show:', show);
                } else {
                    console.error('Invalid row format:', row);
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar el archivo CSV:', error);
        });
}

loadCSV();
