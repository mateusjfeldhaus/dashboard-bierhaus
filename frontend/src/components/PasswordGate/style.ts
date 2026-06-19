import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledGate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1.5rem;
  padding: 2rem;
`;

export const StyledLock = styled.div`
  font-size: 2.5rem;
  opacity: 0.5;
`;

export const StyledGateTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  opacity: 0.7;
`;

export const StyledGateForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 280px;
`;

export const StyledPinInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 208, 110, 0.5);
  color: ${theme.colors.primary};
  font-size: 1.2rem;
  letter-spacing: 0.3em;
  padding: 0.5rem 0.5rem;
  outline: none;
  text-align: center;

  &::placeholder {
    letter-spacing: 0.1em;
    opacity: 0.3;
    font-size: 1rem;
  }

  &:focus {
    border-bottom-color: ${theme.colors.primary};
  }
`;

export const StyledGateBtn = styled.button`
  background: none;
  border: 1px solid rgba(255, 208, 110, 0.4);
  color: ${theme.colors.primary};
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: background 0.15s;

  &:hover {
    background: rgba(255, 208, 110, 0.08);
  }
`;

export const StyledGateError = styled.p`
  font-size: 0.85rem;
  opacity: 0.6;
  color: #ff6b6b;
`;
