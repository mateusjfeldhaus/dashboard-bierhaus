import { useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { DrinkContext } from "../../providers/drinksContext";
import { DrinkList } from "../../components/DrinkList";
import {
  StyledIngredientHeader,
  StyledBackBtn,
  StyledTitle,
  StyledSubtitle,
} from "./style";

export const IngredientPage = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { allDrinks, filterDrinksByIngredient } = useContext(DrinkContext);

  const decoded = decodeURIComponent(name ?? "");
  const drinks = filterDrinksByIngredient(allDrinks, decoded);

  const fromTab = (location.state as { fromTab?: string } | null)?.fromTab;

  const handleBack = () => {
    if (fromTab) {
      navigate("/utils", { state: { tab: fromTab } });
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <StyledIngredientHeader>
        <StyledBackBtn onClick={handleBack}>Voltar</StyledBackBtn>
        <StyledTitle>{decoded}</StyledTitle>
        <StyledSubtitle>
          {drinks.length === 0
            ? "Nenhum drink encontrado com este ingrediente."
            : `${drinks.length} drink${drinks.length > 1 ? "s" : ""} com este ingrediente`}
        </StyledSubtitle>
      </StyledIngredientHeader>
      <DrinkList drinks={drinks} />
    </>
  );
};
