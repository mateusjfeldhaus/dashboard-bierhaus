import styled from "styled-components";

export const StyledDrinkList = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 1rem 1rem 5rem;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;
