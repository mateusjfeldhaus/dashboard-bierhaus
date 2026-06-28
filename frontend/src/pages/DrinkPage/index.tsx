import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { api, Drink } from "../../api/client";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { DrinkTimer } from "../../components/DrinkTimer";
import { DrinkPageSkeleton } from "../../components/Skeleton";
import { StyledDrinkPage } from "./style";
import { NotFound } from "../404NotFound";

const formatIngredient = (name: string, quantity: string, unit: string): string => {
  if (quantity === "Completar") return `Completar com ${name}`;
  switch (unit) {
    case "dash":    return `${quantity} dashes de ${name}`;
    case "folha":   return `${quantity} folhas de ${name}`;
    case "lata":    return `${quantity} lata de ${name}`;
    case "unidade": return `${quantity} ${name}`;
    case "pitada":  return `${quantity} pitada de ${name}`;
    case "suco":    return `Suco de ${quantity} ${name}`;
    default:        return `${quantity} mL de ${name}`;
  }
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

  if (drink === undefined) return <DrinkPageSkeleton />;
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
        <div className="images">
          {drink.img.length > 0
            ? drink.img.map((src, i) => (
                <img key={i} src={getImageSrc(src)} alt={`${drink.name} ${i + 1}`} />
              ))
            : <div className="img-placeholder">{drink.name}</div>
          }
        </div>

        <div className="details">
          <section>
            <h2>Ingredientes</h2>
            <ul>
              {drink.ingredients.map((ing, i) => (
                <li key={i}>{formatIngredient(ing.name, ing.quantity, ing.unit ?? "ml")}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Receita</h2>
            <ol className="recipe-steps">
              {drink.recipe.split("\n").filter(Boolean).map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <DrinkTimer />
          </section>
        </div>
      </div>
    </StyledDrinkPage>
  );
};
