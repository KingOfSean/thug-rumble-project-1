// DOM ELEMENTS
const attackButton = document.getElementById("atk");
const inventoryButton = document.getElementById("item");
const runButton = document.getElementById("run");
const startGameButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const fakeButton = document.getElementById("fake");
const mainText = document.getElementById("text");
const playerHealth = document.getElementById("player-health");
const enemyHealth = document.getElementById("enemy-health");
const enemyName = document.getElementById("enemy-name");
const battleDisplay = document.querySelector(".health-display");
const gameOver = document.getElementById("game-over");
const playerBar = document.getElementById("player-health-bar");
const enemyBar = document.getElementById("enemy-health-bar");
const thugPic = document.getElementById("thug1");
const thugLtPic = document.getElementById("thug-lt");
const leaderPic = document.getElementById("thug-leader");
const victory = document.getElementById("player-victory");
const playerPic = document.getElementById("player");
const lose = document.getElementById("death");
const battleMusic = document.getElementById("battle-song");
const victoryMusic = document.getElementById("won");
const diedMusic = document.getElementById("died");

// PLAYER CLASS
class Player {
    constructor() {
        this.health = 150;
        this.power = 30;
        this.accuracy = null;
    }
    attack() {
        this.accuracy = Math.random();
        if (this.accuracy >= .2) {
            thugEncounters[0].health -= this.power
            mainText.innerText = "You landed a hit!";
        } else {
            mainText.innerText = "Your attack missed!";
        }
    // useItem(this.item[0]) {

    // }    
    }
}

// PLAYER
const userPlayer = new Player();

// ITEM
class Item {
    constructor(name, healing) {
        this.name = name;
        this.healing = healing;
    }
    heal() {
        if (items.length > 0){ 
        userPlayer.health = this.healing + userPlayer.health;
        mainText.innerText = "You used a Potion!";
        } else {
            mainText.innerText = "You dont have any Potions!"
        }
    }
}

const potion = new Item("Potion", 50);



// ENEMY CLASS
class Thugs {
    constructor(name, health, power, max) {
        this.name = name;
        this.health = health;
        this.power = power;
        this.accuracy = null;
        this.max = max;
    }
    attack(user) {
        this.accuracy = Math.random();
        if (this.accuracy >= .4) {
            user.health -= this.power;
            mainText.innerText = thugEncounters[0].name + " has attacked you!"

        } else {
            mainText.innerText = thugEncounters[0].name + " missed his attack!"
        }
    }
    
}
// ENEMIES
const thug1 = new Thugs("Thug Minion", 100, 10, 100);
const thugLt = new Thugs("Lt. Thug", 150, 15, 150);
const thugLeader = new Thugs("Leader Sigma", 200, 20, 200);

// ENEMY ARRAY
const thugEncounters = [thug1, thugLt, thugLeader, "string"];
const encounterPics = [thugPic, thugLtPic, leaderPic, 'string'];
// ITEM ARRAY
const items = [];


// FUNCTIONS
let gamePlay = false;
let turn = true;
playerBar.value = userPlayer.health;
enemyBar.value = thugEncounters[0].health;
enemyBar.max = thugEncounters[0].max;
mainText.innerText = "Welcome to Thug Rumble! A gang of thugs have kidnapped your best friend. You go to encounter them, but they want to fight you!"
enemyName.innerText = "Enemy: " + thugEncounters[0].name;
inventoryButton.innerText = "Use Potions: " + items.length;

const playBattleMusic = () => {
    battleMusic.play();
}
const pauseBattleMusic = () => {
    battleMusic.pause();
}
const playLoseMusic = () => {
    diedMusic.play();
}
const playWinMusic = () => {
    victoryMusic.play();
}

const startGamePlay = () => {
    gamePlay = true;
    playBattleMusic();
    mainText.innerText = "What do you want to do?";
    startGameButton.style.visibility = "hidden";
    resetButton.style.visibility = "hidden";
    attackButton.style.visibility = "visible";
    inventoryButton.style.visibility = "visible";
    runButton.style.visibility = "visible";
    battleDisplay.style.visibility = "visible";
    fakeButton.style.visibility = "hidden";
    gameOver.style.visibility = "hidden";
    encounterPics[0].style.visibility = "visible";
    victory.style.visibility = "hidden";
}
const question = () => {
    mainText.innerText = "What do you want to do?";
    attackButton.disabled = false;
}




const playerAttack = () => {
    userPlayer.attack();
    enemyBar.value = thugEncounters[0].health;
    enemyBar.max = thugEncounters[0].max;
    turn = false;
    attackButton.disabled = true;
    if (turn === false && thugEncounters[0] != "string") {
        setTimeout(enemyAttack, 2000);
        setTimeout(question, 3800);
    }
    if (thugEncounters[0].health <= 0) {
        turn = true;
        enemyDefeated();
        setTimeout(addPotion, 2000);
        setTimeout(question, 3700);
    }
}

