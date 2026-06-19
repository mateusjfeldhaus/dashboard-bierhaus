import styled, { keyframes } from "styled-components";
import { theme } from "../../styles/theme";

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
`;

export const StyledTimer = styled.div<{ $done: boolean }>`
  margin-top: 1.5rem;
  padding: 1.25rem;
  border: 1px solid rgba(255, 208, 110, 0.15);
  border-radius: 12px;
  background: rgba(255, 208, 110, 0.03);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 280px;

  .timer-presets {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .preset-btn {
    background: none;
    border: 1px solid rgba(255, 208, 110, 0.2);
    color: ${theme.colors.primary};
    border-radius: 999px;
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
    font-family: inherit;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.15s;

    &:hover { opacity: 0.9; }
    &.active {
      opacity: 1;
      border-color: rgba(255, 208, 110, 0.6);
      background: rgba(255, 208, 110, 0.08);
    }
  }

  .custom-wrap {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .custom-input {
    width: 42px;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255, 208, 110, 0.25);
    color: ${theme.colors.primary};
    font-size: 0.85rem;
    font-family: inherit;
    text-align: center;
    padding: 0.15rem 0;
    outline: none;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button { -webkit-appearance: none; }

    &:focus { border-color: rgba(255, 208, 110, 0.6); }
    &::placeholder { opacity: 0.3; }
  }

  .custom-label {
    font-size: 0.75rem;
    opacity: 0.35;
  }

  .timer-body {
    position: relative;
    width: 80px;
    height: 80px;
    align-self: center;
    animation: ${({ $done }) => $done ? pulse : "none"} 0.6s ease-in-out 3;
  }

  .timer-ring {
    width: 80px;
    height: 80px;
    transform: rotate(-90deg);
  }

  .ring-bg {
    fill: none;
    stroke: rgba(255, 208, 110, 0.08);
    stroke-width: 4;
  }

  .ring-fill {
    fill: none;
    stroke: ${({ $done }) => $done ? "#ff9f43" : "rgba(255, 208, 110, 0.6)"};
    stroke-width: 4;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.9s linear, stroke 0.3s;
  }

  .timer-display {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.05rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: ${({ $done }) => $done ? "#ff9f43" : theme.colors.primary};
    transition: color 0.3s;
  }

  .timer-controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .ctrl-btn {
    background: none;
    font-family: inherit;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.15s;

    &.start {
      flex: 1;
      border: 1px solid rgba(255, 208, 110, 0.35);
      color: ${theme.colors.primary};
      padding: 0.4rem 0;
      font-size: 0.85rem;

      &:hover:not(:disabled) { background: rgba(255, 208, 110, 0.08); }
      &:disabled { opacity: 0.25; cursor: not-allowed; }
    }

    &.pause {
      flex: 1;
      border: 1px solid rgba(255, 208, 110, 0.2);
      color: ${theme.colors.primary};
      padding: 0.4rem 0;
      font-size: 0.85rem;
      opacity: 0.7;

      &:hover { opacity: 1; }
    }

    &.reset {
      border: 1px solid rgba(255, 208, 110, 0.15);
      color: ${theme.colors.primary};
      width: 32px;
      height: 32px;
      font-size: 1rem;
      opacity: 0.35;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover { opacity: 0.8; }
    }
  }
`;
