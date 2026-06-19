import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const StyledFilterDrinksByIngredientForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 1rem;
  margin: 0 1rem;

  max-width: 1200px;

  border: 10px solid ${theme.colors.primary};
  border-radius: 1rem;

  button {
    padding: 0.5rem 1rem;

    border: solid 3px ${theme.colors.primary};
    border-radius: 0.25rem;

    box-sizing: border-box;
  }
`;
