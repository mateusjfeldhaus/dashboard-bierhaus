import { useContext, useMemo } from "react";
import { DrinkContext } from "../../providers/drinksContext";
import { DrinkIngredient } from "../../api/client";
import { StyledStatsPage } from "./style";

const CATEGORIES = [
  "Cachaça", "Espumante", "Gin", "Licores", "Não Alcoólicos",
  "Rum", "Sake", "Tequila", "Vodka", "Whisky",
];

// ABV por ingrediente (fração, ex: 0.40 = 40%)
const ABV: Record<string, number> = {
  "cachaça":             0.40,
  "gin":                 0.40,
  "gin/vodka":           0.40,
  "gin/conhaque":        0.40,
  "vodka":               0.40,
  "rum":                 0.40,
  "tequila silver":      0.40,
  "whisky":              0.40,
  "scotch whisky":       0.40,
  "whisky bourbon":      0.40,
  "jack daniels":        0.40,
  "cointreau":           0.40,
  "curaçau blue":        0.30,
  "licor 43":            0.31,
  "limoncello":          0.28,
  "angostura de laranja":0.28,
  "licor de pêssego":    0.18,
  "dry vermouth":        0.18,
  "sake":                0.17,
  "vermouth rosso":      0.16,
  "campari":             0.25,
  "cynar":               0.165,
  "licor kahluá":        0.20,
  "licor de café":       0.20,
  "rum malibu":          0.21,
  "espumante":           0.12,
  "aperol":              0.11,
  "angostura":           0.447,
};

const ML_PER_DASH = 0.9;

function lookupAbv(name: string): number {
  return ABV[name.toLowerCase()] ?? 0;
}

function calcAlcoholMl(ing: DrinkIngredient): number {
  const abv = lookupAbv(ing.name);
  if (!abv) return 0;
  const qty = parseFloat(ing.quantity);
  if (isNaN(qty)) return 0;
  if (ing.unit === "dash") return qty * ML_PER_DASH * abv;
  if (ing.unit === "ml")   return qty * abv;
  return 0;
}

function alcoholLabel(ml: number): string {
  if (ml === 0)   return "sem álcool";
  if (ml < 10)    return "leve";
  if (ml < 20)    return "médio";
  return "forte";
}

export const StatsPage = () => {
  const { allDrinks } = useContext(DrinkContext);

  const stats = useMemo(() => {
    const byCategory = CATEGORIES.map((cat) => ({
      label: cat,
      count: allDrinks.filter((d) => d.type.includes(cat)).length,
    }));

    const topIngredients = (() => {
      const freq: Record<string, number> = {};
      allDrinks.forEach((d) =>
        d.ingredients.forEach((i) => {
          const key = i.name.toLowerCase();
          freq[key] = (freq[key] ?? 0) + 1;
        })
      );
      return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));
    })();

    const alcoholRanking = allDrinks
      .map((d) => ({
        name: d.name,
        mlAlcohol: d.ingredients.reduce((sum, ing) => sum + calcAlcoholMl(ing), 0),
      }))
      .sort((a, b) => b.mlAlcohol - a.mlAlcohol);

    return { total: allDrinks.length, byCategory, topIngredients, alcoholRanking };
  }, [allDrinks]);

  const maxCat = Math.max(...stats.byCategory.map((c) => c.count), 1);
  const maxAlc = Math.max(...stats.alcoholRanking.map((d) => d.mlAlcohol), 1);

  return (
    <StyledStatsPage>
      <h1>Estatísticas</h1>

      <div className="hero-stat">
        <span className="hero-number">{stats.total}</span>
        <span className="hero-label">drinks no cardápio</span>
      </div>

      <section>
        <h2>Por categoria</h2>
        <div className="bar-list">
          {stats.byCategory.map(({ label, count }) => (
            <div className="bar-row" key={label}>
              <span className="bar-label">{label}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(count / maxCat) * 100}%` }} />
              </div>
              <span className="bar-count">{count}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>mL de álcool puro por drink</h2>
        <p className="section-note">
          Calculado com base no teor alcoólico de cada ingrediente.
          1 dose padrão brasileira ≈ 14 mL de álcool puro.
        </p>
        <div className="bar-list alc-list">
          {stats.alcoholRanking.map(({ name, mlAlcohol }) => (
            <div className="bar-row" key={name}>
              <span className="bar-label">{name}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(mlAlcohol / maxAlc) * 100}%` }} />
              </div>
              <span className="bar-count alc-value">
                {mlAlcohol > 0 ? `${mlAlcohol.toFixed(1)} mL` : "—"}
              </span>
              <span className={`alc-badge alc-${alcoholLabel(mlAlcohol).replace(" ", "-")}`}>
                {alcoholLabel(mlAlcohol)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Ingredientes mais usados</h2>
        <ol className="ingredient-list">
          {stats.topIngredients.map(({ name, count }, i) => (
            <li key={name}>
              <span className="ing-rank">#{i + 1}</span>
              <span className="ing-name">{name}</span>
              <span className="ing-count">{count}×</span>
            </li>
          ))}
        </ol>
      </section>
    </StyledStatsPage>
  );
};
