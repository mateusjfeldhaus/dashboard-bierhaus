import { useContext } from "react";
import { useParams } from "react-router-dom";
import { DrinkContext } from "../../providers/drinksContext";
import { CATEGORIES } from "../../constants/categories";
import { DrinkList } from "../../components/DrinkList";
import { DrinkGridSkeleton } from "../../components/Skeleton";
import { StyledDrinkList } from "../../styles/DrinkList";
import { NotFound } from "../404NotFound";

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { allDrinks, loading } = useContext(DrinkContext);

  const config = CATEGORIES.find((c) => c.slug === category);
  if (!config) return <NotFound />;

  const drinks = allDrinks.filter((d) => d.type.includes(config.type));

  return (
    <>
      <StyledDrinkList>
        <p>{config.description}</p>
      </StyledDrinkList>
      {loading ? <DrinkGridSkeleton count={6} /> : <DrinkList drinks={drinks} />}
    </>
  );
};
