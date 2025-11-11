creeper = { 'name': 'creeper', 'release': 'Pre-Alpha', 'health': '20', 'height': '1.7', 'behavior': 'Hostile'};
zombie = { 'name': 'zombie', 'release': 'Pre-Alpha', 'health': '20', 'height': '1.95', 'behavior': 'Hostile'};

mobs = [creeper, zombie];
mob = {};
function StartGame() {
    mob = mobs[Math.floor(Math.random() * mobs.length)];
    console.log(mob.name);
}


function CheckInput() {
    let input = document.querySelector('input').value;
    input = input.toLowerCase();
    if (input == 'creeper') {
        for (let i = 0; i < 4; i++) {
            document.querySelector('.box-' + (i + 1)).innerHTML = Object.values(mobs[0])[i];
        }
    }
    else if (input == 'zombie') {
        for (let i = 0; i < 4; i++) {
            document.querySelector('.box-' + (i + 1)).innerHTML = Object.values(mobs[1])[i];
        }
    }


    if (input == mob.name) {
        alert('You guessed it right! It is ' + mob.name);
        mob = {};
    }
}

if (mob == {}) {
    StartGame();
}