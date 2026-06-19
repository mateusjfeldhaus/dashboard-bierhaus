import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledUtilsPage = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 1.5rem 1rem 6rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const StyledTabs = styled.div`
  display: flex;
  gap: 0;
  border-bottom: 1px solid rgba(255, 208, 110, 0.2);
`;

export const StyledTab = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 0.65rem 1rem;
  font-size: 0.82rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
  color: ${theme.colors.primary};
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  border-bottom: 2px solid ${({ $active }) => ($active ? theme.colors.primary : "transparent")};
  margin-bottom: -1px;
  transition: opacity 0.15s;

  &:hover {
    opacity: ${({ $active }) => ($active ? 1 : 0.7)};
  }
`;

export const StyledTabPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const StyledSearchRow = styled.form`
  display: flex;
  gap: 0.75rem;
  align-items: center;

  input {
    flex: 1;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255, 208, 110, 0.5);
    color: ${theme.colors.primary};
    font-size: 1rem;
    padding: 0.4rem 0.25rem;
    outline: none;

    &::placeholder {
      color: ${theme.colors.primary};
      opacity: 0.4;
    }
  }

  button {
    background: none;
    border: 1px solid rgba(255, 208, 110, 0.5);
    color: ${theme.colors.primary};
    font-size: 0.82rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.4rem 0.9rem;
    cursor: pointer;
    border-radius: 4px;
    white-space: nowrap;
    transition: background 0.15s;

    &:hover {
      background: rgba(255, 208, 110, 0.1);
    }
  }
`;

export const StyledResultList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const StyledResultItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.55rem 0;
  border-bottom: 1px solid rgba(255, 208, 110, 0.08);
  font-size: 0.95rem;
  color: ${theme.colors.primary};
  text-decoration: none;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.7;
  }

  .name {
    opacity: 0.85;
  }

  .value {
    font-weight: 600;
    white-space: nowrap;
    font-size: 0.9rem;
  }

  .no-data {
    opacity: 0.35;
    font-size: 0.85rem;
  }
`;

export const StyledSingleResult = styled.div`
  padding: 1.25rem;
  border: 1px solid rgba(255, 208, 110, 0.2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .drink-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${theme.colors.primary};
    text-decoration: none;
    opacity: 0.9;
    transition: opacity 0.15s;

    &:hover {
      opacity: 1;
      text-decoration: underline;
    }
  }

  .cost {
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .cost-note {
    font-size: 0.8rem;
    opacity: 0.45;
    margin-top: 0.25rem;
  }
`;

export const StyledShowAllBtn = styled.button`
  background: none;
  border: 1px solid rgba(255, 208, 110, 0.3);
  color: ${theme.colors.primary};
  font-size: 0.82rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.55rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  align-self: flex-start;
  transition: background 0.15s;

  &:hover {
    background: rgba(255, 208, 110, 0.08);
  }
`;

export const StyledEmptyState = styled.p`
  opacity: 0.4;
  font-size: 0.9rem;
`;
