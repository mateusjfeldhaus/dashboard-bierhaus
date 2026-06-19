import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { StyledFilterDrinksByIngredientForm } from "./style";

export interface IFilterDrinksByIngredientFormProps {
  ingredient: string;
}

export const FilterDrinksByIngredientForm = ({ submitFunction }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFilterDrinksByIngredientFormProps>();

  const onSubmit = (data: IFilterDrinksByIngredientFormProps) => {
    submitFunction(data, reset);
  };

  return (
    <StyledFilterDrinksByIngredientForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="ingredient"
        label="Está procurando por um Drink com qual ingrediente?"
        type="text"
        error={errors.ingredient?.message}
        placeholder="Digite o nome do ingrediente"
        register={register("ingredient")}
      />
      <button>Procurar</button>
    </StyledFilterDrinksByIngredientForm>
  );
};
