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

function createList(array) {
    let list = document.getElementById("options");

    for (let restriction of shuffle(array)) {
        let listItem = document.createElement('li');
        listItem.classList.add("list-group-item");
        listItem.innerText = restriction;

        list.appendChild(listItem);
    }
}

function chooseRandom() {
    let list = document.getElementById("options");
    let items = list.getElementsByClassName("list-group-item");

    let randomElement = items[Math.floor(Math.random() * items.length)];

    for (let item of items) {
        item.classList.remove("active");
    }

    randomElement.classList.add("active");
    list.insertBefore(randomElement, list.firstChild);
}

const RESTRICTIONS = [
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

createList(RESTRICTIONS);

let selectRandomButton = document.getElementById("selectRandom");
selectRandomButton.addEventListener('click', chooseRandom);