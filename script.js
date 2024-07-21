document.addEventListener('DOMContentLoaded', function () {
    fetch('ideas.csv')
        .then(response => response.text())
        .then(data => {
            const ideasList = document.getElementById('ideas-list');
            const lines = data.split('\n');
            for (let i = 1; i < lines.length; i++) {
                const [number,idea, show] = lines[i].split(',');
                if (show.trim() === 'true') {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${number}: ${idea}`;
                    ideasList.appendChild(listItem);
                }
            }
        })
        .catch(error => console.error('Error al cargar el archivo CSV:', error));
});
