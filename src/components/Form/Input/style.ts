import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:hover,
  &:focus {
    font-weight: bold;
  }

  label {
    font-weight: bold;
  }

  input {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: 3px solid ${theme.colors.primary};
    box-sizing: border-box;
  }

  input::placeholder {
  }
`;
