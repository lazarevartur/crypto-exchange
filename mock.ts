import { CATEGORIES } from "@/constants";
import { IReserveItem } from "@/lib/types";

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

export const MockData = Array.from({ length: 34 }).map<IReserveItem>(
  (_, i) => ({
    id: i.toString(),
    name: getRandomName(),
    amount: getRandomNumber(),
    icon: "/btc.svg",
    type: getRandomCategories(),
  }),
);