const enemyAttack = () => {
    if(thugEncounters != "string") {
        thugEncounters[0].attack(userPlayer);
    }
    playerBar.value = userPlayer.health;
    if (userPlayer.health <= 0){
        setTimeout(youDied, 3800);
    }
    turn = true;
}

const enemyDefeated = () => {
    turn = true;
    mainText.innerText = thugEncounters[0].name + " was defeated!"
    thugEncounters.shift();
    enemyName.innerText = "Enemy: " + thugEncounters[0].name;
    encounterPics[0].style.visibility = "hidden";
    encounterPics.shift();
    if (thugEncounters[0] != "string") {
        encounterPics[0].style.visibility = "visible";
    } else {
        enemyHealth.style.visibility = "hidden";
        enemyName.style.visibility = "hidden";
        setTimeout(youWin, 3800);
    }
    
}

const youDied = () => {
    startGameButton.style.visibility = "hidden";
    resetButton.style.visibility = "visible";
    attackButton.style.visibility = "hidden";
    inventoryButton.style.visibility = "hidden";
    runButton.style.visibility = "hidden";
    battleDisplay.style.visibility = "hidden";
    fakeButton.style.visibility = "hidden";
    gameOver.style.visibility = "visible";
    lose.style.visibility = "visible";
    thugPic.style.visibility = "hidden";
    thugLtPic.style.visibility = "hidden";
    leaderPic.style.visibility = "hidden";
    victory.style.visibility = "hidden";
    playerPic.style.visibility = "hidden";
    mainText.innerText = thugEncounters[0].name + ": You wimp! Your friend is dead!"
    pauseBattleMusic();
    playLoseMusic();
}

const runAway = () => {
    mainText.innerText = thugEncounters[0].name + ": You wimp! Your friend is dead!"
    startGameButton.style.visibility = "hidden";
    resetButton.style.visibility = "visible";
    attackButton.style.visibility = "hidden";
    inventoryButton.style.visibility = "hidden";
    runButton.style.visibility = "hidden";
    battleDisplay.style.visibility = "hidden";
    fakeButton.style.visibility = "hidden";
    gameOver.style.visibility = "visible";
    lose.style.visibility = "visible";
    thugPic.style.visibility = "hidden";
    thugLtPic.style.visibility = "hidden";
    leaderPic.style.visibility = "hidden";
    victory.style.visibility = "hidden";
    playerPic.style.visibility = "hidden";
    pauseBattleMusic();
    playLoseMusic();
}

const resetGame = () => {
    location.reload();
}

let addPotion = () => {
    mainText.innerText = "You picked up a Potion!"
    items.push(potion);
    inventoryButton.innerText = "Use Potions: " + items.length;
}

let removePotion = () => {
    items.shift();
    inventoryButton.innerText = "Use Potions: " + items.length;
}

const potionHeal = () => {
    potion.heal();
    removePotion();
    playerBar.value = userPlayer.health;
    turn = false;
}
const youWin = () => {
    gameOver.innerText = "You Win!";
    mainText.innerText = "You saved your friend and reduced crime!";
    startGameButton.style.visibility = "hidden";
    resetButton.style.visibility = "visible";
    attackButton.style.visibility = "hidden";
    inventoryButton.style.visibility = "hidden";
    runButton.style.visibility = "hidden";
    battleDisplay.style.visibility = "hidden";
    fakeButton.style.visibility = "hidden";
    gameOver.style.visibility = "visible";
    playerPic.style.visibility = "hidden";
    victory.style.visibility = "visible";
    pauseBattleMusic();
    playWinMusic();
    
}

if (gamePlay === false) {
    mainText.innerText = "Welcome to Thug Rumble! A gang of thugs have kidnapped your best friend and took them to an abandoned warehouse. You go to encounter them, but they want to fight you!"
    attackButton.style.visibility = "hidden";
    inventoryButton.style.visibility = "hidden";
    runButton.style.visibility = "hidden";
    battleDisplay.style.visibility = "hidden";
    fakeButton.style.visibility = "hidden";
    gameOver.style.visibility = "hidden";
    thugPic.style.visibility = "hidden";
    thugLtPic.style.visibility = "hidden";
    leaderPic.style.visibility = "hidden";
    victory.style.visibility = "hidden";
    lose.style.visibility = "hidden";
}

// EVENT LISTENERS
startGameButton.addEventListener("click", startGamePlay);
attackButton.addEventListener("click", playerAttack);
resetButton.addEventListener("click", resetGame);
runButton.addEventListener("click", runAway);
inventoryButton.addEventListener("click", potionHeal);