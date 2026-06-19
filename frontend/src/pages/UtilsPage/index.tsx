import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { DrinkContext, IDrink } from "../../providers/drinksContext";
import { api } from "../../api/client";
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

interface CustoState {
  drinkQuery: string;
  drinkCost: { name: string; cost: number | null } | null;
  showAllPrices: boolean;
  allPrices: { name: string; cost: number }[];
}

export const UtilsPage = () => {
  const { allDrinks, filterDrinksByIngredient } = useContext(DrinkContext);
  const location = useLocation();

  const locState = location.state as { tab?: Tab; custoState?: CustoState } | null;
  const [activeTab, setActiveTab] = useState<Tab>(locState?.tab ?? "ingrediente");

  // Tab: Por Ingrediente
  const [ingredientQuery, setIngredientQuery] = useState("");
  const [ingredientResults, setIngredientResults] = useState<IDrink[]>([]);
  const [ingredientSearched, setIngredientSearched] = useState(false);

  const handleIngredientSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredientQuery.trim()) return;
    setIngredientResults(filterDrinksByIngredient(allDrinks, ingredientQuery.trim()));
    setIngredientSearched(true);
  };

  // Tab: Custo
  const [drinkQuery, setDrinkQuery] = useState(locState?.custoState?.drinkQuery ?? "");
  const [drinkCost, setDrinkCost] = useState<{ name: string; cost: number | null } | null>(
    locState?.custoState?.drinkCost ?? null
  );
  const [loadingCost, setLoadingCost] = useState(false);
  const [showAllPrices, setShowAllPrices] = useState(locState?.custoState?.showAllPrices ?? false);
  const [allPrices, setAllPrices] = useState<{ name: string; cost: number }[]>(
    locState?.custoState?.allPrices ?? []
  );

  const getCustoState = (): CustoState => ({ drinkQuery, drinkCost, showAllPrices, allPrices });

  const handleDrinkCostSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!drinkQuery.trim()) return;
    setLoadingCost(true);
    try {
      const result = await api.utils.cost(drinkQuery.trim());
      setDrinkCost({ name: result.name, cost: result.cost });
    } catch {
      setDrinkCost({ name: drinkQuery.trim(), cost: null });
    } finally {
      setLoadingCost(false);
    }
  };

  const handleShowAllPrices = async () => {
    setLoadingCost(true);
    try {
      const results = await api.utils.allCosts();
      setAllPrices(results);
      setShowAllPrices(true);
    } finally {
      setLoadingCost(false);
    }
  };

  // Tab: Resumo de Ingredientes
  const [ingredientSummary, setIngredientSummary] = useState<{ name: string; total: number }[]>([]);

  useEffect(() => {
    api.utils.ingredientSummary().then(setIngredientSummary).catch(() => {});
  }, []);

  return (
    <StyledUtilsPage>
      <StyledTabs>
        <StyledTab $active={activeTab === "ingrediente"} onClick={() => setActiveTab("ingrediente")}>
          Por Ingrediente
        </StyledTab>
        <StyledTab $active={activeTab === "custo"} onClick={() => setActiveTab("custo")}>
          Custo
        </StyledTab>
        <StyledTab $active={activeTab === "resumo"} onClick={() => setActiveTab("resumo")}>
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
            <StyledEmptyState>Nenhum drink encontrado com este ingrediente.</StyledEmptyState>
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
            <button type="submit">{loadingCost ? "..." : "Calcular"}</button>
          </StyledSearchRow>

          {drinkCost && (
            <StyledSingleResult>
              <Link
                className="drink-name"
                to={`/drink/${encodeURIComponent(drinkCost.name)}`}
                state={{ fromTab: "custo", custoState: getCustoState() }}
              >
                {drinkCost.name}
              </Link>
              {drinkCost.cost == null ? (
                <div className="cost-note">Drink não encontrado ou ingredientes sem preço cadastrado.</div>
              ) : drinkCost.cost === 0 ? (
                <div className="cost-note">Não foi possível calcular o custo (ingredientes sem preço).</div>
              ) : (
                <>
                  <div className="cost">R$ {drinkCost.cost.toFixed(2)}</div>
                  <div className="cost-note">custo estimado por dose</div>
                </>
              )}
            </StyledSingleResult>
          )}

          {!showAllPrices ? (
            <StyledShowAllBtn onClick={handleShowAllPrices} disabled={loadingCost}>
              {loadingCost ? "Carregando..." : "Ver todos os preços"}
            </StyledShowAllBtn>
          ) : (
            <StyledResultList>
              {allPrices.map((item) => (
                <StyledResultItem
                  key={item.name}
                  as={Link}
                  to={`/drink/${encodeURIComponent(item.name)}`}
                  state={{ fromTab: "custo", custoState: getCustoState() }}
                >
                  <span className="name">{item.name}</span>
                  {item.cost > 0 ? (
                    <span className="value">R$ {item.cost.toFixed(2)}</span>
                  ) : (
                    <span className="no-data">sem preço</span>
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
