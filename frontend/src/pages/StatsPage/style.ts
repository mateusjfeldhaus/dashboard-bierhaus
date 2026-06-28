import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledStatsPage = styled.div`
  max-width: 640px;
  width: 100%;
  padding: 1.5rem 1rem 6rem;
  color: ${theme.colors.primary};
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  h1 {
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-weight: 700;
  }

  h2 {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.5;
    border-bottom: 1px solid rgba(255, 208, 110, 0.15);
    padding-bottom: 0.5rem;
    margin-bottom: 1.25rem;
  }

  section {
    display: flex;
    flex-direction: column;
  }

  /* Hero */
  .hero-stat {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .hero-number {
    font-size: clamp(3rem, 12vw, 5rem);
    font-weight: 800;
    line-height: 1;
    color: ${theme.colors.primary};
  }

  .hero-label {
    font-size: 1rem;
    opacity: 0.55;
  }

  /* Bar chart */
  .bar-list {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .bar-row {
    display: grid;
    grid-template-columns: 130px 1fr 60px;
    align-items: center;
    gap: 0.75rem;
  }

  .alc-list .bar-row {
    grid-template-columns: 140px 1fr 64px 72px;
  }

  .bar-label {
    font-size: 0.88rem;
    opacity: 0.8;
    text-align: right;
    color: ${theme.colors.primary};
    text-decoration: none;
  }

  .bar-link {
    transition: opacity 0.15s;
    &:hover { opacity: 1; text-decoration: underline; }
  }

  .bar-track {
    height: 6px;
    background: rgba(255, 208, 110, 0.1);
    border-radius: 999px;
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    background: ${theme.colors.primary};
    border-radius: 999px;
    transition: width 0.4s ease;
  }

  .bar-count {
    font-size: 0.82rem;
    opacity: 0.55;
    text-align: right;
  }

  .section-note {
    font-size: 0.8rem;
    opacity: 0.4;
    margin-top: -0.75rem;
    margin-bottom: 1rem;
  }

  .alc-value {
    font-size: 0.78rem;
    white-space: nowrap;
  }

  .alc-badge {
    font-size: 0.68rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    text-align: center;
  }

  .alc-badge.alc-médio      { background: rgba(255, 180, 50, 0.15);  color: #ffb432; }
  .alc-badge.alc-forte      { background: rgba(220, 80, 80, 0.15);   color: #e06060; }
  .alc-badge.alc-sem-álcool { background: rgba(255,255,255,0.06);    color: rgba(255,255,255,0.3); }

  /* Top ingredients */
  .ingredient-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .ingredient-list li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.95rem;
  }

  .ing-rank {
    font-size: 0.7rem;
    opacity: 0.35;
    width: 24px;
    text-align: right;
    flex-shrink: 0;
  }

  .ing-name {
    flex: 1;
    text-transform: capitalize;
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: opacity 0.15s;
    &:hover { opacity: 1; text-decoration: underline; }
  }

  .ing-count {
    opacity: 0.45;
    font-size: 0.85rem;
  }
`;
