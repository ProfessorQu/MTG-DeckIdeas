async function chooseRandom() {
    if (spinning) {
        return
    } else {
        spinning = true;
    }

    await chooseRandomFromList(RESTRICTIONS);
    
    spinning = false;
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
    "All card art must be from a specific illustrator",
    "No cards with mana value lower than your commanders manavalue",
    "No cards with mana value greater than your commanders mana value",
    "All cards must be able to create a specific type of token",
];

createList("options", RESTRICTIONS);

let selectRandomButton = document.getElementById("selectRandom");
selectRandomButton.addEventListener('click', chooseRandom);

let revealListButton = document.getElementById("revealList");
revealListButton.addEventListener('click', revealList);