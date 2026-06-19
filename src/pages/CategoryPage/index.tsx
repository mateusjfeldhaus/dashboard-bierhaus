import { useContext } from "react";
import { useParams } from "react-router-dom";
import { DrinkContext, IDrink, IDrinkContext } from "../../providers/drinksContext";
import { DrinkList } from "../../components/DrinkList";
import { StyledDrinkList } from "../../styles/DrinkList";
import { NotFound } from "../404NotFound";

interface CategoryConfig {
  label: string;
  descriptions: string[];
  getList: (ctx: IDrinkContext) => IDrink[];
}

const categories: Record<string, CategoryConfig> = {
  cachaca: {
    label: "Cachaca",
    descriptions: [
      "A cachaca e uma bebida tradicional brasileira, destilada a partir do caldo de cana-de-acucar. Conhecida por sua versatilidade, e frequentemente usada em coqueteis tropicais e caipirinhas.",
    ],
    getList: (ctx) => ctx.cachacaList,
  },
  espumante: {
    label: "Espumante",
    descriptions: [
      "Celebrado por suas borbulhas refrescantes, o espumante e um vinho com gas carbonico natural. Elegante e festivo, e ideal para comemoracoes e momentos especiais.",
    ],
    getList: (ctx) => ctx.espumanteList,
  },
  gin: {
    label: "Gin",
    descriptions: [
      "Um destilado aromatizado com zimbro e uma variedade de botanicos, o gin e conhecido por sua complexidade e versatilidade em coqueteis classicos como o gin tonic.",
    ],
    getList: (ctx) => ctx.ginList,
  },
  licor: {
    label: "Licores",
    descriptions: [
      "Aperol: Um licor italiano de cor vibrante, amargo e doce ao mesmo tempo. E o ingrediente chave no famoso Aperol Spritz, um simbolo do verao europeu.",
      "Martini: Um classico entre os coqueteis, geralmente associado ao gin ou vodka e vermute. Elegante e sofisticado.",
      "Licor 43: Uma bebida espanhola feita com 43 ingredientes naturais como baunilha, citricos e especiarias. Ideal puro ou em coqueteis sofisticados.",
    ],
    getList: (ctx) => ctx.licoresList,
  },
  alkoholfrei: {
    label: "Nao Alcoolicos",
    descriptions: [
      "Opcoes refrescantes e saborosas para quem prefere ou precisa evitar alcool, elaborados com ingredientes nao alcoolicos sem perder a complexidade e sabor.",
    ],
    getList: (ctx) => ctx.alkoholfreiList,
  },
  rum: {
    label: "Rum",
    descriptions: [
      "Originario do Caribe, o rum e feito da cana-de-acucar e pode variar de leve e suave a rico e robusto. E a base de coqueteis classicos como o daiquiri e o mojito.",
    ],
    getList: (ctx) => ctx.rumList,
  },
  sake: {
    label: "Sake",
    descriptions: [
      "A bebida tradicional japonesa, o sake e um vinho de arroz fermentado. Delicado e aromatico, e apreciado tanto puro quanto em coqueteis como o sake martini.",
    ],
    getList: (ctx) => ctx.sakeList,
  },
  tequila: {
    label: "Tequila",
    descriptions: [
      "Originaria do Mexico, a tequila e destilada da planta de agave azul. Conhecida por sua forca e sabor distintivo, e a base do famoso margarita e outros coqueteis vibrantes.",
    ],
    getList: (ctx) => ctx.tequilaList,
  },
  vodka: {
    label: "Vodka",
    descriptions: [
      "Uma das bebidas destiladas mais populares, a vodka e famosa por sua pureza e versatilidade. E a base de muitos coqueteis classicos e modernos em todo o mundo.",
    ],
    getList: (ctx) => ctx.vodkaList,
  },
  whisky: {
    label: "Whisky",
    descriptions: [
      "Um destilado envelhecido, o whisky vem em muitas variedades com perfis de sabor unicos. Apreciado puro, com gelo ou como base de coqueteis robustos.",
    ],
    getList: (ctx) => ctx.whiskyList,
  },
};

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const ctx = useContext(DrinkContext);

  const config = categories[category ?? ""];
  if (!config) return <NotFound />;

  const drinks = config.getList(ctx);

  return (
    <>
      <StyledDrinkList>
        {config.descriptions.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </StyledDrinkList>
      <DrinkList drinks={drinks} />
    </>
  );
};
