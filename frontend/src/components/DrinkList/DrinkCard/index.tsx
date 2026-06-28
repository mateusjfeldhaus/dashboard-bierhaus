import { StyledDrinkCard } from "./style";
import { IDrink } from "../../../providers/drinksContext";
import { useFavorites } from "../../../hooks/useFavorites";

export const DrinkCard = ({ drink }: { drink: IDrink }) => {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(drink.name);

  return (
    <StyledDrinkCard to={`/drink/${encodeURIComponent(drink.name)}`}>
      <div className="card-image">
        {drink.img[0] ? (
          <img src={drink.img[0]} alt={drink.name} />
        ) : (
          <div className="placeholder">🍹</div>
        )}
        <button
          className={`fav-btn${fav ? " fav-btn--active" : ""}`}
          aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          onClick={(e) => { e.preventDefault(); toggle(drink.name); }}
        >
          {fav ? "♥" : "♡"}
        </button>
      </div>
      <div className="card-name">
        <span>{drink.name}</span>
      </div>
    </StyledDrinkCard>
  );
};
