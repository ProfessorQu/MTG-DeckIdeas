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

    createList(restrictions);

    list.style.maxHeight = "5em";
    let items = list.getElementsByClassName("list-group-item");

    const listHeight = items[items.length - 1].offsetTop - items[0].offsetTop + items[items.length - 1].clientHeight;
    const firstElementOffsetTop = items[0].offsetTop;
    const range = getRandom(300, 500);

    for (let i = 0; i < range; i++) {
        for (let item of items) {
            let top = item.style.top;
            let topNumber = Number(top.substring(0, top.length - 2));
            topNumber -= 5;

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

    closestItem.classList.add("active");

    spinning = false;
}

let spinning = false;

const restrictions = [
    "Alleen Colorless kaarten",
    "Geen creatures",
    "Alleen permanents",
    "Pauper, dus alleen maar commons, of allesbehalve je commander common",
    "Alle kaarten mana value < [X] (X=3, 5)",
    "Alle kaarten mana value > [X] (X=2, 3)",
    "Alleen specifieke mana values [X] toegestaan ([X]=2 | 2 en 5 en 11 | 1 en 3 en 6)",
    "Alle kaarten moeten oneven mana value zijn",
    "Alle kaarten moeten even mana value zijn",
    "Alleen historic kaarten in het deck",
    "Alleen kaarten voor jaar [X] (X=2004, 2009)",
    "Alleen kaarten gebruiken die legaal zijn in standerd",
    "Decks met commanders met <[X] decks op edhrec (X=100, 10)",
];

createList(restrictions);

let selectRandomButton = document.getElementById("selectRandom");
selectRandomButton.addEventListener('click', chooseRandom);