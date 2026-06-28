import { useNavigate } from "react-router-dom";
import { createDrink } from "../../api/client";
import { DrinkForm, DrinkFormPayload } from "../../components/DrinkForm";

export const NovoDrinkPage = () => {
  const navigate = useNavigate();

  const handleSave = async (payload: DrinkFormPayload) => {
    await createDrink({
      name:        payload.name,
      types:       payload.types,
      recipe:      payload.recipe,
      images:      payload.images,
      ingredients: payload.ingredients,
    });
  };

  return (
    <DrinkForm
      mode="create"
      title="Novo Drink"
      initialData={{
        name:           "",
        types:          [],
        steps:          [""],
        ingredients:    [{ name: "", quantity: "", unit: "ml" }],
        existingImages: [],
      }}
      onSave={handleSave}
      onSuccess={(name) => navigate(`/drink/${encodeURIComponent(name)}`)}
    />
  );
};
