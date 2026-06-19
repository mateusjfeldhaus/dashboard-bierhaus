import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { api, Drink } from "../../api/client";
import { useIsAdmin } from "../../hooks/useIsAdmin";
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

  const isAdmin = useIsAdmin();
  const locState = location.state as { fromTab?: string; custoState?: object } | null;
  const fromTab = locState?.fromTab;

  const handleBack = () => {
    if (fromTab) navigate("/utils", { state: { tab: fromTab, custoState: locState?.custoState } });
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
  const getImageSrc = (src: string) =>
    src.startsWith("http") ? src : `${publicUrl}/assets/${src.split("/").pop()}`;

  return (
    <StyledDrinkPage>
      <div className="top-bar">
        <button className="back-btn" onClick={handleBack}>Voltar</button>
        {isAdmin && <Link className="edit-btn" to={`/editar-drink/${encodeURIComponent(drink.name)}`}>✏ Editar</Link>}
      </div>

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
              return (
                <img
                  key={i}
                  src={getImageSrc(src)}
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
