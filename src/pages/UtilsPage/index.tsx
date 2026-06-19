import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { drinksDatabase } from "../../database/database";
import { useBeverages } from "../../hooks/useBeverages";
import { DrinkContext, IDrink } from "../../providers/drinksContext";
import { DrinkList } from "../../components/DrinkList";
import {
  StyledUtilsPage,
  StyledTabs,
  StyledTab,
  StyledTabPanel,
  StyledSearchRow,
  StyledResultList,
  StyledResultItem,
  StyledSingleResult,
  StyledShowAllBtn,
  StyledEmptyState,
} from "./style";

type Tab = "ingrediente" | "custo" | "resumo";

export const UtilsPage = () => {
  const { filterDrinksByIngredient, costPerDrink, sumOfIngredients } =
    useContext(DrinkContext);
  const { beverages } = useBeverages();
  const location = useLocation();

  const initialTab: Tab =
    (location.state as { tab?: Tab } | null)?.tab ?? "ingrediente";
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  const [ingredientQuery, setIngredientQuery] = useState("");
  const [ingredientResults, setIngredientResults] = useState<IDrink[]>([]);
  const [ingredientSearched, setIngredientSearched] = useState(false);

  const handleIngredientSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredientQuery.trim()) return;
    setIngredientResults(
      filterDrinksByIngredient(drinksDatabase, ingredientQuery.trim())
    );
    setIngredientSearched(true);
  };

  const [drinkQuery, setDrinkQuery] = useState("");
  const [drinkCost, setDrinkCost] = useState<{
    name: string;
    cost: number | null | undefined;
  } | null>(null);
  const [showAllPrices, setShowAllPrices] = useState(false);
  const [allPrices, setAllPrices] = useState<{ name: string; price: number }[]>(
    []
  );

  const handleDrinkCostSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!drinkQuery.trim()) return;
    const found = drinksDatabase.find(
      (d) =>
        d.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "") ===
        drinkQuery
          .trim()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
    );
    if (!found) {
      setDrinkCost({ name: drinkQuery.trim(), cost: null });
      return;
    }
    const cost = costPerDrink(drinksDatabase, beverages, found.name);
    setDrinkCost({ name: found.name, cost });
  };

  const handleShowAllPrices = () => {
    const results = drinksDatabase.map((drink) => ({
      name: drink.name,
      price: costPerDrink(drinksDatabase, beverages, drink.name) ?? 0,
    }));
    results.sort((a, b) => b.price - a.price);
    setAllPrices(results);
    setShowAllPrices(true);
  };

  const [ingredientSummary, setIngredientSummary] = useState<
    { name: string; total: number }[]
  >([]);

  useEffect(() => {
    const raw = sumOfIngredients(drinksDatabase);
    const sorted = Object.entries(raw)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total);
    setIngredientSummary(sorted);
  }, []);

  return (
    <StyledUtilsPage>
      <StyledTabs>
        <StyledTab
          $active={activeTab === "ingrediente"}
          onClick={() => setActiveTab("ingrediente")}
        >
          Por Ingrediente
        </StyledTab>
        <StyledTab
          $active={activeTab === "custo"}
          onClick={() => setActiveTab("custo")}
        >
          Custo
        </StyledTab>
        <StyledTab
          $active={activeTab === "resumo"}
          onClick={() => setActiveTab("resumo")}
        >
          Ingredientes
        </StyledTab>
      </StyledTabs>

      {activeTab === "ingrediente" && (
        <StyledTabPanel>
          <StyledSearchRow onSubmit={handleIngredientSearch}>
            <input
              type="text"
              placeholder="Nome do ingrediente..."
              value={ingredientQuery}
              onChange={(e) => setIngredientQuery(e.target.value)}
              autoFocus
            />
            <button type="submit">Buscar</button>
          </StyledSearchRow>
          {ingredientSearched && ingredientResults.length === 0 && (
            <StyledEmptyState>
              Nenhum drink encontrado com este ingrediente.
            </StyledEmptyState>
          )}
        </StyledTabPanel>
      )}

      {activeTab === "custo" && (
        <StyledTabPanel>
          <StyledSearchRow onSubmit={handleDrinkCostSearch}>
            <input
              type="text"
              placeholder="Nome do drink..."
              value={drinkQuery}
              onChange={(e) => setDrinkQuery(e.target.value)}
              autoFocus
            />
            <button type="submit">Calcular</button>
          </StyledSearchRow>

          {drinkCost && (
            <StyledSingleResult>
              <div className="drink-name">{drinkCost.name}</div>
              {drinkCost.cost == null ? (
                <div className="cost-note">
                  Drink nao encontrado ou ingredientes sem preco cadastrado.
                </div>
              ) : drinkCost.cost === 0 ? (
                <div className="cost-note">
                  Nao foi possivel calcular o custo (ingredientes sem preco).
                </div>
              ) : (
                <>
                  <div className="cost">R$ {drinkCost.cost.toFixed(2)}</div>
                  <div className="cost-note">custo estimado por dose</div>
                </>
              )}
            </StyledSingleResult>
          )}

          {!showAllPrices ? (
            <StyledShowAllBtn onClick={handleShowAllPrices}>
              Ver todos os precos
            </StyledShowAllBtn>
          ) : (
            <StyledResultList>
              {allPrices.map((item) => (
                <StyledResultItem key={item.name}>
                  <span className="name">{item.name}</span>
                  {item.price > 0 ? (
                    <span className="value">R$ {item.price.toFixed(2)}</span>
                  ) : (
                    <span className="no-data">sem preco</span>
                  )}
                </StyledResultItem>
              ))}
            </StyledResultList>
          )}
        </StyledTabPanel>
      )}

      {activeTab === "resumo" && (
        <StyledTabPanel>
          <StyledResultList>
            {ingredientSummary.map((item) => (
              <StyledResultItem
                key={item.name}
                as={Link}
                to={`/ingrediente/${encodeURIComponent(item.name)}`}
                state={{ fromTab: "resumo" }}
              >
                <span className="name">{item.name}</span>
                <span className="value">{item.total} mL / un</span>
              </StyledResultItem>
            ))}
          </StyledResultList>
        </StyledTabPanel>
      )}

      {activeTab === "ingrediente" && ingredientResults.length > 0 && (
        <DrinkList drinks={ingredientResults} />
      )}
    </StyledUtilsPage>
  );
};
