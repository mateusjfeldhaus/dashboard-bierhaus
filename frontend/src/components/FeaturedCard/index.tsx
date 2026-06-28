import { Link } from "react-router-dom";
import { IDrink } from "../../providers/drinksContext";
import { StyledFeaturedCard } from "./style";

export const FeaturedCard = ({ drink }: { drink: IDrink }) => {
  const img = drink.img[0];

  return (
    <StyledFeaturedCard>
      <div className="fc-image">
        {img
          ? <img src={img} alt={drink.name} />
          : <div className="fc-placeholder">🍹</div>
        }
      </div>
      <div className="fc-content">
        <span className="fc-label">Destaque</span>
        <h2 className="fc-name">{drink.name}</h2>
        <div className="fc-tags">
          {drink.type.map((t) => <span key={t} className="fc-tag">{t}</span>)}
        </div>
        <Link className="fc-btn" to={`/drink/${encodeURIComponent(drink.name)}`}>
          Ver receita →
        </Link>
      </div>
    </StyledFeaturedCard>
  );
};
