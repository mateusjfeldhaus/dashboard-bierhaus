import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledPage = styled.div`
  width: 100%;
  max-width: 680px;
  padding: 1.5rem 1rem 6rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const StyledTitle = styled.h1`
  font-size: clamp(1.3rem, 4vw, 1.8rem);
  font-weight: 700;
`;

export const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const StyledLabel = styled.label`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.5;
`;

export const StyledInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 208, 110, 0.35);
  color: ${theme.colors.primary};
  font-size: 1rem;
  padding: 0.4rem 0.25rem;
  outline: none;
  width: 100%;

  &::placeholder {
    color: ${theme.colors.primary};
    opacity: 0.3;
  }
`;

export const StyledTextarea = styled.textarea`
  background: transparent;
  border: 1px solid rgba(255, 208, 110, 0.2);
  border-radius: 6px;
  color: ${theme.colors.primary};
  font-size: 0.95rem;
  font-family: inherit;
  padding: 0.75rem;
  outline: none;
  resize: vertical;
  line-height: 1.6;

  &::placeholder {
    color: ${theme.colors.primary};
    opacity: 0.3;
  }
`;

export const StyledCategoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const StyledCategoryChip = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? "rgba(255,208,110,0.18)" : "transparent")};
  border: 1px solid ${({ $active }) => ($active ? theme.colors.primary : "rgba(255,208,110,0.25)")};
  color: ${theme.colors.primary};
  border-radius: 999px;
  padding: 0.3rem 0.9rem;
  font-size: 0.85rem;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  transition: all 0.15s;

  &:hover { opacity: 1; }
`;

export const StyledIngredientRow = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
`;

export const StyledAddBtn = styled.button`
  background: none;
  border: 1px dashed rgba(255, 208, 110, 0.3);
  color: ${theme.colors.primary};
  border-radius: 6px;
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
  cursor: pointer;
  opacity: 0.6;
  align-self: flex-start;
  transition: opacity 0.15s;

  &:hover { opacity: 1; }
`;

export const StyledRemoveBtn = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  opacity: 0.3;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.25rem;
  flex-shrink: 0;
  transition: opacity 0.15s;

  &:hover { opacity: 0.8; }
`;

export const StyledImagePreview = styled.img`
  width: 100%;
  max-width: 320px;
  border-radius: 8px;
  object-fit: cover;
  opacity: 0.85;
  margin-top: 0.5rem;
`;

export const StyledSubmitBtn = styled.button`
  background: rgba(255, 208, 110, 0.12);
  border: 1px solid rgba(255, 208, 110, 0.4);
  color: ${theme.colors.primary};
  border-radius: 8px;
  padding: 0.85rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  align-self: flex-start;

  &:hover:not(:disabled) { background: rgba(255, 208, 110, 0.2); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export const StyledError = styled.p`
  color: #ff6b6b;
  font-size: 0.9rem;
`;

export const StyledSuccess = styled.p`
  color: ${theme.colors.primary};
  font-size: 0.9rem;
  opacity: 0.8;
`;
