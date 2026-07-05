import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { DrinkContext } from "../../providers/drinksContext";
import { DrinkIngredient } from "../../api/client";
import { useBeverages } from "../../hooks/useBeverages";
import { CATEGORY_TYPES } from "../../constants/categories";
import { StyledStatsPage } from "./style";

const ML_PER_DASH = 0.9;

/** Remove acentos e converte para lowercase */
function norm(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/** Escapa caracteres especiais de regex */
function esc(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Verifica se `needle` aparece como palavra inteira em `haystack` */
function wordMatch(haystack: string, needle: string): boolean {
  return new RegExp(`(^|[\\s,])${esc(needle)}([\\s,]|$)`).test(haystack);
}

function findAbv(ingName: string, abvMap: Record<string, number>): number {
  const normIng = norm(ingName);

  // 1. match exato (normalizado)
  for (const [bev, abv] of Object.entries(abvMap)) {
    if (norm(bev) === normIng) return abv;
  }

  // 2. palavra inteira — escolhe o beverage mais longo que faz match
  const wordMatches = Object.entries(abvMap)
    .filter(([bev]) => {
      const nb = norm(bev);
      return wordMatch(normIng, nb) || wordMatch(nb, normIng);
    })
    .sort((a, b) => b[0].length - a[0].length);
  if (wordMatches.length) return wordMatches[0][1];

  // 3. substring fallback (mais permissivo, último recurso)
  const subMatches = Object.entries(abvMap)
    .filter(([bev]) => {
      const nb = norm(bev);
      return normIng.includes(nb) || nb.includes(normIng);
    })
    .sort((a, b) => b[0].length - a[0].length);
  if (subMatches.length) return subMatches[0][1];

  return 0;
}

function calcAlcoholMl(ing: DrinkIngredient, abvMap: Record<string, number>): number {
  const abv = findAbv(ing.name, abvMap);
  if (!abv) return 0;
  const qty = parseFloat(ing.quantity);
  if (isNaN(qty)) return 0;
  if (ing.unit === "dash") return qty * ML_PER_DASH * abv;
  if (ing.unit === "ml")   return qty * abv;
  return 0;
}

function alcoholLabel(ml: number): string {
  if (ml === 0)    return "sem álcool";
  if (ml <= 22.5)  return "médio";
  return "forte";
}

export const StatsPage = () => {
  const { allDrinks } = useContext(DrinkContext);
  const { beverages } = useBeverages();

  // Monta mapa name (lowercase) → abv a partir dos dados da API
  const abvMap = useMemo(() => {
    const map: Record<string, number> = {};
    beverages.forEach((b) => {
      if (b.abv > 0) map[b.name.toLowerCase()] = b.abv;
    });
    return map;
  }, [beverages]);

  const stats = useMemo(() => {
    const byCategory = CATEGORY_TYPES.map((cat) => ({
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
        mlAlcohol: d.ingredients.reduce(
          (sum, ing) => sum + calcAlcoholMl(ing, abvMap),
          0
        ),
      }))
      .sort((a, b) => b.mlAlcohol - a.mlAlcohol);

    return { total: allDrinks.length, byCategory, topIngredients, alcoholRanking };
  }, [allDrinks, abvMap]);

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
          Calculado com base no ABV de cada ingrediente cadastrado em Preços.
          1 dose padrão brasileira ≈ 14 mL de álcool puro.
        </p>
        <div className="bar-list alc-list">
          {stats.alcoholRanking.map(({ name, mlAlcohol }) => (
            <div className="bar-row" key={name}>
              <Link className="bar-label bar-link" to={`/drink/${encodeURIComponent(name)}`}>{name}</Link>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(mlAlcohol / maxAlc) * 100}%` }} />
              </div>
              <span className="bar-count alc-value">
                {mlAlcohol > 0 ? `${mlAlcohol.toFixed(1)} mL` : "—"}
              </span>
              {(() => { const label = alcoholLabel(mlAlcohol); return (
                <span className={`alc-badge alc-${label.replace(" ", "-")}`}>{label}</span>
              ); })()}
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
              <Link className="ing-name" to={`/ingrediente/${encodeURIComponent(name)}`}>{name}</Link>
              <span className="ing-count">{count}×</span>
            </li>
          ))}
        </ol>
      </section>
    </StyledStatsPage>
  );
};
