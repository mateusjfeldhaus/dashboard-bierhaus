import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledPage = styled.div`
  width: 100%;
  max-width: 680px;
  padding: 2rem 1rem 6rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const StyledTitle = styled.h1`
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 208, 110, 0.15);
  padding-bottom: 1rem;
`;

export const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const StyledLabel = styled.label`
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.45;
  font-weight: 600;
`;

export const StyledInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 208, 110, 0.3);
  color: ${theme.colors.primary};
  font-size: 1rem;
  padding: 0.5rem 0.25rem;
  outline: none;
  width: 100%;
  transition: border-color 0.15s;

  &:focus {
    border-color: rgba(255, 208, 110, 0.7);
  }

  &::placeholder {
    color: ${theme.colors.primary};
    opacity: 0.25;
  }
`;

export const StyledTextarea = styled.textarea`
  background: rgba(255, 208, 110, 0.03);
  border: 1px solid rgba(255, 208, 110, 0.15);
  border-radius: 8px;
  color: ${theme.colors.primary};
  font-size: 0.95rem;
  font-family: inherit;
  padding: 0.85rem 1rem;
  outline: none;
  resize: vertical;
  line-height: 1.7;
  transition: border-color 0.15s;

  &:focus {
    border-color: rgba(255, 208, 110, 0.4);
  }

  &::placeholder {
    color: ${theme.colors.primary};
    opacity: 0.25;
  }
`;

export const StyledCategoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const StyledCategoryChip = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? "rgba(255,208,110,0.15)" : "transparent")};
  border: 1px solid ${({ $active }) => ($active ? "rgba(255,208,110,0.7)" : "rgba(255,208,110,0.2)")};
  color: ${theme.colors.primary};
  border-radius: 999px;
  padding: 0.35rem 1rem;
  font-size: 0.85rem;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.45)};
  transition: all 0.15s;
  font-family: inherit;

  &:hover {
    opacity: 1;
    border-color: rgba(255, 208, 110, 0.5);
  }
`;

export const StyledIngredientRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px auto;
  gap: 0.75rem;
  align-items: flex-end;
`;

export const StyledAddBtn = styled.button`
  background: none;
  border: 1px dashed rgba(255, 208, 110, 0.25);
  color: ${theme.colors.primary};
  border-radius: 6px;
  padding: 0.45rem 1rem;
  font-size: 0.85rem;
  font-family: inherit;
  cursor: pointer;
  opacity: 0.55;
  align-self: flex-start;
  transition: all 0.15s;

  &:hover {
    opacity: 1;
    border-color: rgba(255, 208, 110, 0.5);
  }
`;

export const StyledRemoveBtn = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  opacity: 0.2;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
  flex-shrink: 0;
  transition: opacity 0.15s;
  line-height: 1;
  margin-bottom: 0.4rem;

  &:hover { opacity: 0.7; }
`;

export const StyledImagePreview = styled.img`
  width: 100%;
  max-width: 280px;
  height: 180px;
  border-radius: 8px;
  object-fit: cover;
  opacity: 0.85;
  margin-top: 0.25rem;
  border: 1px solid rgba(255, 208, 110, 0.15);
`;

export const StyledSubmitBtn = styled.button`
  background: rgba(255, 208, 110, 0.1);
  border: 1px solid rgba(255, 208, 110, 0.35);
  color: ${theme.colors.primary};
  border-radius: 8px;
  padding: 0.9rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s;
  align-self: flex-start;
  letter-spacing: 0.02em;

  &:hover:not(:disabled) {
    background: rgba(255, 208, 110, 0.18);
    border-color: rgba(255, 208, 110, 0.6);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const StyledError = styled.p`
  color: #ff7070;
  font-size: 0.88rem;
  padding: 0.6rem 0.9rem;
  border: 1px solid rgba(255, 100, 100, 0.25);
  border-radius: 6px;
  background: rgba(255, 100, 100, 0.05);
`;

export const StyledSuccess = styled.p`
  color: ${theme.colors.primary};
  font-size: 0.88rem;
  opacity: 0.75;
  padding: 0.6rem 0.9rem;
  border: 1px solid rgba(255, 208, 110, 0.2);
  border-radius: 6px;
  background: rgba(255, 208, 110, 0.05);
`;
