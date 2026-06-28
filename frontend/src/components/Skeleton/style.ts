import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

const shimmerBg = `
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.04) 25%,
    rgba(255,255,255,0.09) 50%,
    rgba(255,255,255,0.04) 75%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;

export const StyledSkeletonBlock = styled.div`
  ${shimmerBg}
  flex-shrink: 0;
`;

// ── Grid skeleton (HomePage / CategoryPage) ──────────────────────────
export const StyledDrinkGridSkeleton = styled.div`
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
  @media (min-width: 900px)  { grid-template-columns: repeat(4, 1fr); }
  @media (min-width: 1100px) { grid-template-columns: repeat(5, 1fr); }
`;

export const StyledCardSkeleton = styled.div`
  border-radius: 8px;
  overflow: hidden;
  background: #1c1c1c;

  .card-image-sk {
    width: 100%;
    aspect-ratio: 1 / 1;
    ${shimmerBg}
  }

  .card-name-sk {
    padding: 0.55rem 0.75rem 0.65rem;
  }
`;

// ── DrinkPage skeleton ────────────────────────────────────────────────
export const StyledDrinkPageSkeleton = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 1.25rem 1rem 6rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .top-bar-sk {
    margin-bottom: 0.25rem;
  }

  .header-sk {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .tags-sk {
    display: flex;
    gap: 0.4rem;
  }

  .body-sk {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: flex-start;
      gap: 3rem;
    }
  }

  .image-sk {
    width: 100%;
    aspect-ratio: 3 / 4;
    border-radius: 10px;
    ${shimmerBg}

    @media (min-width: 768px) {
      width: 280px;
      flex-shrink: 0;
      aspect-ratio: 4 / 5;
    }

    @media (min-width: 1024px) {
      width: 340px;
    }
  }

  .details-sk {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
`;
