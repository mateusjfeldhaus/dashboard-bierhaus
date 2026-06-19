import { StyledDrinkList } from "./style";
import { DrinkCard } from "./DrinkCard";
import { IDrink } from "../../providers/drinksContext";

export const DrinkList = ({ drinks }: { drinks: IDrink[] }) => (
  <StyledDrinkList>
    {drinks.map((drink) => (
      <DrinkCard key={drink.name} drink={drink} />
    ))}
  </StyledDrinkList>
);
