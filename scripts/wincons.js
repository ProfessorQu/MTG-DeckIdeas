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

function createList(array) {
    let list = document.getElementById("options");

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

    let list = document.getElementById("options");
    list.style.maxHeight = "5em";
    list.innerHTML = "";

    createList(wincons);

    let items = list.getElementsByClassName("list-group-item");

    const listHeight = items[items.length - 1].offsetTop - items[0].offsetTop + items[items.length - 1].clientHeight;
    const firstElementOffsetTop = items[0].offsetTop;
    const range = getRandom(200, 400);

    for (let i = 0; i < range; i++) {
        for (let item of items) {
            let top = item.style.top;
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
        let top = item.style.top;
        let topNumber = Number(top.substring(0, top.length - 2));

        item.style.top = topNumber - difference + "px";
    }

    closestItem.classList.add("active");
    let revealListButton = document.getElementById("revealList");
    revealListButton.style.display = "inline";
    spinning = false;
}

function revealList() {
    let list = document.getElementById("options");
    list.style.maxHeight = "";

    let revealListButton = document.getElementById("revealList");
    revealListButton.style.display = "none";
}

let spinning = false;

const wincons = [
    "Evenveel kaarten in library als graveyard",
    "Alle tegenstanders hebben [X] levens (X=60, 80)",
    "[X] treasures op de battlefield hebben (X=20, 31)",
    "[X] kopieën van hetzelfde creature op de battlefield (X=4)",
    "[X] karakters van groep [Y] (X=4, 5, 6) (Y=Doctor Who's, Gatewatch, LOTR, etc)",
    "[X] mutaties op één creature (X=4, 5)",
    "[X] permanents getransformeerd op de battlefield (X=5, 6)",
    "[X] verschillende type creature tokens op de battlefield (X=4, 5)",
    "Iedereen een keer damage doen met een slecht creature type [Y] (Y=Goat, Egg, Lammasu, Coward, Beeble, Sand, Wombat, Zubera, Crab, etc)",
    "Destroy [X] van je eigen creatures met iets dat de creatures target (X=4, 5)",
    "Alle landen uit je deck op de battlefield liggen of hebben gelegen, minimaal [X] landen in je deck (X=20, 25, 30)",
    "De hoeveelheid levens die je hebt moeten gelijk zijn aan het aantal landen op het battlefield",
    "Equip een creature met [X] van alle zwaarden en raak iemand ermee (X=6, allemaal)",
    "Krijg 10+ poison counters op jezelf",
    "Complete [X] verschillende dungeons (X=3, 4)",
    "Heb [X] “emblems” (X=3, 4) (“Emblems” = Monarch, Initiative, City's Blessing, The Ring Tempts You, normale Emblems, etc)",
    "Geef iemand 10 poison counters en haal ze daarna allemaal weg (met Leeches of Karn Liberated)",
    "[X] evergreen keywords verspreid over alle creatures (X=8, allemaal (18))",
    "Mv [X] t/m [Y] tegelijk op de battlefield (X=0, 1, 2) (Y=X+5, X+6)",
    "Door to Nothingness activeren om iemand de game te laten verliezen",
    "[X] instances van hetzelfde evergreen keyword [Y] op een creature (X=4, 5) (Y=haste. trample, flying)",
    "Heb een kopie van hoogste mana value permanent van elke tegenstander",
    "[X] spells van je tegenstanders spelen (X=8, 11)",
    "[X] permanents van je tegenstanders stelen (X=7, 7)",
    "Een kaart van elke universes beyond set op het battlefield hebben",
];

createList(wincons);

let selectRandomButton = document.getElementById("selectRandom");
selectRandomButton.addEventListener('click', chooseRandom);

let revealListButton = document.getElementById("revealList");
revealListButton.addEventListener('click', revealList);