import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledTabBar = styled.nav`
  /* Visivel so no mobile */
  @media (min-width: 768px) {
    display: none;
  }

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  background-color: #0d0d0d;
  border-top: 1px solid rgba(255, 208, 110, 0.15);

  /* Esconde scrollbar no Chrome/Safari */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledTabItem = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  flex-shrink: 0;

  padding: 0.55rem 1rem 0.65rem;
  min-width: 64px;
  text-decoration: none;
  cursor: pointer;

  .icon {
    font-size: 1.3rem;
    line-height: 1;
  }

  .label {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    white-space: nowrap;
    color: ${({ $active }) =>
      $active ? theme.colors.primary : "rgba(255, 208, 110, 0.4)"};
    transition: color 0.15s;
  }

  ${({ $active }) =>
    $active &&
    `border-top: 2px solid ${theme.colors.primary};`}
`;
