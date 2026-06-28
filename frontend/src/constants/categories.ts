export interface Category {
  slug: string;        // URL: /cachaca
  label: string;       // Menu: "Cachaça"
  type: string;        // DB:   "Cachaça"
  icon: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  { slug: "cachaca",     label: "Cachaça",       type: "Cachaça",        icon: "🌿", description: "Bebida tradicional brasileira destilada do caldo de cana-de-açúcar. Versátil e presente nos clássicos tropicais." },
  { slug: "espumante",   label: "Espumante",      type: "Espumante",      icon: "🥂", description: "Vinho com gás carbônico natural. Elegante e festivo, ideal para comemorações." },
  { slug: "gin",         label: "Gin",            type: "Gin",            icon: "🫙", description: "Destilado aromatizado com zimbro e botânicos. Base do clássico gin tônica e de inúmeros coquetéis." },
  { slug: "licor",       label: "Licores",        type: "Licores",        icon: "🍊", description: "Licores e aperitivos que trazem complexidade, doçura e amargor aos coquetéis." },
  { slug: "alkoholfrei", label: "Não Alcoólicos", type: "Não Alcoólicos", icon: "🧃", description: "Opções refrescantes e saborosas para quem prefere evitar álcool, sem abrir mão da complexidade." },
  { slug: "rum",         label: "Rum",            type: "Rum",            icon: "🍹", description: "Destilado caribenho da cana-de-açúcar. Base de clássicos como daiquiri e mojito." },
  { slug: "sake",        label: "Sake",           type: "Sake",           icon: "🍶", description: "Vinho de arroz fermentado japonês. Delicado e aromático, ótimo puro ou em coquetéis." },
  { slug: "tequila",     label: "Tequila",        type: "Tequila",        icon: "🌵", description: "Destilado mexicano do agave azul. Presença marcante no margarita e em coquetéis vibrantes." },
  { slug: "vodka",       label: "Vodka",          type: "Vodka",          icon: "🧊", description: "Destilado de alta pureza e grande versatilidade. Base de inúmeros coquetéis clássicos e modernos." },
  { slug: "whisky",      label: "Whisky",         type: "Whisky",         icon: "🥃", description: "Destilado envelhecido com perfis únicos de sabor. Ótimo puro, com gelo ou em coquetéis robustos." },
];

// Tipos para usar em selects e filtros (ex: NovoDrinkPage)
export const CATEGORY_TYPES = CATEGORIES.map((c) => c.type);
