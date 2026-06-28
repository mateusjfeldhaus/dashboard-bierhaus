import React from "react";
import {
  StyledSkeletonBlock,
  StyledDrinkGridSkeleton,
  StyledDrinkPageSkeleton,
  StyledCardSkeleton,
} from "./style";

// Bloco base reutilizável
export const SkeletonBlock = ({
  width = "100%",
  height = "1rem",
  radius = "4px",
  style,
}: {
  width?: string;
  height?: string;
  radius?: string;
  style?: React.CSSProperties;
}) => <StyledSkeletonBlock $width={width} $height={height} $radius={radius} style={style} />;

// Skeleton de um card individual (espelha DrinkCard)
const CardSkeleton = () => (
  <StyledCardSkeleton>
    <div className="card-image-sk" />
    <div className="card-name-sk">
      <SkeletonBlock width="70%" height="0.75rem" />
    </div>
  </StyledCardSkeleton>
);

// Grid de cards — para HomePage e CategoryPage
export const DrinkGridSkeleton = ({ count = 10 }: { count?: number }) => (
  <StyledDrinkGridSkeleton>
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </StyledDrinkGridSkeleton>
);

// Página individual de drink
export const DrinkPageSkeleton = () => (
  <StyledDrinkPageSkeleton>
    <div className="top-bar-sk">
      <SkeletonBlock width="48px" height="0.85rem" />
    </div>
    <div className="header-sk">
      <SkeletonBlock width="55%" height="2rem" radius="6px" />
      <div className="tags-sk">
        <SkeletonBlock width="64px" height="1.1rem" radius="999px" />
        <SkeletonBlock width="48px" height="1.1rem" radius="999px" />
      </div>
    </div>
    <div className="body-sk">
      <div className="image-sk" />
      <div className="details-sk">
        <SkeletonBlock width="80px" height="0.65rem" />
        {[90, 75, 85, 60].map((w, i) => (
          <SkeletonBlock key={i} width={`${w}%`} height="0.9rem" />
        ))}
        <SkeletonBlock width="80px" height="0.65rem" style={{ marginTop: "1.5rem" }} />
        {[95, 80, 70].map((w, i) => (
          <SkeletonBlock key={i} width={`${w}%`} height="0.9rem" />
        ))}
      </div>
    </div>
  </StyledDrinkPageSkeleton>
);
