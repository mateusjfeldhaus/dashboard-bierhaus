import { useContext } from "react";
import { useParams } from "react-router-dom";
import { DrinkContext } from "../../providers/drinksContext";
import { CATEGORIES } from "../../constants/categories";
import { DrinkList } from "../../components/DrinkList";
import { DrinkGridSkeleton } from "../../components/Skeleton";
import { StyledDrinkList } from "../../styles/DrinkList";
import { NotFound } from "../404NotFound";

const DESCRIPTIONS: Record<string, string> = {
  cachaca:     "Bebida tradicional brasileira destilada do caldo de cana-de-açúcar. Versátil e presente nos clássicos tropicais.",
  espumante:   "Vinho com gás carbônico natural. Elegante e festivo, ideal para comemorações.",
  gin:         "Destilado aromatizado com zimbro e botânicos. Base do clássico gin tônica e de inúmeros coquetéis.",
  licor:       "Licores e aperitivos que trazem complexidade, doçura e amargor aos coquetéis.",
  alkoholfrei: "Opções refrescantes e saborosas para quem prefere evitar álcool, sem abrir mão da complexidade.",
  rum:         "Destilado caribenho da cana-de-açúcar. Base de clássicos como daiquiri e mojito.",
  sake:        "Vinho de arroz fermentado japonês. Delicado e aromático, ótimo puro ou em coquetéis.",
  tequila:     "Destilado mexicano do agave azul. Presença marcante no margarita e em coquetéis vibrantes.",
  vodka:       "Destilado de alta pureza e grande versatilidade. Base de inúmeros coquetéis clássicos e modernos.",
  whisky:      "Destilado envelhecido com perfis únicos de sabor. Ótimo puro, com gelo ou em coquetéis robustos.",
};

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { allDrinks, loading } = useContext(DrinkContext);

  const config = CATEGORIES.find((c) => c.slug === category);
  if (!config) return <NotFound />;

  const drinks = allDrinks.filter((d) => d.type.includes(config.type));

  return (
    <>
      <StyledDrinkList>
        <p>{DESCRIPTIONS[config.slug]}</p>
      </StyledDrinkList>
      {loading ? <DrinkGridSkeleton count={6} /> : <DrinkList drinks={drinks} />}
    </>
  );
};
