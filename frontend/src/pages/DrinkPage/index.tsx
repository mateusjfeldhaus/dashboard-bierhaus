import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { api, Drink } from "../../api/client";
import { StyledDrinkPage } from "./style";
import { NotFound } from "../404NotFound";

const formatIngredient = (name: string, quantity: string): string => {
  if (name === "Hortelã") return `${quantity} folhas de ${name}`;
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
  const location = useLocation();
  const [drink, setDrink] = useState<Drink | null | undefined>(undefined);

  const fromTab = (location.state as { fromTab?: string } | null)?.fromTab;

  const handleBack = () => {
    if (fromTab) navigate("/utils", { state: { tab: fromTab } });
    else navigate(-1);
  };

  useEffect(() => {
    if (!name) return;
    api.drinks.get(decodeURIComponent(name))
      .then(setDrink)
      .catch(() => setDrink(null));
  }, [name]);

  if (drink === undefined) return null;
  if (drink === null) return <NotFound />;

  const publicUrl = process.env.PUBLIC_URL;

  return (
    <StyledDrinkPage>
      <button className="back-btn" onClick={handleBack}>
        Voltar
      </button>

      <div className="drink-header">
        <h1>{drink.name}</h1>
        <div className="tags">
          {drink.type.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="drink-body">
        {drink.img.length > 0 && (
          <div className="images">
            {drink.img.map((src, i) => {
              const filename = src.split("/").pop();
              return (
                <img
                  key={i}
                  src={`${publicUrl}/assets/${filename}`}
                  alt={`${drink.name} ${i + 1}`}
                />
              );
            })}
          </div>
        )}

        <div className="details">
          <section>
            <h2>Ingredientes</h2>
            <ul>
              {drink.ingredients.map((ing, i) => (
                <li key={i}>{formatIngredient(ing.name, ing.quantity)}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Receita</h2>
            <p>{drink.recipe}</p>
          </section>
        </div>
      </div>
    </StyledDrinkPage>
  );
};
