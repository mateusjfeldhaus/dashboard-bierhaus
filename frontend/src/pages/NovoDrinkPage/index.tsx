import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage, createDrink } from "../../api/client";
import {
  StyledPage,
  StyledTitle,
  StyledForm,
  StyledSection,
  StyledLabel,
  StyledInput,
  StyledTextarea,
  StyledCategoryGrid,
  StyledCategoryChip,
  StyledIngredientRow,
  StyledAddBtn,
  StyledRemoveBtn,
  StyledImagePreview,
  StyledSubmitBtn,
  StyledError,
  StyledSuccess,
} from "./style";

const CATEGORIES = [
  "Cachaça","Espumante","Gin","Licores","Não Alcoólicos","Rum","Sake","Tequila","Vodka","Whisky",
];

interface Ingredient { name: string; quantity: string; }

export const NovoDrinkPage = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [recipe, setRecipe] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: "", quantity: "" }]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const toggleType = (t: string) =>
    setTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  const updateIngredient = (i: number, field: keyof Ingredient, value: string) =>
    setIngredients((prev) => prev.map((ing, idx) => idx === i ? { ...ing, [field]: value } : ing));

  const addIngredient = () => setIngredients((prev) => [...prev, { name: "", quantity: "" }]);
  const removeIngredient = (i: number) => setIngredients((prev) => prev.filter((_, idx) => idx !== i));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError("Nome do drink é obrigatório.");
    if (!types.length) return setError("Selecione pelo menos uma categoria.");
    if (!recipe.trim()) return setError("Receita é obrigatória.");
    const validIngredients = ingredients.filter((i) => i.name.trim() && i.quantity.trim());
    if (!validIngredients.length) return setError("Adicione pelo menos um ingrediente.");

    setSubmitting(true);
    try {
      let images: string[] = [];
      if (imageFile) {
        setUploading(true);
        images = [await uploadImage(imageFile)];
        setUploading(false);
      }
      await createDrink({ name: name.trim(), types, recipe: recipe.trim(), images, ingredients: validIngredients });
      setSuccess(true);
      setTimeout(() => navigate(`/drink/${encodeURIComponent(name.trim())}`), 1500);
    } catch {
      setError("Erro ao salvar drink. Tente novamente.");
      setUploading(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StyledPage>
      <StyledTitle>Novo Drink</StyledTitle>

      <StyledForm onSubmit={handleSubmit}>
        <StyledSection>
          <StyledLabel>Nome</StyledLabel>
          <StyledInput type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Negroni" />
        </StyledSection>

        <StyledSection>
          <StyledLabel>Categorias</StyledLabel>
          <StyledCategoryGrid>
            {CATEGORIES.map((cat) => (
              <StyledCategoryChip key={cat} type="button" $active={types.includes(cat)} onClick={() => toggleType(cat)}>
                {cat}
              </StyledCategoryChip>
            ))}
          </StyledCategoryGrid>
        </StyledSection>

        <StyledSection>
          <StyledLabel>Ingredientes</StyledLabel>
          {ingredients.map((ing, i) => (
            <StyledIngredientRow key={i}>
              <StyledInput type="text" placeholder="Nome (ex: Gin)" value={ing.name} onChange={(e) => updateIngredient(i, "name", e.target.value)} />
              <StyledInput type="text" placeholder="Qtd (ex: 50)" value={ing.quantity} onChange={(e) => updateIngredient(i, "quantity", e.target.value)} />
              {ingredients.length > 1 && <StyledRemoveBtn type="button" onClick={() => removeIngredient(i)}>✕</StyledRemoveBtn>}
            </StyledIngredientRow>
          ))}
          <StyledAddBtn type="button" onClick={addIngredient}>+ Ingrediente</StyledAddBtn>
        </StyledSection>

        <StyledSection>
          <StyledLabel>Receita</StyledLabel>
          <StyledTextarea rows={5} value={recipe} onChange={(e) => setRecipe(e.target.value)} placeholder="Modo de preparo..." />
        </StyledSection>

        <StyledSection>
          <StyledLabel>Foto (opcional)</StyledLabel>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
          <StyledAddBtn type="button" onClick={() => fileRef.current?.click()}>
            {imageFile ? "Trocar foto" : "Escolher foto"}
          </StyledAddBtn>
          {imagePreview && <StyledImagePreview src={imagePreview} alt="preview" />}
        </StyledSection>

        {error && <StyledError>{error}</StyledError>}
        {success && <StyledSuccess>Drink criado! Redirecionando...</StyledSuccess>}

        <StyledSubmitBtn type="submit" disabled={submitting}>
          {uploading ? "Enviando foto..." : submitting ? "Salvando..." : "Criar Drink"}
        </StyledSubmitBtn>
      </StyledForm>
    </StyledPage>
  );
};
