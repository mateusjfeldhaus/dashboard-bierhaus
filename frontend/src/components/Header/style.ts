import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0.75rem 1rem;
  gap: 1rem;
  flex-wrap: wrap;

  .logo-link img {
    width: 70px;
    height: 70px;
    flex-shrink: 0;
  }

  @media (max-width: 767px) {
    .logo-link img {
      width: 80px;
      height: 80px;
    }
  }
`;

export const StyledMobileControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const StyledMenuButton = styled.button`
  font-size: 1.8rem;
  color: ${theme.colors.primary};
  cursor: pointer;
  background: none;
  border: none;
`;

export const StyledSearchButton = styled.button`
  font-size: 1.4rem;
  color: ${theme.colors.primary};
  cursor: pointer;
  background: none;
  border: none;
`;

export const StyledDesktopNav = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.25rem 1.25rem;
    flex: 1;

    a {
      color: ${theme.colors.primary};
      font-size: 0.85rem;
      white-space: nowrap;
      opacity: 0.75;
      transition: opacity 0.15s;
    }

    a:hover {
      opacity: 1;
    }
  }
`;

export const StyledAdminMenu = styled.div`
  position: relative;
`;

export const StyledAdminToggle = styled.button<{ $open: boolean }>`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-size: 0.85rem;
  white-space: nowrap;
  opacity: ${({ $open }) => ($open ? 1 : 0.75)};
  cursor: pointer;
  padding: 0;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
`;

export const StyledAdminDropdown = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  background: #1a1a1a;
  border: 1px solid rgba(255, 208, 110, 0.2);
  border-radius: 6px;
  min-width: 140px;
  overflow: hidden;
  z-index: 200;

  a {
    display: block;
    padding: 0.65rem 1rem;
    font-size: 0.85rem;
    color: ${theme.colors.primary};
    opacity: 0.8;
    white-space: nowrap;
    border-bottom: 1px solid rgba(255, 208, 110, 0.08);
    transition: background 0.15s, opacity 0.15s;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: rgba(255, 208, 110, 0.07);
      opacity: 1;
    }
  }
`;

export const StyledDesktopSearchForm = styled.form`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border-bottom: 1px solid rgba(255, 208, 110, 0.5);
    padding-bottom: 2px;

    input {
      background: transparent;
      border: none;
      color: ${theme.colors.primary};
      font-size: 0.85rem;
      padding: 2px 4px;
      width: 150px;
      outline: none;
    }

    input::placeholder {
      color: ${theme.colors.primary};
      opacity: 0.45;
    }

    button {
      font-size: 0.9rem;
      color: ${theme.colors.primary};
      opacity: 0.6;
      cursor: pointer;
      padding: 0;
      background: none;
      border: none;
    }
  }
`;

export const StyledMobileNav = styled.nav<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  width: 100%;
  padding: 0.75rem 0;
  border-top: 1px solid rgba(255, 208, 110, 0.15);

  ul {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    width: 100%;
  }

  ul a {
    color: ${theme.colors.primary};
    font-size: 1rem;
  }

  .mobile-admin-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.4;
    padding-top: 0.5rem;
  }

  .mobile-admin-link {
    padding-left: 0.75rem;
    font-size: 0.95rem !important;
  }
`;

export const StyledMobileSearchWrapper = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  width: 100%;
  padding: 0.5rem 0;
  border-top: 1px solid rgba(255, 208, 110, 0.15);

  form {
    display: flex;
    width: 100%;
  }

  input {
    background: transparent;
    border: none;
    border-bottom: 1px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
    font-size: 1rem;
    padding: 4px 8px;
    outline: none;
    width: 100%;
  }

  input::placeholder {
    color: ${theme.colors.primary};
    opacity: 0.6;
  }
`;
