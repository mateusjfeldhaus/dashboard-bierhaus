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
}: {
  width?: string;
  height?: string;
  radius?: string;
}) => <StyledSkeletonBlock style={{ width, height, borderRadius: radius }} />;

// Skeleton de um card individual (espelha DrinkCard)
const CardSkeleton = () => (
  <StyledCardSkeleton>
    <div className="card-image-sk" />
    <div className="card-name-sk">
      <StyledSkeletonBlock style={{ width: "70%", height: "0.75rem", borderRadius: "4px" }} />
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
      <StyledSkeletonBlock width="48px" height="0.85rem" />
    </div>
    <div className="header-sk">
      <StyledSkeletonBlock width="55%" height="2rem" radius="6px" />
      <div className="tags-sk">
        <StyledSkeletonBlock width="64px" height="1.1rem" radius="999px" />
        <StyledSkeletonBlock width="48px" height="1.1rem" radius="999px" />
      </div>
    </div>
    <div className="body-sk">
      <div className="image-sk" />
      <div className="details-sk">
        <StyledSkeletonBlock width="80px" height="0.65rem" radius="4px" />
        {[90, 75, 85, 60].map((w, i) => (
          <StyledSkeletonBlock key={i} width={`${w}%`} height="0.9rem" radius="4px" />
        ))}
        <StyledSkeletonBlock width="80px" height="0.65rem" radius="4px" style={{ marginTop: "1.5rem" } as any} />
        {[95, 80, 70].map((w, i) => (
          <StyledSkeletonBlock key={i} width={`${w}%`} height="0.9rem" radius="4px" />
        ))}
      </div>
    </div>
  </StyledDrinkPageSkeleton>
);
