import React from "react";
import { StyledDrinkCard } from "./style";
import { IDrink } from "../../../providers/drinksContext";

export const DrinkCard = ({ drinks }: { drinks: IDrink[] }) => {
  const drinksToShow = drinks.filter((drink) => !drink.hidden);

  return (
    <>
      {drinksToShow.map((drink) => (
        <StyledDrinkCard
          key={drink.name}
          to={`/drink/${encodeURIComponent(drink.name)}`}
        >
          <div className="card-image">
            {drink.img[0] ? (
              <img src={drink.img[0]} alt={drink.name} />
            ) : (
              <div className="placeholder">🍹</div>
            )}
          </div>
          <div className="card-name">
            <span>{drink.name}</span>
          </div>
        </StyledDrinkCard>
      ))}
    </>
  );
};
