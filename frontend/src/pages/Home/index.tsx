import { useContext } from "react";
import { StyledDrinkList } from "../../styles/DrinkList";
import { DrinkList } from "../../components/DrinkList";
import { DrinkContext } from "../../providers/drinksContext";

export const HomePage = () => {
  const { allDrinks } = useContext(DrinkContext);

  return (
    <>
      <StyledDrinkList>
        <p>
          Aqui estão todos os drinks disponíveis na Bierhaus. Escolha a
          categoria individual no menu.
        </p>
      </StyledDrinkList>

      <DrinkList drinks={allDrinks} />
    </>
  );
};
