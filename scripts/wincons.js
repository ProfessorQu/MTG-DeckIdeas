function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

function createList(id, array) {
    let list = document.getElementById(id);

    for (let restriction of shuffle(array)) {
        let listItem = document.createElement('li');
        listItem.classList.add("list-group-item");
        listItem.innerText = restriction;
        listItem.style.top = "0px";

        list.appendChild(listItem);
    }
}

async function chooseRandom() {
    if (spinning) {
        return
    } else {
        spinning = true;
    }

    let badCreatures = document.getElementById("bad-creatures");
    badCreatures.style.display = "none";

    let list = document.getElementById("options");
    list.style.maxHeight = "5em";
    list.innerHTML = "";

    createList("options", wincons);

    let items = list.getElementsByClassName("list-group-item");

    const listHeight = items[items.length - 1].offsetTop - items[0].offsetTop + items[items.length - 1].clientHeight;
    const firstElementOffsetTop = items[0].offsetTop;
    const range = getRandom(200, 400);

    for (let i = 0; i < range; i++) {
        for (let item of items) {
            let {top} = item.style;
            let topNumber = Number(top.substring(0, top.length - 2));
            topNumber -= 10;

            if (item.offsetTop < 5) {
                topNumber += listHeight;
            }

            item.style.top = topNumber + "px";
        }

        await sleep(10)
    }

    let closestItem = null;
    let closestDist = 10000000;

    for (let item of items) {
        let dist = Math.abs(item.offsetTop - firstElementOffsetTop);
        if (dist < closestDist) {
            closestItem = item;
            closestDist = dist;
        }
    }

    let difference = closestItem.offsetTop - firstElementOffsetTop;
    for (let item of items) {
        let {top} = item.style;
        let topNumber = Number(top.substring(0, top.length - 2));

        item.style.top = topNumber - difference + "px";
    }

    closestItem.classList.add("active");

    if (closestItem.innerHTML.startsWith("Hit everyone")) {
        document.getElementById("bad-creatures").style.display = "inline";
    }

    let revealListButton = document.getElementById("revealList");
    revealListButton.style.display = "inline";

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

function revealList() {
    let list = document.getElementById("options");
    list.style.maxHeight = "";

    let revealListButton = document.getElementById("revealList");
    revealListButton.style.display = "none";
}

let spinning = false;

const wincons = [
    "Same number of cards in graveyard as in library",
    "All oppontents have [X] life (X=60, 80)",
    "Have [X] treasures on the battlefield (X=20, 31)",
    "Have [X] copies of the same creature on the battlefield (X=4)",
    "Have [X] characters of group [Y] (X=4, 5, 6) (Y=Doctor Who's, Gatewatch, LOTR, etc)",
    "Have [X] mutations on one creature (X=4, 5)",
    "Have [X] transformed permanents on the battlefield (X=5, 6)",
    "Have [X] different type creature tokens on the battlefield (X=4, 5)",
    "Hit everyone with a bad creature type [Y] (Y=Goat, Egg, Lammasu, Coward, Beeble, Sand, Wombat, Zubera, Crab, etc)",
    "Destroy [X] of your own craetures with targeted removal (X=4, 5)",
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

const badCreatures = [
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

createList("options", wincons);
createList("creatureOptions", badCreatures);

let selectRandomButton = document.getElementById("selectRandom");
selectRandomButton.addEventListener('click', chooseRandom);

let revealListButton = document.getElementById("revealList");
revealListButton.addEventListener('click', revealList);

let selectRandomCreatureButton = document.getElementById("selectRandomCreature");
selectRandomCreatureButton.addEventListener('click', chooseRandomCreature);