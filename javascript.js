document.getElementById('searchBtn').addEventListener('click', function() {
    const word = document.getElementById('wordInput').value.trim();
    const resultDiv = document.getElementById('result');
    if (!word) {
        resultDiv.textContent = 'Please enter a word.';
        return;
    }

    // Example API: https://api.dictionaryapi.dev/api/v2/entries/en/<word>
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(data => {
            if (data.title === "No Definitions Found") {
                resultDiv.textContent = "No definition found for this word.";
            } else {
                const meanings = data[0].meanings.map(m => 
                    `<strong>${m.partOfSpeech}:</strong> ${m.definitions[0].definition}`
                ).join('<br>');
                resultDiv.innerHTML = `<strong>${data[0].word}</strong><br>${meanings}`;
            }
        })
        .catch(() => {
            resultDiv.textContent = "Error fetching definition.";
        });
});