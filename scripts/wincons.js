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

const WINCONS = [
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

createList(WINCONS);

let selectRandomButton = document.getElementById("selectRandom");
selectRandomButton.addEventListener('click', chooseRandom);