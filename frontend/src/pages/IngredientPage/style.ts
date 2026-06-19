import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledIngredientHeader = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 1.5rem 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const StyledBackBtn = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-size: 0.9rem;
  opacity: 0.65;
  cursor: pointer;
  padding: 0;
  text-align: left;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
`;

export const StyledTitle = styled.h1`
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 700;
`;

export const StyledSubtitle = styled.p`
  font-size: 0.85rem;
  opacity: 0.45;
`;
