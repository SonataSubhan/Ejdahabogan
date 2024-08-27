let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["cubug"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [{
    name: 'cubug',
    power: 5,
},
{
    name: 'xencer',
    power: 30
},
{
    name: 'Cekic',
    power: 50
},
{
    name: 'qilinc',
    power: 100,
}];
const monsters = [
    { name: 'slaym', level: 2, health: 15 },
    { name: 'vehsi canavar', level: 8, health: 60 },
    { name: 'ejdaha', level: 20, health: 300 }
];
const locations = [
    {
        name: "town square",
        "button text": ["Oba markete get ", "Magaraya get", "ejdahaynan dalas"],
        "button functions": [goStore, goCave, fightejdaha],
        text: "sen indi kenddesen ve oba marketin kend filialini gordun"
    },
    {
        name: "store",
        "button text": ["10 can al(10manat)", "silah al(30manat)", "kende qayit"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "oba markete girdin"
    },
    {
        name: "cave",
        "button text": ["slaymnan dalas", "vehsi canavarnan dalas", "kende qayit"],
        "button functions": [fightslaym, fightBeast, goTown],
        text: "Magaraya girdin canavarlar zad gordun"
    },
    {
        name: "fight",
        "button text": ["VUR", "YAYIN", "DABANA TUPUR QAC"],
        "button functions": [attack, dodge, goTown],
        text: "Canavarnan dalasirsan"
    }
    ,
    {
        name: "kill monster",
        "button text": ["kende qayit", "kende qayit", "kende qayit"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'Canavar "Qarabag Azerbaycandi" deyib oldu, tecrube ve pul qazandin.'
    },
    {
        name: "lose",
        "button text": ["Tezden oyunuyag?", "Tezden oyunuyag?", "Tezden oyunuyag?"],
        "button functions": [restart, restart, restart],
        text: 'OLDUN AHDASHDADASH',
    },
    {
        name: "win",
        "button text": ["Tezden oyunuyag?", "Tezden oyunuyag?", "Tezden oyunuyag?"],
        "button functions": [restart, restart, restart],
        text: "Heri sen ejdahani bogdun uddun oyunu !!!"
    },
    {
        name: "easter egg",
        "button text": ["2",
            "8", "kende qayit"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "Gizli oyun tapdin. bidene reqem sec. 0-10 arasi reqemden duz olani tutuzdursan (onsuzda 2inen biridi) mukafalantdirlacaqsan(20manat ahsdahs).",
    }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightejdaha;

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerHTML = location.text;
}

function goTown() {
    update(locations[0]);

}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}



function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;


    }
    else {
        text.innerText = ("Pulun yoxdu kasib can almaga KAASIB");
    }
}

function buyWeapon() {
    if (currentWeaponIndex < weapons.length - 1) {


        if (gold >= 30) {
            gold -= 30;
            currentWeaponIndex++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeaponIndex].name;

            text.innerText = "Sen " + newWeapon + " aldin";
            inventory.push(newWeapon);

        }
        else {
            text.innerText = "Pulun yoxdu kasib silah almaga KAASIB"
        }
    }
    else {
        text.innerText = "Ala qilincin varda neyive bes elemir";
        button2.innerText = "15 manatdan soxusdur silahi";
        button2.onclick = sellWeapon;
    }

}
function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "sen " + currentWeapon + "silahini satdin";
        text.innerText += " cantanda " + inventory + " var";
    } else {
        text.innerText = "bidene silahin qaldi onuda satib gulessen canavarnan?";
    }
}
function fightslaym() {
    fighting = 0;
    goFight();
}
function fightBeast() {
    fighting = 1;
    goFight();
}
function fightejdaha() {
    fighting = 2;
    goFight();
}
function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name
    monsterHealthText.innerText = monsterHealth;
    console.log(monsterHealthText);

}
function attack() {
    text.innerText = + monsters[fighting].name + " canavari hucum eliyir"
    text.innerText += "sen  " + weapons[currentWeaponIndex].name + "silahinla hucum edirsen.";
    health -= getMonsterAttackValue(monsters[fighting].level);
    monsterHealth -= weapons[currentWeaponIndex].power;
    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
    }
    else {
        text.innerText = " colaxsan, vura bilmedin";
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    }
    else if (monsterHealth <= 0) {
        if (fighting === 2) {
            winGame();
        }
        else {
            defeatMonster();
        }
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " DJSADASDHASDAJDASD " + inventory.pop() + "'in QIRILDI ";
        currentWeaponIndex--;
    }
}
function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit > 0 ? hit : 0;
}
function isMonsterHit() {
    function isMonsterHit() {
        return Math.random() > .2 || health < 20;
    }
}
function dodge() {

}
function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);

}
function lose() {
    update(locations[5]);
}
function winGame() {
    update(locations[6]);
}
function dodge() {
    text.innerText = monsters[fighting].name + "hucumundan yayindin!(qewey)";
}
function restart() {
    xp = 0;
    xpText.innerText = xp;
    health = 100;
    healthText.innerText = health;
    gold = 50;
    goldText.innerText = gold;
    currentWeaponIndex = 0;
    inventory = ['cubug'];
    goTown();
}
function easterEgg() {
    update(locations[7]);
}
function pick(guess) {
    const numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "sen " + guess + "secdin:\n"
    for (let i = 0; i < 10; i++) {

    }
    if (numbers.includes(guess)) {
        text.innerText += "Duzdu! gele bu 20 manati";
        gold += 20;
        goldText.innerText = gold;
    }
    else {
        text.innerText += "Sefdi yimedin getdin!";
        health -= 10;
        healthText.innerText = health;
    }
    if (health <= 0) {
        lose();
    }
}
function pickTwo() {
    pick(2);
}
function pickEight() {
    pick(8);
}
