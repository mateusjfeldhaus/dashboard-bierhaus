import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledDrinkPage = styled.article`
  max-width: 1200px;
  width: 100%;
  padding: 1.25rem 1rem 6rem;
  color: ${theme.colors.primary};

  .top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.75rem;
  }

  .back-btn {
    color: ${theme.colors.primary};
    font-size: 0.9rem;
    opacity: 0.65;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    transition: opacity 0.15s;
    font-family: inherit;

    &:hover { opacity: 1; }
  }

  .edit-btn {
    color: ${theme.colors.primary};
    font-size: 0.8rem;
    opacity: 0.35;
    text-decoration: none;
    border: 1px solid rgba(255, 208, 110, 0.2);
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    transition: opacity 0.15s;

    &:hover { opacity: 0.8; }
  }

  .drink-header {
    margin-bottom: 1.75rem;
  }

  .drink-header h1 {
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 0.6rem;
  }

  .tags {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .tag {
    font-size: 0.72rem;
    border: 1px solid rgba(255, 208, 110, 0.4);
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .drink-body {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  @media (min-width: 768px) {
    .drink-body {
      flex-direction: row;
      align-items: flex-start;
      gap: 3rem;
    }
  }

  .images {
    display: flex;
    gap: 0.75rem;
  }

  .images img {
    flex: 1;
    min-width: 0;
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
    aspect-ratio: 3 / 4;
  }

  .img-placeholder {
    width: 100%;
    aspect-ratio: 3 / 4;
    border-radius: 10px;
    border: 1px solid rgba(255, 208, 110, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 208, 110, 0.04);
    color: ${theme.colors.primary};
    opacity: 0.35;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    padding: 1.5rem;
    letter-spacing: 0.03em;
  }

  @media (min-width: 768px) {
    .images {
      flex-direction: column;
      width: 280px;
      flex-shrink: 0;
    }

    .images img {
      width: 100%;
      aspect-ratio: 4 / 5;
    }

    .img-placeholder {
      aspect-ratio: 4 / 5;
    }
  }

  @media (min-width: 1024px) {
    .images {
      width: 340px;
    }
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    flex: 1;
  }

  .details section {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .details h2 {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.5;
    border-bottom: 1px solid rgba(255, 208, 110, 0.15);
    padding-bottom: 0.5rem;
  }

  .details ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;
  }

  .details ul li {
    font-size: 1rem;
    line-height: 1.5;
    padding-left: 1rem;
    position: relative;
  }

  .details ul li::before {
    content: "-";
    position: absolute;
    left: 0;
    opacity: 0.35;
  }

  .details p {
    font-size: 1rem;
    line-height: 1.7;
    opacity: 0.9;
  }
`;
