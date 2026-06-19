import { useParams, useNavigate } from "react-router-dom";
import { drinksDatabase } from "../../database/database";
import { IDrinkIngredients } from "../../providers/drinksContext";
import { StyledDrinkPage } from "./style";
import { NotFound } from "../404NotFound";

const formatIngredient = ({ name, quantity }: IDrinkIngredients): string => {
  if (name === "Hortenã") return `${quantity} folhas de ${name}`;
  if (quantity === "Completar") return `Completar com ${name}`;
  if (name === "Angostura" || name === "Angostura de Laranja")
    return `${quantity} dashes de ${name}`;
  if (name.includes("Redbull")) return `${quantity} lata de ${name}`;
  if (name === "Clara de Ovo") return `${quantity} ${name}`;
  if (name === "Pimenta Rosa") return `${quantity} de ${name}`;
  if (name === "Limão") return `Suco de ${quantity} ${name}`;
  return `${quantity} mL de ${name}`;
};

export const DrinkPage = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const decodedName = decodeURIComponent(name ?? "");
  const drink = drinksDatabase.find((d) => d.name === decodedName);

  if (!drink) return <NotFound />;

  return (
    <StyledDrinkPage>
      <button className="back-btn" onClick={() => navigate(-1)}>
        Voltar
      </button>

      <div className="drink-header">
        <h1>{drink.name}</h1>
        <div className="tags">
          {drink.type.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="drink-body">
        {drink.img.length > 0 && (
          <div className="images">
            {drink.img.map((img, i) => (
              <img key={i} src={img} alt={`${drink.name} ${i + 1}`} />
            ))}
          </div>
        )}

        <div className="details">
          <section>
            <h2>Ingredientes</h2>
            <ul>
              {drink.ingredients.map((ing, i) => (
                <li key={i}>{formatIngredient(ing)}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Modo de preparo</h2>
            <p>{drink.recipe}</p>
          </section>
        </div>
      </div>
    </StyledDrinkPage>
  );
};
