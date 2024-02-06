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

async function chooseRandomFromList(array) {
    let list = document.getElementById("options");
    list.innerHTML = "";

    createList("options", array);

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

    return closestItem;
}

function getRandom(min, max) {
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

function revealList() {
    let list = document.getElementById("options");
    list.style.maxHeight = "";

    let items = list.getElementsByClassName("list-group-item");

    for (let item of items) {
        item.style.top = "0px";
    }

    let revealListButton = document.getElementById("revealList");
    revealListButton.style.display = "none";
}
