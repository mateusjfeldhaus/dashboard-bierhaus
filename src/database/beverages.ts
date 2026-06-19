import { IBevarege } from "../providers/drinksContext";

export const beveragesDatabase: IBevarege[] = [
  //#region XAROPES
  {
    name: "Xarope Simples",
    price: 1.22,
    quantity: 300,
    dateOfPurchase: "2024-09-07",
  },
  {
    name: "Xarope Semi-Rich",
    price: 1.83,
    quantity: 300,
    dateOfPurchase: "2024-09-07",
  },
  {
    name: "Xarope Rich",
    price: 2.44,
    quantity: 300,
    dateOfPurchase: "2024-09-07",
  },
  //#endregion
  //#region SUCOS
  {
    name: "Suco de Limão",
    price: 0.41,
    quantity: 35,
    dateOfPurchase: "",
  },
  {
    name: "Limão",
    price: 0.41,
    quantity: 1,
    dateOfPurchase: "",
  },
  {
    name: "Suco de Limão Siciliano",
    price: 0.41,
    quantity: 35.0,
    dateOfPurchase: "",
  },
  {
    name: "Suco de Laranja",
    price: 1.99,
    quantity: 200.0,
    dateOfPurchase: "2024-09-07",
  },
  {
    name: "Suco de Abacaxi",
    price: 1.99,
    quantity: 200.0,
    dateOfPurchase: "2024-09-07",
  },
  {
    name: "Suco de Laranja e Cranberry",
    price: 1.99,
    quantity: 200.0,
    dateOfPurchase: "2024-09-07",
  },
  {
    name: "Suco de Cranberry",
    price: 1.99,
    quantity: 200.0,
    dateOfPurchase: "2024-09-07",
  },
  //#endregion
  //#region REDBULL
  {
    name: "Redbull",
    price: 7.49,
    quantity: 1,
    dateOfPurchase: "2024-09-07",
  },
  {
    name: "Redbull Tropical",
    price: 7.49,
    quantity: 1,
    dateOfPurchase: "2024-09-07",
  },
  {
    name: "Redbull Sabores",
    price: 7.49,
    quantity: 1,
    dateOfPurchase: "2024-09-07",
  },
  //#endregion
  //#region ÁGUAS
  {
    name: "Água com Gás",
    price: 1.09,
    quantity: 500,
    dateOfPurchase: "2024-09-07",
  },
  {
    name: "Água sem Gás",
    price: 1.09,
    quantity: 500,
    dateOfPurchase: "2024-09-07",
  },
  {
    name: "Água Tônica",
    price: 3.99,
    quantity: 350,
    dateOfPurchase: "",
  },
  { name: "Tônica", price: 3.99, quantity: 350, dateOfPurchase: "" },
  {
    name: "Club Soda",
    price: 4.82,
    quantity: 350,
    dateOfPurchase: "",
  },
  {
    name: "Água de Coco",
    price: 2.39,
    quantity: 200,
    dateOfPurchase: "2024-09-07",
  },
  //#endregion
  //#region MONIN
  {
    name: "Monin Gengibre",
    price: 42.92,
    quantity: 700,
    dateOfPurchase: "2024-02-13",
  },
  {
    name: "Monin Limão Siciliano",
    price: 49.9,
    quantity: 700,
    dateOfPurchase: "",
  },
  {
    name: "Monin Menta Glacial",
    price: 49.9,
    quantity: 700,
    dateOfPurchase: "2023-11-22",
  },
  {
    name: "Monin Rantcho",
    price: 54.9,
    quantity: 700,
    dateOfPurchase: "2023-11-26",
  },
  {
    name: "Monin Sabores",
    price: 29.9,
    quantity: 250,
    dateOfPurchase: "",
  },
  {
    name: "Monin Cereja",
    price: 249.9,
    quantity: 700,
    dateOfPurchase: "2024-09-02",
  },
  {
    name: "Monin Grenadine",
    price: 49.9,
    quantity: 700,
    dateOfPurchase: "2024-09-02",
  },
  {
    name: "Monin Groselha/Framboesa",
    price: 29.9,
    quantity: 250,
    dateOfPurchase: "",
  },
  {
    name: "Grenadine",
    price: 49.9,
    quantity: 700,
    dateOfPurchase: "2024-09-02",
  },
  //#endregion
  //#region DIVERSOS
  { name: "Hortelã", price: 2.99, quantity: 1000, dateOfPurchase: "" },
  { name: "Clara de Ovo", price: 0.6, quantity: 1, dateOfPurchase: "" },
  { name: "Pimenta Rosa", price: 0.41, quantity: 1, dateOfPurchase: "" },
  { name: "Maracujá in Natura", price: 4.0, quantity: 50, dateOfPurchase: "" },
  { name: "Angostura", price: 149, quantity: 1000, dateOfPurchase: "" },
  {
    name: "Angostura de Laranja",
    price: 149,
    quantity: 1000,
    dateOfPurchase: "",
  },
  {
    name: "Ginger Beer",
    price: 3.43,
    quantity: 270,
    dateOfPurchase: "2024-02-13",
  },
  { name: "Café Expresso", price: 1.69, quantity: 50, dateOfPurchase: "" },
  { name: "Coca-Cola", price: 1.79, quantity: 200, dateOfPurchase: "" },
  { name: "Leite de Coco", price: 5.94, quantity: 200, dateOfPurchase: "" },
  { name: "Leite Condensado", price: 4.99, quantity: 395, dateOfPurchase: "" },
  //#endregion
  //#region LICORES
  {
    name: "Aperol",
    price: 64.3,
    quantity: 750,
    dateOfPurchase: "",
  },
  {
    name: "Campari",
    price: 58.83,
    quantity: 998,
    dateOfPurchase: "2024-11-29",
  },
  {
    name: "Dry Vermouth",
    price: 45.9,
    quantity: 750,
    dateOfPurchase: "2023-11-30",
  },
  {
    name: "Vermouth Cinzano Rosso",
    price: 37.9,
    quantity: 1000,
    dateOfPurchase: "2024-04-12",
  },
  {
    name: "Vermouth Rosso",
    price: 37.9,
    quantity: 1000,
    dateOfPurchase: "2024-04-12",
  },
  {
    name: "Vermouth Cinzano 1757",
    price: 162.07,
    quantity: 1000,
    dateOfPurchase: "2024-11-29",
  },
  {
    name: "Cointreau",
    price: 145.17,
    quantity: 700,
    dateOfPurchase: "",
  },
  {
    name: "Curaçau Blue",
    price: 46.8,
    quantity: 720,
    dateOfPurchase: "",
  },
  {
    name: "Licor de Pêssego",
    price: 46.8,
    quantity: 720,
    dateOfPurchase: "",
  },
  {
    name: "Cynar",
    price: 26.99,
    quantity: 900,
    dateOfPurchase: "2023-11-30",
  },
  {
    name: "Licor 43",
    price: 126.30,
    quantity: 700,
    dateOfPurchase: "2024-11-29",
  },
  {
    name: "Licor Kahluá",
    price: 179.0,
    quantity: 1000,
    dateOfPurchase: "",
  },
  {
    name: "Licor de Café",
    price: 179.0,
    quantity: 1000,
    dateOfPurchase: "",
  },
  {
    name: "Limoncello",
    price: 82.98,
    quantity: 700,
    dateOfPurchase: "",
  },
  //#endregion
  //#region RUM
  {
    name: "Rum",
    price: 56.9,
    quantity: 980,
    dateOfPurchase: "",
  },
  {
    name: "Rum Bacardi",
    price: 58.99,
    quantity: 980,
    dateOfPurchase: "2024-04-12",
  },
  {
    name: "Rum Malibu",
    price: 55.57,
    quantity: 750,
    dateOfPurchase: "",
  },
  {
    name: "Rum Montilla",
    price: 38.21,
    quantity: 1000,
    dateOfPurchase: "",
  },
  //#endregion
  //#region CACHAÇA
  {
    name: "Cachaça",
    price: 52.5,
    quantity: 1000,
    dateOfPurchase: "",
  },
  {
    name: "Cachaça Seleta",
    price: 47.31,
    quantity: 1000,
    dateOfPurchase: "2024-02-13",
  },
  {
    name: "Cachaça 51",
    price: 0.0,
    quantity: 965,
    dateOfPurchase: "",
  },
  {
    name: "Cachaça Velho Barreiro",
    price: 17.1,
    quantity: 910,
    dateOfPurchase: "",
  },
  //#endregion
  //#region ESPUMANTE
  {
    name: "Espumante",
    price: 17.9,
    quantity: 187.0,
    dateOfPurchase: "",
  },
  //#endregion
  //#region GIN
  {
    name: "Gin",
    price: 150,
    quantity: 750,
    dateOfPurchase: "",
  },
  {
    name: "Gin Beefeater 24",
    price: 165.93,
    quantity: 750,
    dateOfPurchase: "2024-11-29",
  },
  {
    name: "Gin Beefeater",
    price: 78.9,
    quantity: 750,
    dateOfPurchase: "2024-08-03",
  },
  {
    name: "Gin Tanqueray",
    price: 97.01,
    quantity: 750,
    dateOfPurchase: "2024-09-01",
  },
  {
    name: "Gin Bulldog",
    price: 85.73,
    quantity: 750,
    dateOfPurchase: "2024-11-29",
  },
  //#endregion
  //#region SAKE
  {
    name: "Sake",
    price: 49.9,
    quantity: 740,
    dateOfPurchase: "",
  },
  //#endregion
  //#region TEQUILA
  {
    name: "Tequila Silver",
    price: 105.48,
    quantity: 750,
    dateOfPurchase: "",
  },
  //#endregion
  //#region VODKA
  {
    name: "Vodka",
    price: 98.99,
    quantity: 1000,
    dateOfPurchase: "",
  },
  {
    name: "Absolut Vodka",
    price: 98.99,
    quantity: 1000,
    dateOfPurchase: "",
  },
  {
    name: "Vodka Grey Goose",
    price: 98.99,
    quantity: 1000,
    dateOfPurchase: "",
  },
  {
    name: "Vodka Belvedere",
    price: 98.99,
    quantity: 1000,
    dateOfPurchase: "",
  },
  //#endregion
  //#region WHISKY
  {
    name: "Whisky",
    price: 108.8,
    quantity: 750,
    dateOfPurchase: "",
  },
  {
    name: "Whisky Bourbon",
    price: 108.8,
    quantity: 750,
    dateOfPurchase: "",
  },
  {
    name: "Jack Daniels",
    price: 108.8,
    quantity: 750,
    dateOfPurchase: "",
  },
  //#endregion
  //#region MISTOS
  { name: "Gin/Conhaque", price: 150.0, quantity: 750, dateOfPurchase: "" },
  { name: "Gin/Vodka", price: 150.0, quantity: 750, dateOfPurchase: "" },
  //#endregion
];
