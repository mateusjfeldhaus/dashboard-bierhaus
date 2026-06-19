import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { DrinkContext } from "../../providers/drinksContext";
import { DrinkList } from "../../components/DrinkList";
import { StyledDrinkList } from "../../styles/DrinkList";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const { filterDrinksByName } = useContext(DrinkContext);
  const results = filterDrinksByName(query);

  return (
    <>
      <StyledDrinkList>
        {query && (
          <p>
            {results.length > 0
              ? `${results.length} resultado${results.length !== 1 ? "s" : ""} para "${query}"`
              : `Nenhum drink encontrado para "${query}"`}
          </p>
        )}
      </StyledDrinkList>
      {results.length > 0 && <DrinkList drinks={results} />}
    </>
  );
};