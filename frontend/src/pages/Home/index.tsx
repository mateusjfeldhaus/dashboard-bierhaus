import { useContext } from "react";
import { StyledDrinkList } from "../../styles/DrinkList";
import { DrinkList } from "../../components/DrinkList";
import { DrinkContext } from "../../providers/drinksContext";

export const HomePage = () => {
  const { allDrinks, loading, error } = useContext(DrinkContext);

  return (
    <>
      <StyledDrinkList>
        <p>
          Aqui estão todos os drinks disponíveis na Bierhaus. Escolha a
          categoria individual no menu.
        </p>
      </StyledDrinkList>

      {error && <p style={{ opacity: 0.5, fontSize: "0.9rem", padding: "0 1rem" }}>{error}</p>}
      {!error && loading && <p style={{ opacity: 0.35, fontSize: "0.9rem", padding: "0 1rem" }}>Carregando...</p>}
      {!loading && !error && <DrinkList drinks={allDrinks} />}
    </>
  );
};
