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

function revealList() {
    let list = document.getElementById("options");
    list.style.maxHeight = "";

    let revealListButton = document.getElementById("revealList");
    revealListButton.style.display = "none";
}
