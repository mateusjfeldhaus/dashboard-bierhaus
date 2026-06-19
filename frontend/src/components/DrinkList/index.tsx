import React from "react";
import { StyledDrinkList } from "./style";
import { DrinkCard } from "./DrinkCard";
import { IDrink } from "../../providers/drinksContext";

export const DrinkList = ({ drinks }: { drinks: IDrink[] }) => {
  return (
    <StyledDrinkList>
      <DrinkCard drinks={drinks} />
    </StyledDrinkList>
  );
};
