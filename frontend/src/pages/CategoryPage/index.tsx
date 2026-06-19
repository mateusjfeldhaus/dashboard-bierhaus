import { useContext } from "react";
import { useParams } from "react-router-dom";
import { DrinkContext } from "../../providers/drinksContext";
import { DrinkList } from "../../components/DrinkList";
import { StyledDrinkList } from "../../styles/DrinkList";
import { NotFound } from "../404NotFound";

interface CategoryConfig {
  type: string;
  label: string;
  description: string;
}

const CATEGORIES: Record<string, CategoryConfig> = {
  cachaca:     { type: "Cachaça",         label: "Cachaça",        description: "Bebida tradicional brasileira destilada do caldo de cana-de-açúcar. Versátil e presente nos clássicos tropicais." },
  espumante:   { type: "Espumante",        label: "Espumante",      description: "Vinho com gás carbônico natural. Elegante e festivo, ideal para comemorações." },
  gin:         { type: "Gin",              label: "Gin",            description: "Destilado aromatizado com zimbro e botânicos. Base do clássico gin tônica e de inúmeros coquetéis." },
  licor:       { type: "Licores",          label: "Licores",        description: "Licores e aperitivos que trazem complexidade, doçura e amargor aos coquetéis." },
  alkoholfrei: { type: "Não Alcoólicos",   label: "Não Alcoólicos", description: "Opções refrescantes e saborosas para quem prefere evitar álcool, sem abrir mão da complexidade." },
  rum:         { type: "Rum",              label: "Rum",            description: "Destilado caribenho da cana-de-açúcar. Base de clássicos como daiquiri e mojito." },
  sake:        { type: "Sake",             label: "Sake",           description: "Vinho de arroz fermentado japonês. Delicado e aromático, ótimo puro ou em coquetéis." },
  tequila:     { type: "Tequila",          label: "Tequila",        description: "Destilado mexicano do agave azul. Presença marcante no margarita e em coquetéis vibrantes." },
  vodka:       { type: "Vodka",            label: "Vodka",          description: "Destilado de alta pureza e grande versatilidade. Base de inúmeros coquetéis clássicos e modernos." },
  whisky:      { type: "Whisky",           label: "Whisky",         description: "Destilado envelhecido com perfis únicos de sabor. Ótimo puro, com gelo ou em coquetéis robustos." },
};

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { allDrinks } = useContext(DrinkContext);

  const config = CATEGORIES[category ?? ""];
  if (!config) return <NotFound />;

  const drinks = allDrinks.filter((d) => d.type.includes(config.type));

  return (
    <>
      <StyledDrinkList>
        <p>{config.description}</p>
      </StyledDrinkList>
      <DrinkList drinks={drinks} />
    </>
  );
};
