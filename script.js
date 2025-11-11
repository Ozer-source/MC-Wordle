let mobs = [];
let mob = {};

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

    const boxKeys = ['release', 'health', 'height', 'behavior', 'speed', 'attackDamage', 'xp', 'ranged',  'flying'];

    // Fill boxes with guessed mob values
    boxKeys.forEach((key, index) => {
        const box = document.querySelector(`.box-${index + 1} .value`);
        if (box) {
            box.innerHTML = guessedMob[key];
            box.classList.remove('green');
        }
    });

    // Check if correct
    if (input === mob.name.toLowerCase()) {
        alert('You guessed it right! It is ' + mob.name);
        StartGame();
        return;
    }

    // Highlight matching properties
    boxKeys.forEach((key, index) => {
        const box = document.querySelector(`.box-${index + 1} .value`);
        if (box && mob[key] === guessedMob[key]) {
            console.log(`Property "${key}" matches: ${mob[key]}`);
            box.classList.add('green');
        }
    });
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
document.addEventListener('click', function(e) {
    const suggestions = document.querySelector('#suggestions');
    const input = document.querySelector('#mobInput');
    if (e.target !== input) {
        suggestions.innerHTML = '';
    }
});
