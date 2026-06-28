import { useEffect, useState, useRef, useContext } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { api, Drink, uploadImage, updateDrink } from "../../api/client";
import { DrinkContext } from "../../providers/drinksContext";
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
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const { allDrinks, loading: contextLoading } = useContext(DrinkContext);
  const isAdmin = useIsAdmin();
  const locState = location.state as { fromTab?: string; custoState?: object } | null;
  const fromTab = locState?.fromTab;

  const handleBack = () => {
    if (fromTab) navigate("/utils", { state: { tab: fromTab, custoState: locState?.custoState } });
    else navigate(-1);
  };

  useEffect(() => {
    if (!name) return;
    const decoded = decodeURIComponent(name);

    // 1. Já está no contexto → renderiza na hora, sem request
    const cached = allDrinks.find((d) => d.name === decoded);
    if (cached) {
      setDrink(cached);
      return;
    }

    // 2. Contexto ainda carregando → aguarda próximo render
    if (contextLoading) return;

    // 3. Contexto carregado mas drink não encontrado (URL direta, drink hidden)
    //    → busca na API como fallback
    api.drinks.get(decoded)
      .then(setDrink)
      .catch(() => setDrink(null));
  }, [name, allDrinks, contextLoading]);

  if (drink === undefined) return <DrinkPageSkeleton />;
  if (drink === null) return <NotFound />;

  const publicUrl = process.env.PUBLIC_URL;
  const getImageSrc = (src: string) =>
    src.startsWith("http") ? src : `${publicUrl}/assets/${src.split("/").pop()}`;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    try {
      const newUrls = await Promise.all(files.map(uploadImage));
      const updated = await updateDrink(drink.name, { images: [...drink.img, ...newUrls] });
      setDrink(updated);
    } catch {
      // silently fail — user can retry via EditDrinkPage
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

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
          {isAdmin && (
            <>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleUpload}
              />
              <button
                className="upload-btn"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? "Enviando..." : "+ Foto"}
              </button>
            </>
          )}
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
