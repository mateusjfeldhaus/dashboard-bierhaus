import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledFeaturedCard = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 0 0.5rem;
  padding: 0 1rem;
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
  min-height: 220px;

  .fc-image {
    width: 180px;
    flex-shrink: 0;
    border-radius: 10px;
    overflow: hidden;
    background: #1c1c1c;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .fc-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      opacity: 0.3;
    }
  }

  .fc-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.6rem;
    padding: 1.25rem 1.5rem;
    border: 1px solid rgba(255, 208, 110, 0.1);
    border-radius: 10px;
    background: rgba(255, 208, 110, 0.03);
  }

  .fc-label {
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.35;
    font-weight: 700;
  }

  .fc-name {
    font-size: clamp(1.4rem, 3vw, 2rem);
    font-weight: 700;
    color: ${theme.colors.primary};
    line-height: 1.2;
  }

  .fc-tags {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .fc-tag {
    font-size: 0.7rem;
    border: 1px solid rgba(255, 208, 110, 0.3);
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    opacity: 0.6;
    color: ${theme.colors.primary};
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .fc-btn {
    display: inline-block;
    margin-top: 0.25rem;
    align-self: flex-start;
    color: ${theme.colors.primary};
    font-size: 0.82rem;
    font-weight: 600;
    text-decoration: none;
    border: 1px solid rgba(255, 208, 110, 0.3);
    padding: 0.3rem 0.9rem;
    border-radius: 999px;
    transition: all 0.15s;

    &:hover {
      background: rgba(255, 208, 110, 0.08);
      border-color: rgba(255, 208, 110, 0.6);
    }
  }

  @media (max-width: 500px) {
    flex-direction: column;
    min-height: unset;

    .fc-image {
      width: 100%;
      height: 180px;
    }
  }
`;
