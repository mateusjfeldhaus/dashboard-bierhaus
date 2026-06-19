import { useContext } from "react";
import { StyledDrinkList } from "../../styles/DrinkList";
import { drinksDatabase } from "../../database/database";
import { DrinkList } from "../../components/DrinkList";
import { DrinkContext } from "../../providers/drinksContext";
import { beveragesDatabase } from "../../database/beverages";

export const HomePage = () => {
  const { sumOfIngredients, costPerDrink, getAllDrinksPrices } =
    useContext(DrinkContext);

  // console.log(sumOfIngredients(drinksDatabase));

  // console.log(
  //   costPerDrink(drinksDatabase, beveragesDatabase, "tratto limoncello")
  // );
  // console.log(costPerDrink(drinksDatabase, beveragesDatabase, "negroni"));
  // console.log(
  //   costPerDrink(drinksDatabase, beveragesDatabase, "Japanese Ice Tea")
  // );

  // console.log(getAllDrinksPrices(drinksDatabase, beveragesDatabase));

  return (
    <>
      <StyledDrinkList>
        <p>
          Aqui estão todos os drinks disponíveis na Bierhaus. Escolha a
          categoria individual no menu.
        </p>
      </StyledDrinkList>

      <DrinkList drinks={drinksDatabase} />
    </>
  );
};
