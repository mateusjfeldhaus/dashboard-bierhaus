import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledNotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  padding: 6rem 1rem;
  text-align: center;
  color: ${theme.colors.primary};

  .code {
    font-size: clamp(4rem, 15vw, 8rem);
    font-weight: 700;
    line-height: 1;
    opacity: 0.08;
    letter-spacing: -0.04em;
  }

  .message {
    font-size: 1rem;
    opacity: 0.45;
    margin-top: -3rem;
  }

  .back-link {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: ${theme.colors.primary};
    opacity: 0.4;
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 208, 110, 0.25);
    padding-bottom: 1px;
    transition: opacity 0.15s;

    &:hover { opacity: 0.85; }
  }
`;
