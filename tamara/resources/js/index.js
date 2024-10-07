document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const sections = document.querySelectorAll('section');
    const messageBox = document.getElementById('message-box');

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        let foundResults = false;

        sections.forEach(section => {
            const text = section.textContent;
            const highlightedText = highlightSearchTerm(text, searchTerm);

            if (highlightedText !== text) {
                section.style.display = 'block';
                section.innerHTML = highlightedText;
                foundResults = true;
            } else {
                section.style.display = 'none';
            }
        });

        if (!foundResults) {
            messageBox.textContent = 'No se encontraron resultados para la búsqueda.';
            messageBox.style.display = 'block';
        } else {
            messageBox.style.display = 'none';
        }
    }

    function highlightSearchTerm(text, searchTerm) {
        if (searchTerm.trim() === '') return text;
        const regex = new RegExp(searchTerm, 'gi');
        return text.replace(regex, match => `<span class="highlight">${match}</span>`);
    }
});