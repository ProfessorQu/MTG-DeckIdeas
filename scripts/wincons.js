async function chooseRandom() {
    if (spinning) {
        return
    } else {
        spinning = true;
    }

    let badCreatures = document.getElementById("bad-creatures");
    badCreatures.style.display = "none";

    let closestItem = await chooseRandomFromList(WINCONS);

    if (closestItem.innerHTML.startsWith("Hit everyone")) {
        document.getElementById("bad-creatures").style.display = "inline";
    }

    spinning = false;
}

function chooseRandomCreature() {
    const list = document.getElementById("creatureOptions");
    const items = list.getElementsByClassName("list-group-item");

    for (let item of items) {
        item.classList.remove("active");
    }

    const randomItem = items[Math.floor(Math.random() * items.length)];
    randomItem.classList.add("active");
}


let spinning = false;

const WINCONS = [
    "Same number of cards in graveyard as in library",
    "All opponents have 60 life",
    "Have 20 treasures on the battlefield",
    "Have 4 copies of the same creature on the battlefield (no regular tokens or creatures without restrictions)",
    "Have 5 characters of some group on the battlefield (Doctor Who's, Gatewatch, LOTR, etc)",
    "Have 4 mutations on one creature",
    "Have 6 transformed permanents on the battlefield",
    "Have 5 different type creature tokens on the battlefield",
    "Hit everyone with a bad creature type",
    "Destroy 7 of your own creatures with targeted removal",
    "Have as much life as there are lands on the battlefield",
    "Equip a creature with 5 swords and hit someone",
    "Have 4 different Other Parts (Other Parts = Monarch, Initiative, City's Blessing, The Ring Tempts You, Planeswalker Emblem, etc)",
    "Give someone 10+ poison counters and then remove them all (with Leeches or Karn Liberated)",
    "Have 10 different evergreen keywords spread over all creatures",
    "Have nonland permanents with mana value 3 till 7 on the battlefield at the same time",
    "Activate Door to Nothingness to make someone lose the game",
    "Have 5 instances of the same evergreen keyword on a single creature",
    "Resolve 7 spells from your opponents",
    "Control 5 nonland permanents from your opponents",
    "Have a nonland permanent from each Universes Beyond set that is not a Secret Lair on the battlefield (Warhammer 40,000, Doctor Who, LOTR, D&D, Transformers, Jurassic World)",
];

const BAD_CREATURES = [
    "Goat",
    "Lammasu",
    "Beeble",
    "Zubera",
];

createList("options", WINCONS);
createList("creatureOptions", BAD_CREATURES);

let selectRandomButton = document.getElementById("selectRandom");
selectRandomButton.addEventListener('click', chooseRandom);

let revealListButton = document.getElementById("revealList");
revealListButton.addEventListener('click', revealList);

let selectRandomCreatureButton = document.getElementById("selectRandomCreature");
selectRandomCreatureButton.addEventListener('click', chooseRandomCreature);