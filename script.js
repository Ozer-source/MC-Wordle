const creeper = { 'name': 'creeper', 'release': 'Pre-Alpha', 'health': '20', 'height': '1.7', 'behavior': 'Hostile'};
const zombie = { 'name': 'zombie', 'release': 'Pre-Alpha', 'health': '20', 'height': '1.95', 'behavior': 'Hostile'};
const mobs = [creeper, zombie];
let mob = {};

function StartGame() {
    mob = mobs[Math.floor(Math.random() * mobs.length)];
    console.log('New mob selected (hidden):', mob.name);
}

function CheckInput() {
    const input = document.querySelector('#mobInput').value.toLowerCase();

    if (input === 'creeper') {
        for (let i = 0; i < 4; i++) {
            const box = document.querySelector('.box-' + (i + 1));
            box.innerHTML = Object.values(mobs[0])[i + 1]; // skip name
            box.classList.remove('green');
        }
    } else if (input === 'zombie') {
        for (let i = 0; i < 4; i++) {
            const box = document.querySelector('.box-' + (i + 1));
            box.innerHTML = Object.values(mobs[1])[i + 1];
            box.classList.remove('green');
        }
    }

    const guessedMob = mobs.find(m => m.name === input);
    if (!guessedMob) {
        console.log('This mob does not exist!');
        return;
    }

    if (input === mob.name) {
        alert('You guessed it right! It is ' + mob.name);
        mob = {};
        StartGame();
        return;
    }

    for (let key in mob) {
        if (key !== 'name' && mob[key] === guessedMob[key]) {
            console.log(`Property "${key}" matches: ${mob[key]}`);
            const box = document.querySelector('.' + key);
            if (box) box.classList.add('green');
        }
    }
}

function showSuggestions() {
    const input = document.querySelector('#mobInput').value.toLowerCase();
    const suggestions = document.querySelector('#suggestions');
    suggestions.innerHTML = '';
    if (!input) return;

    mobs.forEach(m => {
        if (m.name.startsWith(input)) {
            const div = document.createElement('div');
            div.textContent = m.name;
            div.onclick = () => {
                document.querySelector('#mobInput').value = m.name;
                suggestions.innerHTML = '';
            };
            suggestions.appendChild(div);
        }
    });
}

StartGame();
