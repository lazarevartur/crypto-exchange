import { CATEGORIES } from "@/constants";

function getRandomName() {
  const values = [
    "Decentraland",
    "Algorand",
    "Avalanche",
    "Cosmos",
    "Dogecoin",
    "Ethereum",
    "Home Bank",
    "Polkadot",
    "Polygon",
    "Qtum",
    "Ripple",
    "Sberbank",
    "TRON",
  ];

  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}

function getRandomNumber() {
  return Number((Math.random() * (100000.01 - 1) + 1).toFixed(4));
}

function getRandomCategories() {
  const numberOfCategories = Math.floor(Math.random() * CATEGORIES.length) + 1;

  const shuffledCategories = CATEGORIES.sort(() => 0.5 - Math.random());
  return shuffledCategories.slice(0, numberOfCategories);
}
