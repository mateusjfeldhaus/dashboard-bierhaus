export interface Category {
  slug: string;  // URL: /cachaca
  label: string; // Menu: "Cachaça"
  type: string;  // DB:   "Cachaça"
  icon: string;
}

export const CATEGORIES: Category[] = [
  { slug: "cachaca",     label: "Cachaça",       type: "Cachaça",        icon: "🌿" },
  { slug: "espumante",   label: "Espumante",      type: "Espumante",      icon: "🥂" },
  { slug: "gin",         label: "Gin",            type: "Gin",            icon: "🫙" },
  { slug: "licor",       label: "Licores",        type: "Licores",        icon: "🍊" },
  { slug: "alkoholfrei", label: "Não Alcoólicos", type: "Não Alcoólicos", icon: "🧃" },
  { slug: "rum",         label: "Rum",            type: "Rum",            icon: "🍹" },
  { slug: "sake",        label: "Sake",           type: "Sake",           icon: "🍶" },
  { slug: "tequila",     label: "Tequila",        type: "Tequila",        icon: "🌵" },
  { slug: "vodka",       label: "Vodka",          type: "Vodka",          icon: "🧊" },
  { slug: "whisky",      label: "Whisky",         type: "Whisky",         icon: "🥃" },
];

// Tipos para usar em selects e filtros (ex: NovoDrinkPage)
export const CATEGORY_TYPES = CATEGORIES.map((c) => c.type);
