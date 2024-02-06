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
    "All opponents have [X] life (X=60, 80)",
    "Have [X] treasures on the battlefield (X=20, 31)",
    "Have [X] copies of the same creature on the battlefield (X=4)",
    "Have [X] characters of group [Y] (X=4, 5, 6) (Y=Doctor Who's, Gatewatch, LOTR, etc)",
    "Have [X] mutations on one creature (X=4, 5)",
    "Have [X] transformed permanents on the battlefield (X=5, 6)",
    "Have [X] different type creature tokens on the battlefield (X=4, 5)",
    "Hit everyone with a bad creature type [Y] (Y=Goat, Egg, Lammasu, Coward, Beeble, Sand, Wombat, Zubera, Crab, etc)",
    "Destroy [X] of your own creatures with targeted removal (X=4, 5)",
    "Have/have gotten all lands from your deck on the battlefield, minimum of [X] landen in your deck (X=20, 25, 30)",
    "Have as much life as there are lands on the battlefield",
    "Equip a creature with [X] swords and hit someone (X=6, allemaal)",
    "Get 10+ poison counters on yourself",
    "Complete [X] different dungeons (X=3, 4)",
    "Have [X] “emblems” (X=3, 4) (“Emblems” = Monarch, Initiative, City's Blessing, The Ring Tempts You, normal Emblems, etc)",
    "Give someone 10+ poison counters and then remove them all (with Leeches or Karn Liberated)",
    "Have [X] evergreen keywords spread over all creatures (X=8, allemaal (18))",
    "Have permanents with mana value [X] till [Y] on the battlefield at the same time (X=0, 1, 2) (Y=X+5, X+6)",
    "Activate Door to Nothingness to make someone lose the game",
    "Have [X] instances of the same evergreen keyword [Y] on a single creature (X=4, 5) (Y=haste. trample, flying)",
    "Have a copy of the highest mana value permanent of each player",
    "Play [X] spells from your opponents (X=8, 11)",
    "Steal [X] permanents from your opponents (X=7, 7)",
    "Have a card from each Universes Beyond on the battlefield",
];

const BAD_CREATURES = [
    "Goat",
    "Egg",
    "Lammasu",
    "Coward",
    "Beeble",
    "Sand",
    "Wombat",
    "Zubera",
    "Cra",
];

createList("options", WINCONS);
createList("creatureOptions", BAD_CREATURES);

let selectRandomButton = document.getElementById("selectRandom");
selectRandomButton.addEventListener('click', chooseRandom);

let revealListButton = document.getElementById("revealList");
revealListButton.addEventListener('click', revealList);

let selectRandomCreatureButton = document.getElementById("selectRandomCreature");
selectRandomCreatureButton.addEventListener('click', chooseRandomCreature);