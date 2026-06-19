import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledPrecosPage = styled.div`
  width: 100%;
  max-width: 700px;
  padding: 1.5rem 1rem 6rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StyledPageHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  h1 {
    font-size: clamp(1.3rem, 4vw, 1.8rem);
    font-weight: 700;
  }
`;

export const StyledResetAllBtn = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-size: 0.78rem;
  opacity: 0.45;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.9;
  }
`;

export const StyledSearchInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 208, 110, 0.4);
  color: ${theme.colors.primary};
  font-size: 1rem;
  padding: 0.4rem 0.25rem;
  outline: none;

  &::placeholder {
    color: ${theme.colors.primary};
    opacity: 0.35;
  }
`;

export const StyledBeverageList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const StyledBeverageItem = styled.li<{ $modified: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid rgba(255, 208, 110, 0.08);

  .modified-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${theme.colors.primary};
    flex-shrink: 0;
    opacity: ${({ $modified }) => ($modified ? 1 : 0)};
  }

  .name {
    flex: 1;
    font-size: 0.95rem;
    opacity: ${({ $modified }) => ($modified ? 1 : 0.75)};
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: opacity 0.15s;

    &:hover {
      opacity: 1;
    }
  }

  .abv-badge {
    font-size: 0.7rem;
    font-weight: 600;
    opacity: 0.45;
    border: 1px solid rgba(255, 208, 110, 0.25);
    padding: 0.1rem 0.4rem;
    border-radius: 999px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .price-display {
    font-size: 0.95rem;
    font-weight: 600;
    white-space: nowrap;
    opacity: 0.9;
  }

  .edit-btn {
    background: none;
    border: none;
    color: ${theme.colors.primary};
    font-size: 0.8rem;
    opacity: 0.3;
    cursor: pointer;
    padding: 0 0.25rem;
    transition: opacity 0.15s;
    flex-shrink: 0;

    &:hover {
      opacity: 0.9;
    }
  }

  .reset-btn {
    background: none;
    border: none;
    color: ${theme.colors.primary};
    font-size: 0.75rem;
    opacity: 0.3;
    cursor: pointer;
    padding: 0 0.1rem;
    transition: opacity 0.15s;
    flex-shrink: 0;

    &:hover {
      opacity: 0.9;
    }
  }
`;

export const StyledEditRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const StyledPriceInput = styled.input`
  width: 80px;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  font-size: 0.95rem;
  font-weight: 600;
  padding: 2px 4px;
  outline: none;
  text-align: right;
`;

export const StyledConfirmBtn = styled.button`
  background: none;
  border: 1px solid rgba(255, 208, 110, 0.4);
  color: ${theme.colors.primary};
  font-size: 0.8rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 208, 110, 0.1);
  }
`;

export const StyledCancelBtn = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-size: 0.85rem;
  opacity: 0.35;
  cursor: pointer;
  padding: 0 0.2rem;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.8;
  }
`;

export const StyledSavedToast = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%) translateY(${({ $visible }) => ($visible ? "0" : "1rem")});
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  background: rgba(255, 208, 110, 0.15);
  border: 1px solid rgba(255, 208, 110, 0.3);
  color: ${theme.colors.primary};
  font-size: 0.85rem;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  pointer-events: none;
  transition: opacity 0.2s, transform 0.2s;
  white-space: nowrap;
`;
