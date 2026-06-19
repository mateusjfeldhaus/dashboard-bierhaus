import { IDrink } from "../providers/drinksContext";

// #region MODELO BASE PARA NOVO DRINK
// {
//   name: "",
//   type: [""],
//   ingredients: [{ name: "", quantity: "" }],
//   recipe: "",
//   img: [""],
//   hidden: false,
// },
// #endregion

export const drinksDatabase: IDrink[] = [
  // #region Cachaça
  {
    name: "Caipirinha",
    type: ["Cachaça"],
    ingredients: [
      { name: "Cachaça", quantity: 100 },
      { name: "Xarope Simples", quantity: 50 },
      { name: "Limão", quantity: 1 },
    ],
    recipe:
      "Limão cortado em quartos e levemente amassado para remover o suco. Drink batido servido no Copo Rocks sem coagem.",
    img: ["../../assets/Caipirinha-01.jpg", "../../assets/Caipirinha-02.jpg"],
    hidden: false,
  },
  {
    name: "Rabo de Galo",
    type: ["Cachaça", "Vermouth", "Licores"],
    ingredients: [
      {
        name: "Cachaça",
        quantity: 50,
      },
      { name: "Vermouth Rosso", quantity: 25 },
      { name: "Cynar", quantity: 25 },
    ],
    recipe:
      "Drink montado servido no Copo Rocks com cubo de gelo grande. Finalizado com zest de Limão.",
    img: [
      "../../assets/Rabo de Galo-01.jpg",
      "../../assets/Rabo de Galo-02.jpg",
    ],
    hidden: false,
  },
  {
    name: "Jasmine 2.0",
    type: ["Cachaça", "Licores"],
    ingredients: [
      { name: "Cachaça", quantity: 45 },
      { name: "Suco de Limão", quantity: 22 },
      { name: "Campari", quantity: 7 },
      { name: "Cointreau", quantity: 7 },
      { name: "Xarope Simples", quantity: 7 },
    ],
    recipe:
      "Drink batido com coagem simples servido no Copo Rocks com cubo de gelo novo. Finalizado com twist de laranja.",
    img: [],
    hidden: false,
  },

  // #endregion
  // #region Espumante
  {
    name: "Aperol Spritz",
    type: ["Espumante", "Licores"],
    ingredients: [
      { name: "Espumante", quantity: 120 },
      { name: "Aperol", quantity: 120 },
      { name: "Água com Gás", quantity: 40 },
    ],
    recipe:
      "Drink montado servido na Taça Barone com cubos de gelo. Servir primeiro o espumante e depois o Aperol e a água. Finalizado com 1 fatia de laranja.",
    img: [
      "../../assets/Aperol Spritz-01.jpg",
      "../../assets/Aperol Spritz-02.jpg",
    ],
    hidden: false,
  },
  {
    name: "Celo Spritz",
    type: ["Espumante", "Licores"],
    ingredients: [
      { name: "Limoncello", quantity: 50 },
      { name: "Água com Gás", quantity: 25 },
      { name: "Monin Limão Siciliano", quantity: 20 },
      { name: "Espumante", quantity: 150 },
    ],
    recipe:
      "Drink Montado servido na Taça Barone com cubos de gelo. Finalizado com fatia de limão siciliano a francesa.",
    img: ["../../assets/Celo Spritz-01.jpg", "../../assets/Celo Spritz-02.jpg"],
    hidden: false,
  },
  {
    name: "French 45",
    type: ["Espumante", "Whisky"],
    ingredients: [
      { name: "Whisky Bourbon", quantity: 60 },
      { name: "Suco de Limão", quantity: 30 },
      { name: "Xarope Simples", quantity: 15 },
      { name: "Espumante", quantity: "Completar" },
    ],
    recipe:
      "Drink batido sem o espumante, com dupla coagem servido na Taça resfriada. Completar volume com Espumante",
    img: ["../../assets/French 45-01.jpg", "../../assets/French 45-02.jpg"],
    hidden: true,
  },
  {
    name: "French 75",
    type: ["Espumante", "Gin", "Conhaque"],
    ingredients: [
      { name: "Gin/Conhaque", quantity: 60 },
      { name: "Suco de Limão", quantity: 15 },
      { name: "Xarope Simples", quantity: 10 },
      { name: "Espumante", quantity: 90 },
    ],
    recipe:
      "Drink batido sem o espumante, com dupla coagem servido na Taça Marguerita. Completar com Espumante",
    img: ["../../assets/French 75-01.jpg", "../../assets/French 75-02.jpg"],
    hidden: true,
  },
  {
    name: "Mimosa",
    type: ["Espumante"],
    ingredients: [
      { name: "Suco de Laranja", quantity: 110 },
      { name: "Espumante", quantity: 110 },
    ],
    recipe: "Drink montado em uma Taça de Champanhe resfriada.",
    img: ["../../assets/Mimosa-01.jpg", "../../assets/Mimosa-02.jpg"],
    hidden: false,
  },
  {
    name: "Old Cuban",
    type: ["Espumante", "Rum"],
    ingredients: [
      { name: "Hortelã", quantity: 8 },
      { name: "Rum", quantity: 60 },
      { name: "Suco de Limão", quantity: 30 },
      { name: "Xarope Simples", quantity: 15 },
      { name: "Angostura", quantity: 2 },
      { name: "Espumante", quantity: "Completar" },
    ],
    recipe:
      "Hortelã levemente macerada. Drink batido sem o espumante, com dupla coagem servido na Taça Marguerita resfriada. Completar com Espumante. Finalizado com casca de limão e folha de hortelã.",
    img: ["../../assets/Old Cuban-01.jpg", "../../assets/Old Cuban-02.jpg"],
    hidden: true,
  },
  // #endregion
  // #region Gin
  {
    name: "Gin and Tonic",
    type: ["Gin", "Tônica"],
    ingredients: [
      { name: "Gin", quantity: 50 },
      { name: "Tônica", quantity: "Completar" },
    ],
    recipe:
      "Drink Montado servido na Taça Barone com cubos de gelo. Finalizado com zest de laranja, ½ fatia de laranja e ramo de alecrim.",
    img: ["../../assets/Gin Tonica-01.jpg", "../../assets/Gin Tonica-02.jpg"],
    hidden: false,
  },
  {
    name: "Gin e Redbull Sabores",
    type: ["Gin"],
    ingredients: [
      { name: "Gin", quantity: 50 },
      { name: "Redbull", quantity: 1 },
    ],
    recipe:
      "Drink montado em uma Taça Barone com cubos de gelo. Finalizado com Rodela de Laranja.",
    img: ["../../assets/Gin Redbull-01.jpg", "../../assets/Gin Redbull-02.jpg"],
    hidden: false,
  },
  {
    name: "Gin Tropical",
    type: ["Gin"],
    ingredients: [
      { name: "Gin", quantity: 50 },
      { name: "Suco de Laranja", quantity: 50 },
      { name: "Redbull Tropical", quantity: 1 },
    ],
    recipe:
      "Drink montado em uma Taça Barone com cubos de gelo. Finalizado com Rodela de Laranja.",
    img: [
      "../../assets/Gin Tropical-01.jpg",
      "../../assets/Gin Tropical-02.jpg",
    ],
    hidden: false,
  },
  {
    name: "Negroni",
    type: ["Gin", "Licores", "Vermouth"],
    ingredients: [
      { name: "Gin", quantity: 50 },
      { name: "Campari", quantity: 50 },
      { name: "Vermouth Rosso", quantity: 50 },
    ],
    recipe:
      "Drink Mexido com coagem simples servido no Copo Rocks com cubo de gelo grande. Finalizado com fatia de laranja e zest de laranja.",
    img: ["../../assets/Negroni-01.jpg", "../../assets/Negroni-02.jpg"],
    hidden: false,
  },
  {
    name: "Gin Collins",
    type: ["Gin", "Tônica"],
    ingredients: [
      { name: "Gin", quantity: 50 },
      { name: "Monin Gengibre", quantity: 20 },
      { name: "Suco de Limão", quantity: 20 },
      { name: "Tônica", quantity: "Completar" },
    ],
    recipe:
      "Drink montado servido na Taça Barone com cubos de gelo. Finalizado com rodela de limão e lâmina de gengibre.",
    img: ["../../assets/Gin Collins-01.jpg", "../../assets/Gin Collins-02.jpg"],
    hidden: false,
  },
  {
    name: "Bramble Black",
    type: ["Gin"],
    ingredients: [
      { name: "Gin", quantity: 100 },
      { name: "Suco de Limão", quantity: 40 },
      { name: "Xarope Simples", quantity: 20 },
      { name: "Monin Sabores", quantity: 20 },
    ],
    recipe:
      "Drink batido com coagem simples servido no Copo Rocks com cubo de gelo grande.",
    img: [
      "../../assets/Bramble Black-01.jpg",
      "../../assets/Bramble Black-02.jpg",
    ],
    hidden: true,
  },
  {
    name: "Blue Lady",
    type: ["Gin", "Triple Sec"],
    ingredients: [
      { name: "Curaçau Blue", quantity: 75 },
      { name: "Gin", quantity: 50 },
      { name: "Suco de Limão Siciliano", quantity: 40 },
      { name: "Clara de Ovo", quantity: 1 },
    ],
    recipe:
      "Drink batido duplamente, primeiramente com Dry Shake, com coagem dupla servido na Taça Coupe/Marguerita gelada. Finalizado com zest de laranja.",
    img: ["../../assets/Blue Lady-01.jpg", "../../assets/Blue Lady-02.jpg"],
    hidden: false,
  },
  {
    name: "Dry Martini",
    type: ["Gin", "Vermouth", "Vodka"],
    ingredients: [
      { name: "Gin/Vodka", quantity: 60 },
      { name: "Dry Vermouth", quantity: 7 },
    ],
    recipe: "Drink mexido com dupla coagem servido na Taça Martini gelada.",
    img: ["../../assets/Dry Martini-01.jpg", "../../assets/Dry Martini-02.jpg"],
    hidden: false,
  },
  {
    name: "Fitzgerald",
    type: ["Gin"],
    ingredients: [
      { name: "Gin", quantity: 80 },
      { name: "Xarope Simples", quantity: 30 },
      { name: "Suco de Limão Siciliano", quantity: 30 },
      { name: "Angostura", quantity: 4 },
    ],
    recipe:
      "Drink batido coado duplamente no Copo Rocks com cubo de gelo grande. Finalizado com zest de limão siciliano.",
    img: ["../../assets/Fitzgerald-01.jpg", "../../assets/Fitzgerald-02.jpg"],
    hidden: false,
  },
  {
    name: "Bronx",
    type: ["Gin", "Vermmouth"],
    ingredients: [
      { name: "Gin", quantity: 50 },
      { name: "Dry Vermouth", quantity: 20 },
      { name: "Vermouth Rosso", quantity: 20 },
      { name: "Suco de Laranja", quantity: 30 },
      { name: "Angostura de Laranja", quantity: 3 },
    ],
    recipe:
      "Drink batido com dupla coagem, servido na Taça Martini gelada. Finalizado com casca de laranja.",
    img: ["../../assets/Bronx-01.jpg", "../../assets/Bronx-02.jpg"],
    hidden: false,
  },
  {
    name: "Tan Tan",
    type: ["Gin", "Vermouth"],
    ingredients: [
      { name: "Gin", quantity: 50 },
      { name: "Campari", quantity: 30 },
      { name: "Monin Gengibre", quantity: 10 },
      { name: "Água Tônica", quantity: "Completar" }
    ],
    recipe: "Drink montado em uma Taça Barone com bastante gelo",
    img: [],
    hidden: false
  },
  {
    name: "Tom Collins",
    type: ["Gin"],
    ingredients: [
      { name: "Gin", quantity: 50 },
      { name: "Suco de Limão Siciliano", quantity: 25 },
      { name: "Xarope Simples", quantity: 15 },
      { name: "Água com Gás", quantity: "Completar" },
    ],
    recipe:
      "Drink montado em Copo Longo com cubos de gelo. Finalizado com rodela de limão.",
    img: [],
    hidden: false,
  },
  {
    name: "Clover Club",
    type: ["Gin"],
    ingredients: [
      { name: "Gin", quantity: 60 },
      { name: "Suco de Limão", quantity: 20 },
      { name: "Grenadine", quantity: 15 },
      { name: "Clara de Ovo", quantity: 1 },
    ],
    recipe:
      "Dry shake primeiro sem gelo. Adicionar gelo e bater novamente. Servido com dupla coagem na Taça Coupe gelada. Finalizado com 3 framboesas.",
    img: [],
    hidden: false,
  },
  // #endregion
  // #region Licores
  {
    name: "Carajillo",
    type: ["Licores"],
    ingredients: [
      { name: "Licor 43", quantity: 50 },
      { name: "Café Expresso", quantity: 50 },
    ],
    recipe:
      "Drink batido com coagem simples servido no Copo Rocks com cubo de gelo grande.",
    img: ["../../assets/Carajillo-01.jpg", "../../assets/Carajillo-02.jpg"],
    hidden: false,
  },
  {
    name: "Folha Experience",
    type: ["Licores"],
    ingredients: [
      { name: "Licor 43", quantity: 100 },
      { name: "Monin Rantcho", quantity: 40 },
    ],
    recipe:
      "Drink batido com coagem simples servido no Copo Rocks com cubo de gelo grande. Finalizado com espuma de limão siciliano e raspas de limão siciliano.",
    img: [
      "../../assets/Folha Experience-01.jpg",
      "../../assets/Folha Experience-02.jpg",
    ],
    hidden: false,
  },
  {
    name: "Campari Tonic",
    type: ["Licores", "Tônica"],
    ingredients: [
      { name: "Campari", quantity: 70 },
      { name: "Água Tônica", quantity: 210 },
    ],
    recipe:
      "Drink montado servido na Taça Barone com cubos de gelo. Finalizado com fatia de laranja.",
    img: [
      "../../assets/Campari Tonic-01.jpg",
      "../../assets/Campari Tonic-02.jpg",
    ],
    hidden: false,
  },
  // #endregion
  // #region Alkoholfrei
  {
    name: "Soda Italiana",
    type: ["Não Alcoólicos"],
    ingredients: [
      { name: "Monin Sabores", quantity: 50 },
      { name: "Suco de Limão", quantity: 25 },
      { name: "Água com Gás", quantity: "Completar" },
    ],
    recipe:
      "Drink montado servido no Copo Longo com cubos de gelo. Finalizado com fatia de limão siciliano a francesa.",
    img: [
      "../../assets/Soda Italiana-01.jpg",
      "../../assets/Soda Italiana-02.jpg",
    ],
    hidden: false,
  },
  {
    name: "Ice Tea",
    type: ["Não Alcoólicos"],
    ingredients: [
      { name: "Monin Sabores", quantity: 50 },
      { name: "Suco de Limão", quantity: 25 },
      { name: "Água sem Gás", quantity: "Completar" },
    ],
    recipe:
      "Drink montado servido no Copo Longo com cubos de gelo. Finalizado com fatia de limão siciliano a francesa.",
    img: ["../../assets/Ice Tea-01.jpg", "../../assets/Ice Tea-02.jpg"],
    hidden: false,
  },
  {
    name: "Pink Lemonade",
    type: ["Não Alcoólicos"],
    ingredients: [
      { name: "Monin Grenadine", quantity: 50 },
      { name: "Suco de Limão", quantity: 25 },
      { name: "Água com Gás", quantity: "Completar" },
    ],
    recipe: "Drink montado servido no Copo Longo com cubos de gelo.",
    img: [
      "../../assets/Pink Lemonade-01.jpg",
      "../../assets/Pink Lemonade-02.jpg",
    ],
    hidden: true,
  },
  // #endregion
  // #region Rum
  {
    name: "Mojito",
    type: ["Rum"],
    ingredients: [
      { name: "Rum", quantity: 60 },
      { name: "Xarope Simples", quantity: 30 },
      { name: "Suco de Limão", quantity: 35 },
      { name: "Hortelã", quantity: 8 },
      { name: "Água com Gás", quantity: "Completar" },
    ],
    recipe:
      "Hortelã levemente Macerada no shaker. Drink batido sem a água com gás, servido no Copo Longo com cubos de gelo sem coagem. Finalizado com água com gás até o topo e levemente mexido.",
    img: ["../../assets/Mojito-01.jpg", "../../assets/Mojito-02.jpg"],
    hidden: false,
  },
  {
    name: "Cold Kiss",
    type: ["Rum", "Vodka"],
    ingredients: [
      { name: "Vodka", quantity: 20 },
      { name: "Rum Malibu", quantity: 50 },
      { name: "Monin Menta Glacial", quantity: 20 },
      { name: "Monin Limão Siciliano", quantity: 20 },
      { name: "Água de Coco", quantity: 50 },
    ],
    recipe:
      "Drink batido, servido no Copo Longo, com cubos de gelo. Finalizado com espuma de gengibre e ramo de hortelã.",
    img: ["../../assets/Cold Kiss-01.jpg", "../../assets/Cold Kiss-02.jpg"],
    hidden: false,
  },
  {
    name: "Piña Colada",
    type: ["Rum"],
    ingredients: [
      { name: "Rum", quantity: 60 },
      { name: "Suco de Abacaxi", quantity: 100 },
      { name: "Leite de Coco", quantity: 50 },
      { name: "Leite Condensado", quantity: 30 },
    ],
    recipe:
      "Drink batido com simples coagem servido no Copo Longo com cubos de gelo. Finalizado com fatia de abacaxi e cereja.",
    img: ["../../assets/Pina Colada-01.jpg", "../../assets/Pina Colada-02.jpg"],
    hidden: true,
  },
  {
    name: "Queens Park Swizzle",
    type: ["Rum"],
    ingredients: [
      { name: "Rum", quantity: 60 },
      { name: "Xarope Simples", quantity: 30 },
      { name: "Suco de Limão", quantity: 30 },
      { name: "Angostura", quantity: 2 },
    ],
    recipe:
      "Drink batido, com dupla coagem, servido na Taça Martini resfriada.",
    img: [
      "../../assets/Queens Park Swizzle-01.jpg",
      "../../assets/Queens Park Swizzle-02.jpg",
    ],
    hidden: false,
  },
  {
    name: "Daiquiri",
    type: ["Rum"],
    ingredients: [
      { name: "Rum", quantity: 60 },
      { name: "Suco de Limão Siciliano", quantity: 20 },
      { name: "Xarope Simples", quantity: 20 },
    ],
    recipe:
      "Drink batido com dupla coagem servido na Taça Martini gelada. Finalizado com zest de limão siciliano.",
    img: ["../../assets/Daiquiri-01.jpg", "../../assets/Daiquiri-02.jpg"],
    hidden: false,
  },
  {
    name: "Cointreau Daiquiri",
    type: ["Rum", "Triple Sec"],
    ingredients: [
      { name: "Rum", quantity: 40 },
      { name: "Suco de Limão", quantity: 40 },
      { name: "Xarope Simples", quantity: 20 },
      { name: "Cointreau", quantity: 20 },
    ],
    recipe:
      "Drink batido com simples coagem servido no Copo Longo com cubos de gelo. Finalizado com fatia de limão.",
    img: [
      "../../assets/Cointreau Daiquiri-01.jpg",
      "../../assets/Cointreau Daiquiri-02.jpg",
    ],
    hidden: false,
  },
  {
    name: "Jungle Bird",
    type: ["Rum", "Licores"],
    ingredients: [
      { name: "Rum", quantity: 45 },
      { name: "Campari", quantity: 20 },
      { name: "Suco de Abacaxi", quantity: 45 },
      { name: "Suco de Limão", quantity: 15 },
      { name: "Xarope Simples", quantity: 15 },
    ],
    recipe:
      "Drink batido com coagem simples servido no Copo Rocks com cubo de gelo grande.",
    img: [],
    hidden: false,
  },
  // #endregion
  // #region Sake
  {
    name: "Spicy Dreams",
    type: ["Sake", "Licores"],
    ingredients: [
      { name: "Sake", quantity: 100 },
      { name: "Aperol", quantity: 50 },
      { name: "Monin Limão Siciliano", quantity: 60 },
      { name: "Monin Rantcho", quantity: 30 },
      { name: "Pimenta Rosa", quantity: "Pitada" },
    ],
    recipe:
      "Pimenta Macerada. Drink batido com dupla coagem servido na Taça com cubos de gelo. Finalizado com rodela de limão e pimenta rosa.",
    img: [
      "../../assets/Spicy Dreams-01.jpg",
      "../../assets/Spicy Dreams-02.jpg",
    ],
    hidden: false,
  },
  {
    name: "Sakerinha de Maracujá",
    type: ["Sake"],
    ingredients: [
      { name: "Sake", quantity: 100 },
      { name: "Xarope Simples", quantity: 50 },
      { name: "Maracujá in Natura", quantity: 50 },
    ],
    recipe:
      "Drink batido, com dupla coagem, servido no Copo Rocks com cubo de gelo.",
    img: [
      "../../assets/Sakerinha de Maracuja-01.jpg",
      "../../assets/Sakerinha de Maracuja-02.jpg",
    ],
    hidden: false,
  },
  {
    name: "Japanese Ice Tea",
    type: ["Sake"],
    ingredients: [
      { name: "Sake", quantity: 50 },
      { name: "Monin Sabores", quantity: 20 },
      { name: "Água com Gás", quantity: "Completar" },
    ],
    recipe:
      "Drink montado servido no Copo Longo com cubos de gelo. Finalizado com fatia de limão siciliano a francesa.",
    img: [
      "../../assets/Japanese Ice Tea-01.jpg",
      "../../assets/Japanese Ice Tea-02.jpg",
    ],
    hidden: false,
  },
  // #endregion
  // #region Tequila
  {
    name: "Margarita",
    type: ["Tequila", "Triple Sec"],
    ingredients: [
      { name: "Tequila Silver", quantity: 50 },
      { name: "Suco de Limão", quantity: 20 },
      { name: "Cointreau", quantity: 25 },
    ],
    recipe:
      "Drink batido com dupla coagem servido na Taça Margarita levemente resfriada. Finalizado com borda de sal e fatia de limão na borda.",
    img: ["../../assets/Margarita-01.jpg", "../../assets/Margarita-02.jpg"],
    hidden: false,
  },
  {
    name: "Blue Velvet Margarita",
    type: ["Tequila", "Triple Sec"],
    ingredients: [
      { name: "Tequila Silver", quantity: 60 },
      { name: "Curaçau Blue", quantity: 30 },
      { name: "Suco de Limão", quantity: 30 },
      { name: "Cointreau", quantity: 15 },
    ],
    recipe:
      "Drink batido, com dupla coagem, servido na Taça Margarita levemente resfriada. Finalizado com borda de sal e fatia de limão na borda.",
    img: [
      "../../assets/Blue Velvet Margarita-01.jpg",
      "../../assets/Blue Velvet Margarita-02.jpg",
    ],
    hidden: false,
  },
  {
    name: "Teqroni",
    type: ["Tequila", "Campari", "Vermouth"],
    ingredients: [
      { name: "Tequila Silver", quantity: 50 },
      { name: "Campari", quantity: 50 },
      { name: "Vermouth Rosso", quantity: 50 },
    ],
    recipe:
      "Drink Mexido com coagem simples, servido no Copo Rocks, com cubo de gelo grande. Finalizado com fatia e zest de laranja.",
    img: ["../../assets/Teqroni-01.jpg", "../../assets/Teqroni-02.jpg"],
    hidden: true,
  },
  {
    name: "Long Island Ice Tea",
    type: ["Tequila", "Gin", "Vodka", "Rum", "Triple Sec"],
    ingredients: [
      { name: "Tequila Silver", quantity: 10 },
      { name: "Gin", quantity: 10 },
      { name: "Vodka", quantity: 10 },
      { name: "Rum", quantity: 10 },
      { name: "Cointreau", quantity: 10 },
      { name: "Xarope Simples", quantity: 15 },
      { name: "Suco de Limão", quantity: 15 },
      { name: "Coca-Cola", quantity: "Completar" },
    ],
    recipe:
      "Drink batido, com simples coagem, servido em Copo Longo, com cubos de gelo.",
    img: [
      "../../assets/Long Island Ice Tea-01.jpg",
      "../../assets/Long Island Ice Tea-02.jpg",
    ],
    hidden: true,
  },
  {
    name: "Tequila Sunrise",
    type: ["Tequila"],
    ingredients: [
      { name: "Tequila Silver", quantity: 50 },
      { name: "Grenadine", quantity: 10 },
      { name: "Suco de Laranja", quantity: "Completar" },
    ],
    recipe:
      "Drink montado servido no Copo Longo com cubos de gelo. Finalizado com fatia de laranja e cereja.",
    img: [
      "../../assets/Tequila Sunrise-01.jpg",
      "../../assets/Tequila Sunrise-02.jpg",
    ],
    hidden: true,
  },
  {
    name: "Matador",
    type: ["Tequila"],
    ingredients: [
      { name: "Tequila Silver", quantity: 50 },
      { name: "Suco de Abacaxi", quantity: 100 },
      { name: "Suco de Limão", quantity: 20 },
    ],
    recipe:
      "Drink batido com coagem simples servido na Taça Margarita levemente resfriada.",
    img: ["../../assets/Matador-01.jpg", "../../assets/Matador-02.jpg"],
    hidden: true,
  },
  {
    name: "Mexican Mule",
    type: ["Tequila"],
    ingredients: [
      { name: "Tequila Silver", quantity: 50 },
      { name: "Suco de Limão", quantity: 25 },
      { name: "Monin Gengibre", quantity: 15 },
      { name: "Água com Gás", quantity: "Completar" },
    ],
    recipe:
      "Drink montado servido no Copo Moscow Mule com cubos de gelo. Finalizado com rodela de limão.",
    img: [
      "../../assets/Mexican Mule-01.jpg",
      "../../assets/Mexican Mule-02.jpg",
    ],
    hidden: true,
  },
  // #endregion
  // #region Vodka
  {
    name: "Moscow Mule",
    type: ["Vodka"],
    ingredients: [
      { name: "Vodka", quantity: 50 },
      { name: "Suco de Limão", quantity: 40 },
      { name: "Monin Gengibre", quantity: 30 },
      { name: "Xarope Simples", quantity: 20 },
    ],
    recipe:
      "Drink batido servido no Copo Moscow Mule com coagem simples e cubo de gelo grande. Finalizado com espuma de gengibre e raspas de limão.",
    img: ["../../assets/Moscow Mule-01.jpg", "../../assets/Moscow Mule-02.jpg"],
    hidden: false,
  },
  {
    name: "Vodka Soda",
    type: ["Vodka"],
    ingredients: [
      { name: "Vodka", quantity: 50 },
      { name: "Suco de Limão", quantity: 15 },
      { name: "Água com Gás", quantity: "Completar" },
    ],
    recipe:
      "Drink montado em um Copo Rocks, com cubo de gelo grande. Finalizado com 2 rodelas de limão.",
    img: ["../../assets/Vodka Soda-01.jpg", "../../assets/Vodka Soda-02.jpg"],
    hidden: false,
  },
  {
    name: "Espresso Martini",
    type: ["Vodka", "Licores"],
    ingredients: [
      { name: "Vodka", quantity: 50 },
      { name: "Licor Kahluá", quantity: 30 },
      { name: "Café Expresso", quantity: 50 },
    ],
    recipe: "Drink batido, servido na Taça Martini gelada, com dupla coagem.",
    img: [
      "../../assets/Espresso Martini-01.jpg",
      "../../assets/Espresso Martini-02.jpg",
    ],
    hidden: false,
  },
  {
    name: "Lagoa Azul",
    type: ["Vodka", "Triple Sec"],
    ingredients: [
      { name: "Vodka", quantity: 50 },
      { name: "Curaçau Blue", quantity: 30 },
      { name: "Suco de Limão", quantity: 20 },
      { name: "Club Soda", quantity: "Completar" },
    ],
    recipe:
      "Drink montado, servido no Copo Longo, com cubos de gelo. Finalizado com rodela de laranja.",
    img: ["../../assets/Lagoa Azul-01.jpg", "../../assets/Lagoa Azul-02.jpg"],
    hidden: false,
  },
  {
    name: "Sex on the Beach",
    type: ["Vodka"],
    ingredients: [
      { name: "Vodka", quantity: 50 },
      { name: "Licor de Pêssego", quantity: 20 },
      { name: "Suco de Laranja", quantity: 60 },
      { name: "Suco de Cranberry", quantity: 60 },
    ],
    recipe:
      "Drink montado servido no Copo Longo com cubos de gelo. Finalizado com fatia de laranja.",
    img: [
      "../../assets/Sex on the Beach-01.jpg",
      "../../assets/Sex on the Beach-02.jpg",
    ],
    hidden: true,
  },
  {
    name: "Black Russian",
    type: ["Vodka"],
    ingredients: [
      { name: "Vodka", quantity: 50 },
      { name: "Licor de Café", quantity: 20 },
    ],
    recipe:
      "Drink montado servido no Copo Rocks com cubo de gelo grande. Finalizado com zest de limão siciliano.",
    img: [
      "../../assets/Black Russian-01.jpg",
      "../../assets/Black Russian-02.jpg",
    ],
    hidden: true,
  },
  {
    name: "Lemon Drop",
    type: ["Vodka"],
    ingredients: [
      { name: "Vodka", quantity: 50 },
      { name: "Suco de Limão", quantity: 20 },
      { name: "Xarope Simples", quantity: 20 },
    ],
    recipe:
      "Drink batido servido na Taça Martini levemente resfriada. Finalizado com zest de limão.",
    img: ["../../assets/Lemon Drop-01.jpg", "../../assets/Lemon Drop-02.jpg"],
    hidden: true,
  },
  {
    name: "Cosmopolitan",
    type: ["Vodka", "Triple Sec"],
    ingredients: [
      { name: "Vodka", quantity: 40 },
      { name: "Cointreau", quantity: 30 },
      { name: "Suco de Limão", quantity: 20 },
      { name: "Suco de Cranberry", quantity: 20 },
    ],
    recipe:
      "Drink batido com dupla coagem servido na Taça Martini levemente resfriada. Finalizado com zest de limão siciliano.",
    img: [
      "../../assets/Cosmopolitan-01.jpg",
      "../../assets/Cosmopolitan-02.jpg",
    ],
    hidden: true,
  },
  // #endregion
  // #region Whisky
  {
    name: "Old Fashioned",
    type: ["Whisky"],
    ingredients: [
      { name: "Whisky Bourbon", quantity: 100 },
      { name: "Xarope Simples", quantity: 10 },
      { name: "Angostura", quantity: 6 },
    ],
    recipe:
      "Drink mexido servido no Copo Rocks com cubo de gelo grande. Finalizado com zest de laranja.",
    img: [
      "../../assets/Old Fashioned-01.jpg",
      "../../assets/Old Fashioned-02.jpg",
    ],
    hidden: false,
  },
  {
    name: "Manhattan",
    type: ["Whisky", "Vermouth"],
    ingredients: [
      { name: "Whisky Bourbon", quantity: 100 },
      { name: "Vermouth Rosso", quantity: 40 },
      { name: "Angostura", quantity: 6 },
    ],
    recipe:
      "Drink mexido servido na Taça Coupe levemente resfriada. Finalizado com cereja.",
    img: ["../../assets/Manhattan-01.jpg", "../../assets/Manhattan-02.jpg"],
    hidden: false,
  },
  {
    name: "Whisky Sour",
    type: ["Whisky"],
    ingredients: [
      { name: "Whisky Bourbon", quantity: 50 },
      { name: "Suco de Limão", quantity: 20 },
      { name: "Xarope Simples", quantity: 15 },
      { name: "Clara de Ovo", quantity: 1 },
    ],
    recipe:
      "Drink batido duplamente, primeiro em Dry Shake e depois com gelo, servido no Copo Rocks com dupla coagem e cubo de gelo grande. Finalizado com zest de limão.",
    img: ["../../assets/Whisky Sour-01.jpg", "../../assets/Whisky Sour-02.jpg"],
    hidden: false,
  },
  {
    name: "Boulevardier",
    type: ["Whisky", "Licores", "Vermouth"],
    ingredients: [
      { name: "Whisky Bourbon", quantity: 50 },
      { name: "Campari", quantity: 50 },
      { name: "Vermouth Rosso", quantity: 50 },
    ],
    recipe:
      "Drink mexido servido no Copo Rocks com cubo de gelo grande. Finalizado com fatia e zest de laranja.",
    img: [
      "../../assets/Boulevardier-01.jpg",
      "../../assets/Boulevardier-02.jpg",
    ],
    hidden: false,
  },
  {
    name: "John Collins",
    type: ["Whisky"],
    ingredients: [
      { name: "Whisky Bourbon", quantity: 50 },
      { name: "Suco de Limão", quantity: 20 },
      { name: "Xarope Simples", quantity: 20 },
      { name: "Club Soda", quantity: "Completar" },
    ],
    recipe:
      "Drink montado servido no Copo Longo com cubos de gelo. Finalizado com fatia de limão.",
    img: [
      "../../assets/John Collins-01.jpg",
      "../../assets/John Collins-02.jpg",
    ],
    hidden: true,
  },
  {
    name: "Johnnie Highball",
    type: ["Whisky"],
    ingredients: [
      { name: "Whisky", quantity: 40 },
      { name: "Água de Coco", quantity: 40 },
      { name: "Tônica", quantity: "Completar" },
    ],
    recipe:
      "Drink Montado, em um Copo Longo, com cubos de gelo. Finalizado com fatia de Limão.",
    img: [
      "../../assets/Johnnie Highball-01.jpg",
      "../../assets/Johnnie Highball-02.jpg",
    ],
    hidden: true,
  },
  {
    name: "Tratto Limoncello",
    type: ["Whisky", "Licores", "Vermouth"],
    ingredients: [
      { name: "Whisky Bourbon", quantity: 45 },
      { name: "Limoncello", quantity: 45 },
      { name: "Dry Vermouth", quantity: 15 },
      { name: "Angostura", quantity: 1 },
      { name: "Angostura de Laranja", quantity: 1 },
    ],
    recipe:
      "Drink mexido servido no Copo Rocks com cubo de gelo grande. Finalizado com Casca de Laranja",
    img: [
      "../../assets/Tratto Limoncello-01.jpg",
      "../../assets/Tratto Limoncello-02.jpg",
    ],
    hidden: false,
  },
  {
    name: "Long Island",
    type: ["Whisky"],
    ingredients: [
      { name: "Whisky", quantity: 50 },
      { name: "Cha Matte", quantity: 200 },
    ],
    recipe: "Drink montado no Copo Rocks com cubo de gelo grande.",
    img: ["../../assets/Long Island-01.jpg", "../../assets/Long Island-02.jpg"],
    hidden: false,
  },
  {
    name: "Jack and Coke",
    type: ["Whisky"],
    ingredients: [
      { name: "Jack Daniels", quantity: 50 },
      { name: "Coca Cola", quantity: "Completar" },
    ],
    recipe: "Drink montado no Copo Longo com cubos de gelo",
    img: [
      "../../assets/Jack and Coke-01.jpg",
      "../../assets/Jack and Coke-02.jpg",
    ],
    hidden: false,
  },
  {
    name: "Mark Twain",
    type: ["Whisky"],
    ingredients: [
      { name: "Scotch Whisky", quantity: 80 },
      { name: "Xarope Simples", quantity: 30 },
      { name: "Suco de Limão Siciliano", quantity: 30 },
      { name: "Angostura", quantity: 4 },
    ],
    recipe:
      "Drink batido coado duplamente no Copo Rocks com cubo de gelo grande. Finalizado com zest de limão siciliano.",
    img: [],
    hidden: false,
  },
  {
    name: "Rob Roy",
    type: ["Whisky", "Vermouth"],
    ingredients: [
      { name: "Scotch Whisky", quantity: 60 },
      { name: "Vermouth Rosso", quantity: 30 },
      { name: "Angostura", quantity: 2 },
    ],
    recipe:
      "Drink mexido servido na Taça Coupe levemente resfriada. Finalizado com cereja.",
    img: [],
    hidden: false,
  },
  {
    name: "Paper Plane",
    type: ["Whisky", "Licores"],
    ingredients: [
      { name: "Whisky Bourbon", quantity: 30 },
      { name: "Aperol", quantity: 30 },
      { name: "Cointreau", quantity: 30 },
      { name: "Suco de Limão", quantity: 30 },
    ],
    recipe:
      "Drink batido com dupla coagem servido na Taça Coupe levemente resfriada.",
    img: [],
    hidden: false,
  },

  // #endregion
  // Drinks Adicionados em 15/11/2025, Preciso categorizar depois

  {
    name: "Americano",
    type: ["Licores", "Vermouth"],
    ingredients: [
      { name: "Campari", quantity: 50 },
      { name: "Vermouth Rosso", quantity: 50 },
      { name: "Água com gás", quantity: 50 }
    ],
    recipe: "Drink montado num copo rocks. Finalizado com fatia de laranja",
    img: [""],
    hidden: false,
  },
  {
    name: "The Original Moscow Mule",
    type: ["Vodka"],
    ingredients: [
      { name: "Vodka", quantity: 60 },
      { name: "Suco de Limão", quantity: 25 },
      { name: "Ginger Soda", quantity: "Completar" }],
    recipe: "Drink montado em uma caneca de cobre. Finalizado com fatia de limão",
    img: [""],
    hidden: false
  },
  {
    name: "Penicilin",
    type: ["Whisky"],
    ingredients: [
      { name: "Scotch Whisky", quantity: 60 },
      { name: "Fatia de Gengibre", quantity: 3 },
      { name: "Suco de Limão Siciliano", quantity: 20 },
      { name: "Xarope de mel 3:1", quantity: 20 }
    ],
    recipe: "Amassar levemente as fatias de gengibre. Drink batido, com dupla coação, servido no copo rocks com cubo de gelo grande",
    img: [""],
    hidden: false
  }




];




