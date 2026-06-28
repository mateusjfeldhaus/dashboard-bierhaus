import { useEffect, useState, useRef, useContext } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { api, Drink, uploadImage, updateDrink } from "../../api/client";

import { DrinkContext } from "../../providers/drinksContext";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { useFavorites } from "../../hooks/useFavorites";
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
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [cost, setCost] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { allDrinks, loading: contextLoading } = useContext(DrinkContext);
  const isAdmin = useIsAdmin();
  const { isFavorite, toggle: toggleFav } = useFavorites();
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

  useEffect(() => {
    if (!drink || !isAdmin) return;
    api.utils.cost(drink.name).then((r) => setCost(r.cost)).catch(() => {});
  }, [drink?.name, isAdmin]); // eslint-disable-line react-hooks/exhaustive-deps

  if (drink === undefined) return <DrinkPageSkeleton />;
  if (drink === null) return <NotFound />;

  const publicUrl = process.env.PUBLIC_URL;
  const getImageSrc = (src: string) =>
    src.startsWith("http") ? src : `${publicUrl}/assets/${src.split("/").pop()}`;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    setUploadError(null);
    try {
      const newUrls = await Promise.all(files.map(uploadImage));
      const updated = await updateDrink(drink.name, { images: [...drink.img, ...newUrls] });
      setDrink(updated);
    } catch {
      setUploadError("Falha no upload. Tente novamente.");
      setTimeout(() => setUploadError(null), 4000);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <StyledDrinkPage>
      <div className="top-bar">
        <button className="back-btn" onClick={handleBack}>Voltar</button>
        {isAdmin && (
          <div className="admin-actions">
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
            <button
              className={`upload-btn${drink.featured ? " pin-btn--active" : ""}`}
              title={drink.featured ? "Desafixar da home" : "Fixar na home"}
              onClick={async () => {
                const updated = await api.drinks.setFeatured(drink.name);
                setDrink(updated);
              }}
            >
              {drink.featured ? "📌 Fixado" : "📌"}
            </button>
            <Link className="edit-btn" to={`/editar-drink/${encodeURIComponent(drink.name)}`}>✏ Editar</Link>
            {uploadError && <span className="upload-error">{uploadError}</span>}
          </div>
        )}
      </div>

      <div className="drink-header">
        <div className="drink-title-row">
          <h1>{drink.name}</h1>
          <button
            className={`fav-btn${isFavorite(drink.name) ? " fav-btn--active" : ""}`}
            onClick={() => toggleFav(drink.name)}
            aria-label={isFavorite(drink.name) ? "Remover dos favoritos" : "Favoritar"}
          >
            {isFavorite(drink.name) ? "♥" : "♡"}
          </button>
        </div>
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
                <div key={i} className={isAdmin ? "img-wrap" : undefined}>
                  <img src={getImageSrc(src)} alt={`${drink.name} ${i + 1}`} />
                  {isAdmin && (
                    <button
                      className="remove-img-btn"
                      title="Remover foto"
                      onClick={async () => {
                        const newImgs = drink.img.filter((_, idx) => idx !== i);
                        const updated = await updateDrink(drink.name, { images: newImgs });
                        setDrink(updated);
                      }}
                    >✕</button>
                  )}
                </div>
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
            {isAdmin && cost !== null && (
              <p className="cost-hint">Custo estimado: R$ {cost.toFixed(2).replace(".", ",")}</p>
            )}
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
