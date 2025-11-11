let mobs = [];
let mob = {};
const boxKeys = ['name', 'release', 'health', 'height', 'behavior', 'speed', 'attackDamage', 'ranged', 'flying'];

// Load mobs from JSON
fetch('mobs.json')
  .then(response => response.json())
  .then(data => {
    mobs = data;
    StartGame(); // Start after loading
  })
  .catch(err => console.error('Failed to load mobs:', err));

function StartGame() {
    if (!mobs.length) return;
    mob = mobs[Math.floor(Math.random() * mobs.length)];
    console.log('New mob selected (hidden):', mob.name);
}

function CheckInput() {
    const input = document.querySelector('#mobInput').value.toLowerCase();
    const guessedMob = mobs.find(m => m.name.toLowerCase() === input);

    if (!guessedMob) {
        console.log('This mob does not exist!');
        return;
    }

    // Create new guess row
    const row = document.createElement('div');
    row.classList.add('boxes');

    boxKeys.forEach(key => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.innerHTML = `
            <div class="label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
            <div class="value">${guessedMob[key]}</div>
        `;

        // Highlight green if matches current mob
        if (mob[key] === guessedMob[key]) {
            box.querySelector('.value').classList.add('green');
        }

        row.appendChild(box);
    });

    document.querySelector('#guesses-container').appendChild(row);

    // Check if correct
    if (input === mob.name.toLowerCase()) {
        alert('You guessed it right! It is ' + mob.name);
        StartGame();
    }

    document.querySelector('#mobInput').value = '';
    document.querySelector('#suggestions').innerHTML = '';
}

// Autocomplete suggestions
function showSuggestions() {
    const input = document.querySelector('#mobInput').value.toLowerCase();
    const suggestions = document.querySelector('#suggestions');
    suggestions.innerHTML = '';

    const filteredMobs = input
        ? mobs.filter(m => m.name.toLowerCase().startsWith(input))
        : mobs; // show all if empty

    filteredMobs.forEach(m => {
        const div = document.createElement('div');
        div.textContent = m.name;
        div.onclick = () => {
            document.querySelector('#mobInput').value = m.name;
            suggestions.innerHTML = '';
        };
        suggestions.appendChild(div);
    });
}

// Hide suggestions if clicking outside
document.addEventListener('click', function (e) {
    const suggestions = document.querySelector('#suggestions');
    const input = document.querySelector('#mobInput');
    if (e.target !== input) {
        suggestions.innerHTML = '';
    }
});
// Trigger GitHub Pages redeploy
