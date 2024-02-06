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
    list.innerHTML = "";

    createList(RESTRICTIONS);

    list.style.maxHeight = "5em";
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

const RESTRICTIONS = [
    "Only use Colorless cards",
    "Have no creatures",
    "Only have permanents",
    "Pauper a.k.a. everything is common, except your commander",
    "All cards have mana value < [X] (X=3, 5)",
    "All cards have mana value > [X] (X=2, 3)",
    "Only specific mana values [X] are allowed ([X]=2 | 2 en 5 en 11 | 1 en 3 en 6)",
    "All cards must be uneven mana value",
    "All cards must be even mana value",
    "Only have historic cards (Artifacts, Legendaries and/or Sagas)",
    "Only have cards printed before [X] (X=2004, 2009)",
    "Only have cards that are standard legal",
    "Create a deck with a commander with < [X] decks on edhrec (X=100, 10)",
    "Your deck can cost no more than 100 euros",
    "Have no basic lands in your deck",
    "Build your deck centered around some character",
    "All cards must be snow cards",
];

createList(RESTRICTIONS);

let selectRandomButton = document.getElementById("selectRandom");
selectRandomButton.addEventListener('click', chooseRandom);

let revealListButton = document.getElementById("revealList");
revealListButton.addEventListener('click', revealList);