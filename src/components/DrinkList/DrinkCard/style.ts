import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../../../styles/theme";

export const StyledDrinkCard = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  background-color: #1c1c1c;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(255, 208, 110, 0.12);
  }

  .card-image {
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background-color: #252525;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.04);
    }

    .placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      opacity: 0.4;
    }
  }

  .card-name {
    padding: 0.55rem 0.75rem 0.65rem;

    span {
      color: ${theme.colors.primary};
      font-size: 0.82rem;
      font-weight: 600;
      line-height: 1.3;
    }
  }
`;
