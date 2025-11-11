const mobs = [
    { 'name': 'creeper', 'release': 'Pre-Alpha', 'health': '20', 'height': '1.7', 'behavior': 'Hostile'},
    { 'name': 'zombie', 'release': 'Pre-Alpha', 'health': '20', 'height': '1.95', 'behavior': 'Hostile'},
    { 'name': 'skeleton', 'release': 'Pre-Alpha', 'health': '20', 'height': '1.99', 'behavior': 'Hostile'},
    { 'name': 'spider', 'release': 'Pre-Alpha', 'health': '16', 'height': '0.9', 'behavior': 'Neutral'},
    { 'name': 'enderman', 'release': 'Beta', 'health': '40', 'height': '2.9', 'behavior': 'Neutral'},
    { 'name': 'slime', 'release': 'Alpha', 'health': '16', 'height': '1.0', 'behavior': 'Hostile'},
    { 'name': 'witch', 'release': 'Beta', 'health': '26', 'height': '1.95', 'behavior': 'Hostile'},
    { 'name': 'pig', 'release': 'Alpha', 'health': '10', 'height': '0.9', 'behavior': 'Passive'},
    { 'name': 'cow', 'release': 'Alpha', 'health': '10', 'height': '1.4', 'behavior': 'Passive'},
    { 'name': 'sheep', 'release': 'Alpha', 'health': '8', 'height': '1.3', 'behavior': 'Passive'},
    { 'name': 'chicken', 'release': 'Alpha', 'health': '4', 'height': '0.7', 'behavior': 'Passive'},
    { 'name': 'wolf', 'release': 'Beta', 'health': '20', 'height': '0.85', 'behavior': 'Neutral'},
    { 'name': 'ocelot', 'release': 'Beta', 'health': '10', 'height': '0.7', 'behavior': 'Passive'},
    { 'name': 'iron_golem', 'release': 'Beta', 'health': '100', 'height': '2.7', 'behavior': 'Neutral'},
    { 'name': 'snow_golem', 'release': 'Beta', 'health': '4', 'height': '1.9', 'behavior': 'Neutral'},
    { 'name': 'villager', 'release': 'Alpha', 'health': '20', 'height': '1.8', 'behavior': 'Passive'},
    { 'name': 'guardian', 'release': 'Beta', 'health': '30', 'height': '1.85', 'behavior': 'Hostile'},
    { 'name': 'elder_guardian', 'release': 'Beta', 'health': '80', 'height': '2.7', 'behavior': 'Hostile'},
    { 'name': 'blaze', 'release': 'Beta', 'health': '20', 'height': '1.8', 'behavior': 'Hostile'},
    { 'name': 'ghast', 'release': 'Beta', 'health': '10', 'height': '4.0', 'behavior': 'Hostile'},
    { 'name': 'magma_cube', 'release': 'Beta', 'health': '16', 'height': '1.0', 'behavior': 'Hostile'},
    { 'name': 'bat', 'release': 'Beta', 'health': '6', 'height': '0.5', 'behavior': 'Passive'}
];

let mob = {};

function StartGame() {
    mob = mobs[Math.floor(Math.random() * mobs.length)];
    console.log('New mob selected (hidden):', mob.name);
}

function CheckInput() {
    const input = document.querySelector('#mobInput').value.toLowerCase();
    const guessedMob = mobs.find(m => m.name === input);
    if (!guessedMob) {
        console.log('This mob does not exist!');
        return;
    }

    const boxKeys = ['release', 'health', 'height', 'behavior'];

    // Fill boxes with guessed mob values
    boxKeys.forEach((key, index) => {
        const boxValue = document.querySelector(`.box-${index + 1} .value`);
        boxValue.innerHTML = guessedMob[key];
        boxValue.classList.remove('green');
    });

    // Check if correct
    if (input === mob.name) {
        alert('You guessed it right! It is ' + mob.name);
        StartGame();
        return;
    }

    // Highlight matching properties
    boxKeys.forEach((key, index) => {
        if (mob[key] === guessedMob[key]) {
            console.log(`Property "${key}" matches: ${mob[key]}`);
            const boxValue = document.querySelector(`.box-${index + 1} .value`);
            if (boxValue) boxValue.classList.add('green');
        }
    });
}

// Autocomplete suggestions
function showSuggestions() {
    const input = document.querySelector('#mobInput').value.toLowerCase();
    const suggestions = document.querySelector('#suggestions');
    suggestions.innerHTML = '';

    const filteredMobs = input 
        ? mobs.filter(m => m.name.startsWith(input)) 
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

// Start first game
StartGame();
