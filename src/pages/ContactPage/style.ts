import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledContactPage = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 1.5rem 1rem;
  max-width: 1200px;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    font-size: 1.5rem;
    color: ${theme.colors.primary};
    margin: 0;
  }

  h2 {
    font-size: 1.2rem;
    color: ${theme.colors.primary};
    margin: 0;
  }

  p {
    margin: 0;
    line-height: 1.6;
    text-align: justify;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding-left: 1.25rem;
    margin: 0;

    li {
      line-height: 1.6;
    }
  }   
`;

export const StyledContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StyledContactCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 1.25rem 1rem;
  border: 1px solid ${theme.colors.primary};
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 208, 110, 0.1);
  }

  span {
    font-size: 1.8rem;
  }

  strong {    
    font-size: 1rem;
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    text-align: center;
    opacity: 0.8;
  }
`;