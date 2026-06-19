export interface Category {
  slug: string;  // URL: /cachaca
  label: string; // Menu: "Cachaça"
  type: string;  // DB:   "Cachaça"
}

export const CATEGORIES: Category[] = [
  { slug: "cachaca",     label: "Cachaça",       type: "Cachaça"       },
  { slug: "espumante",   label: "Espumante",      type: "Espumante"     },
  { slug: "gin",         label: "Gin",            type: "Gin"           },
  { slug: "licor",       label: "Licores",        type: "Licores"       },
  { slug: "alkoholfrei", label: "Não Alcoólicos", type: "Não Alcoólicos"},
  { slug: "rum",         label: "Rum",            type: "Rum"           },
  { slug: "sake",        label: "Sake",           type: "Sake"          },
  { slug: "tequila",     label: "Tequila",        type: "Tequila"       },
  { slug: "vodka",       label: "Vodka",          type: "Vodka"         },
  { slug: "whisky",      label: "Whisky",         type: "Whisky"        },
];

// Tipos para usar em selects e filtros (ex: NovoDrinkPage)
export const CATEGORY_TYPES = CATEGORIES.map((c) => c.type);
