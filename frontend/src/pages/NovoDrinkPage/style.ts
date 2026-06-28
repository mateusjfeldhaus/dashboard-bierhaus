import styled, { keyframes } from "styled-components";
import { theme } from "../../styles/theme";

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

/* ── Modal overlay ──────────────────────────────────────────────────────── */

export const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(3px);
  z-index: 200;
  animation: ${fadeIn} 0.18s ease;
`;

export const StyledPanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(520px, 100vw);
  background: #0e0e0e;
  border-left: 1px solid rgba(255, 208, 110, 0.08);
  overflow-y: auto;
  z-index: 201;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.22s cubic-bezier(0.22, 1, 0.36, 1);

  /* scrollbar */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 208, 110, 0.12) transparent;
`;

/* ── Panel header ───────────────────────────────────────────────────────── */

export const StyledPanelHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  background: #0e0e0e;
  border-bottom: 1px solid rgba(255, 208, 110, 0.08);
`;

export const StyledTitle = styled.h2`
  font-size: 1.05rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  letter-spacing: 0.01em;
  margin: 0;
`;

export const StyledCloseBtn = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  opacity: 0.35;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem 0.4rem;
  line-height: 1;
  transition: opacity 0.15s;
  border-radius: 4px;

  &:hover { opacity: 0.8; }
`;

/* ── Full-page wrapper (NovoDrinkPage) ──────────────────────────────────── */

export const StyledPage = styled.div`
  width: 100%;
  max-width: 640px;
  padding: 2rem 1rem 6rem;
`;

/* ── Form body ──────────────────────────────────────────────────────────── */

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  padding: 1.5rem;
`;

export const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const StyledLabel = styled.label`
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.35;
  font-weight: 700;
`;

export const StyledInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 208, 110, 0.18);
  color: ${theme.colors.primary};
  font-size: 0.95rem;
  font-family: inherit;
  padding: 0.45rem 0;
  outline: none;
  width: 100%;
  min-width: 0;
  transition: border-color 0.15s;

  &:focus { border-color: rgba(255, 208, 110, 0.55); }
  &::placeholder { color: ${theme.colors.primary}; opacity: 0.18; }
`;

export const StyledTextarea = styled.textarea`
  background: rgba(255, 208, 110, 0.03);
  border: 1px solid rgba(255, 208, 110, 0.12);
  border-radius: 6px;
  color: ${theme.colors.primary};
  font-size: 0.9rem;
  font-family: inherit;
  padding: 0.75rem 1rem;
  outline: none;
  resize: vertical;
  line-height: 1.7;
  transition: border-color 0.15s;

  &:focus { border-color: rgba(255, 208, 110, 0.35); }
  &::placeholder { color: ${theme.colors.primary}; opacity: 0.2; }
`;

/* ── Category chips ─────────────────────────────────────────────────────── */

export const StyledCategoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

export const StyledCategoryChip = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? "rgba(255,208,110,0.12)" : "transparent")};
  border: 1px solid ${({ $active }) =>
    $active ? "rgba(255,208,110,0.55)" : "rgba(255,208,110,0.14)"};
  color: ${theme.colors.primary};
  border-radius: 999px;
  padding: 0.25rem 0.8rem;
  font-size: 0.8rem;
  font-family: inherit;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  transition: all 0.12s;

  &:hover { opacity: 1; border-color: rgba(255, 208, 110, 0.4); }
`;

/* ── Ingredient / step rows ─────────────────────────────────────────────── */

export const StyledIngredientRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 72px 88px 20px;
  gap: 0.6rem;
  align-items: flex-end;
`;

export const StyledStepRow = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  gap: 0.6rem;
  align-items: flex-end;

  .step-number {
    font-size: 0.7rem;
    opacity: 0.25;
    font-weight: 700;
    padding-bottom: 0.5rem;
    text-align: right;
  }
`;

export const StyledAddBtn = styled.button`
  background: none;
  border: 1px dashed rgba(255, 208, 110, 0.18);
  color: ${theme.colors.primary};
  border-radius: 6px;
  padding: 0.35rem 0.8rem;
  font-size: 0.78rem;
  font-family: inherit;
  cursor: pointer;
  opacity: 0.45;
  align-self: flex-start;
  transition: all 0.12s;

  &:hover { opacity: 0.85; border-color: rgba(255, 208, 110, 0.38); }
`;

export const StyledRemoveBtn = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  opacity: 0.18;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0;
  margin-bottom: 0.35rem;
  line-height: 1;
  transition: opacity 0.12s;

  &:hover { opacity: 0.65; }
`;

/* ── Image grid ─────────────────────────────────────────────────────────── */

export const StyledImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
`;

export const StyledImageThumb = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(255, 208, 110, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  button {
    position: absolute;
    top: 4px;
    right: 4px;
    background: rgba(0, 0, 0, 0.65);
    border: none;
    color: ${theme.colors.primary};
    border-radius: 50%;
    width: 22px;
    height: 22px;
    font-size: 0.7rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.12s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  &:hover button { opacity: 1; }
`;

/* ── Legacy export (kept for compat) ──────────────────────────────────────*/
export const StyledImagePreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 6px;
  object-fit: cover;
  opacity: 0.85;
  border: 1px solid rgba(255, 208, 110, 0.1);
`;

/* ── Submit / feedback ──────────────────────────────────────────────────── */

export const StyledSubmitBtn = styled.button`
  background: rgba(255, 208, 110, 0.07);
  border: 1px solid rgba(255, 208, 110, 0.35);
  color: ${theme.colors.primary};
  border-radius: 6px;
  padding: 0.7rem 1.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s;
  align-self: flex-start;

  &:hover:not(:disabled) {
    background: rgba(255, 208, 110, 0.13);
    border-color: rgba(255, 208, 110, 0.65);
  }
  &:disabled { opacity: 0.3; cursor: not-allowed; }
`;

export const StyledArchiveBtn = styled.button<{ $danger: boolean }>`
  background: none;
  border: 1px solid ${({ $danger }) => $danger ? "rgba(255,100,100,0.35)" : "rgba(255,208,110,0.15)"};
  color: ${({ $danger }) => $danger ? "#ff7070" : theme.colors.primary};
  border-radius: 6px;
  padding: 0.45rem 0.9rem;
  font-size: 0.78rem;
  font-family: inherit;
  cursor: pointer;
  opacity: ${({ $danger }) => $danger ? 0.75 : 0.35};
  transition: all 0.15s;

  &:hover:not(:disabled) { opacity: 1; }
  &:disabled { opacity: 0.2; cursor: not-allowed; }
`;

export const StyledError = styled.p`
  color: #ff7070;
  font-size: 0.82rem;
  padding: 0.55rem 0.85rem;
  border: 1px solid rgba(255, 100, 100, 0.2);
  border-radius: 6px;
  background: rgba(255, 100, 100, 0.04);
  margin: 0;
`;

export const StyledSuccess = styled.p`
  color: ${theme.colors.primary};
  font-size: 0.82rem;
  opacity: 0.7;
  padding: 0.55rem 0.85rem;
  border: 1px solid rgba(255, 208, 110, 0.15);
  border-radius: 6px;
  background: rgba(255, 208, 110, 0.04);
  margin: 0;
`;
