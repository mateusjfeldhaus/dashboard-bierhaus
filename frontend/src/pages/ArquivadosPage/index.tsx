import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api, updateDrink, Drink } from "../../api/client";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const StyledPage = styled.div`
  max-width: 720px;
  width: 100%;
  padding: 2rem 1rem 6rem;
  color: ${theme.colors.primary};
`;

const StyledTitle = styled.h1`
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 700;
  padding-bottom: 1.25rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 208, 110, 0.1);
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid rgba(255, 208, 110, 0.07);

  &:last-child { border-bottom: none; }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
  }

  .name {
    font-size: 0.95rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .types {
    font-size: 0.72rem;
    opacity: 0.35;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
  }
`;

const StyledBtn = styled.button<{ $primary?: boolean }>`
  background: ${({ $primary }) => $primary ? "rgba(255,208,110,0.08)" : "none"};
  border: 1px solid ${({ $primary }) => $primary ? "rgba(255,208,110,0.4)" : "rgba(255,208,110,0.15)"};
  color: ${theme.colors.primary};
  border-radius: 999px;
  padding: 0.25rem 0.8rem;
  font-size: 0.78rem;
  font-family: inherit;
  cursor: pointer;
  opacity: ${({ $primary }) => $primary ? 1 : 0.45};
  transition: all 0.15s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;

  &:hover { opacity: 1; border-color: rgba(255,208,110,0.5); }
  &:disabled { opacity: 0.2; cursor: not-allowed; }
`;

const StyledEmpty = styled.p`
  opacity: 0.35;
  font-size: 0.9rem;
  margin-top: 2rem;
`;

export const ArquivadosPage = () => {
  const [drinks, setDrinks]   = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => {
    api.drinks.hidden()
      .then(setDrinks)
      .finally(() => setLoading(false));
  }, []);

  const handleRestore = async (name: string) => {
    setToggling(name);
    try {
      await updateDrink(name, { hidden: false });
      setDrinks((prev) => prev.filter((d) => d.name !== name));
    } finally {
      setToggling(null);
    }
  };

  return (
    <StyledPage>
      <StyledTitle>Drinks arquivados</StyledTitle>

      {loading && <StyledEmpty>Carregando...</StyledEmpty>}

      {!loading && drinks.length === 0 && (
        <StyledEmpty>Nenhum drink arquivado.</StyledEmpty>
      )}

      {!loading && drinks.length > 0 && (
        <StyledList>
          {drinks.map((d) => (
            <StyledItem key={d.name}>
              <div className="info">
                <span className="name">{d.name}</span>
                <span className="types">{d.type.join(", ")}</span>
              </div>
              <div className="actions">
                <StyledBtn
                  as={Link}
                  to={`/editar-drink/${encodeURIComponent(d.name)}`}
                >
                  Editar
                </StyledBtn>
                <StyledBtn
                  $primary
                  disabled={toggling === d.name}
                  onClick={() => handleRestore(d.name)}
                >
                  {toggling === d.name ? "..." : "Restaurar"}
                </StyledBtn>
              </div>
            </StyledItem>
          ))}
        </StyledList>
      )}
    </StyledPage>
  );
};
