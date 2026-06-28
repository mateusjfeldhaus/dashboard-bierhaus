import { useContext, useState } from "react";
import { StyledDrinkList } from "../../styles/DrinkList";
import { DrinkList } from "../../components/DrinkList";
import { DrinkContext } from "../../providers/drinksContext";
import { DrinkGridSkeleton } from "../../components/Skeleton";
import { useFavorites } from "../../hooks/useFavorites";
import { FeaturedCard } from "../../components/FeaturedCard";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const StyledFilterBar = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 1rem 0.75rem;
  display: flex;
  gap: 0.5rem;
`;

const StyledFilterBtn = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => $active ? "rgba(255,208,110,0.12)" : "none"};
  border: 1px solid ${({ $active }) => $active ? "rgba(255,208,110,0.5)" : "rgba(255,208,110,0.15)"};
  color: ${theme.colors.primary};
  border-radius: 999px;
  padding: 0.3rem 0.85rem;
  font-size: 0.78rem;
  font-family: inherit;
  cursor: pointer;
  opacity: ${({ $active }) => $active ? 1 : 0.4};
  transition: all 0.15s;

  &:hover { opacity: 1; }
`;

export const HomePage = () => {
  const { allDrinks, loading, error } = useContext(DrinkContext);
  const { favorites, isFavorite } = useFavorites();
  const [showFavs, setShowFavs] = useState(false);

  const featured = allDrinks.find((d) => d.featured);
  const displayed = showFavs
    ? allDrinks.filter((d) => isFavorite(d.name))
    : allDrinks;

  return (
    <>
      <StyledDrinkList>
        <p>
          Aqui estão todos os drinks disponíveis na Bierhaus. Escolha a
          categoria individual no menu.
        </p>
      </StyledDrinkList>

      {!loading && !error && featured && !showFavs && (
        <FeaturedCard drink={featured} />
      )}

      {favorites.length > 0 && !loading && !error && (
        <StyledFilterBar>
          <StyledFilterBtn $active={!showFavs} onClick={() => setShowFavs(false)}>
            Todos
          </StyledFilterBtn>
          <StyledFilterBtn $active={showFavs} onClick={() => setShowFavs(true)}>
            ♥ Favoritos ({favorites.length})
          </StyledFilterBtn>
        </StyledFilterBar>
      )}

      {error && <p style={{ opacity: 0.5, fontSize: "0.9rem", padding: "0 1rem" }}>{error}</p>}
      {!error && loading && <DrinkGridSkeleton />}
      {!loading && !error && (
        displayed.length === 0
          ? <p style={{ opacity: 0.4, fontSize: "0.9rem", padding: "0 1rem" }}>Nenhum favorito ainda.</p>
          : <DrinkList drinks={displayed} />
      )}
    </>
  );
};
