import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, updateDrink } from "../../api/client";
import { DrinkForm, DrinkFormInitialData, DrinkFormPayload } from "../../components/DrinkForm";
import { DrinkPageSkeleton } from "../../components/Skeleton";

export const EditDrinkPage = () => {
  const { name } = useParams<{ name: string }>();
  const navigate  = useNavigate();
  const decoded   = decodeURIComponent(name ?? "");

  const [initialData, setInitialData] = useState<DrinkFormInitialData | null>(null);

  useEffect(() => {
    if (!decoded) return;
    api.drinks.get(decoded)
      .then((drink) => {
        const steps = drink.recipe.split("\n").filter((s) => s.trim());
        setInitialData({
          name:           drink.name,
          types:          drink.type,
          steps:          steps.length ? steps : [""],
          ingredients:    drink.ingredients.length
            ? drink.ingredients.map((i) => ({ name: i.name, quantity: i.quantity, unit: i.unit ?? "ml" }))
            : [{ name: "", quantity: "", unit: "ml" }],
          existingImages: drink.img,
        });
      })
      .catch(() => navigate(-1));
  }, [decoded]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => navigate(-1);

  if (!initialData) return <DrinkPageSkeleton />;

  const handleSave = async (payload: DrinkFormPayload) => {
    await updateDrink(decoded, {
      types:       payload.types,
      recipe:      payload.recipe,
      images:      payload.images,
      ingredients: payload.ingredients,
    });
  };

  return (
    <DrinkForm
      mode="edit"
      title={`Editar: ${decoded}`}
      initialData={initialData}
      onSave={handleSave}
      onSuccess={(n) => navigate(`/drink/${encodeURIComponent(n)}`)}
      onClose={handleClose}
    />
  );
};
