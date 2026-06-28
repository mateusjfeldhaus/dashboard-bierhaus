import React, { useState, useRef, useEffect } from "react";
import { uploadImage, IngredientUnit } from "../../api/client";
import { UnitSelect } from "../UnitSelect";
import { CATEGORY_TYPES } from "../../constants/categories";
import {
  StyledPage, StyledTitle, StyledForm, StyledSection, StyledLabel,
  StyledInput, StyledCategoryGrid, StyledCategoryChip,
  StyledIngredientRow, StyledStepRow, StyledAddBtn, StyledRemoveBtn,
  StyledImagePreview, StyledSubmitBtn, StyledError, StyledSuccess,
} from "./style";

interface Ingredient { name: string; quantity: string; unit: IngredientUnit; }

export interface DrinkFormPayload {
  name: string;
  types: string[];
  recipe: string;
  images: string[];
  ingredients: Ingredient[];
}

export interface DrinkFormInitialData {
  name: string;
  types: string[];
  steps: string[];
  ingredients: Ingredient[];
  existingImages: string[];
}

interface DrinkFormProps {
  mode: "create" | "edit";
  title: string;
  initialData: DrinkFormInitialData;
  onSave: (payload: DrinkFormPayload) => Promise<void>;
  onSuccess: (drinkName: string) => void;
}

const EMPTY_INGREDIENT: Ingredient = { name: "", quantity: "", unit: "ml" };

export const DrinkForm = ({ mode, title, initialData, onSave, onSuccess }: DrinkFormProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName]                   = useState(initialData.name);
  const [types, setTypes]                 = useState(initialData.types);
  const [steps, setSteps]                 = useState(initialData.steps);
  const [ingredients, setIngredients]     = useState<Ingredient[]>(initialData.ingredients);
  const [existingImages, setExistingImages] = useState(initialData.existingImages);
  const [newFiles, setNewFiles]           = useState<File[]>([]);
  const [newPreviews, setNewPreviews]     = useState<string[]>([]);
  const [uploading, setUploading]         = useState(false);
  const [submitting, setSubmitting]       = useState(false);
  const [error, setError]                 = useState<string | null>(null);
  const [success, setSuccess]             = useState(false);

  // Revoga object URLs ao desmontar
  useEffect(() => () => newPreviews.forEach(URL.revokeObjectURL), []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Categorias ────────────────────────────────────────────────────────
  const toggleType = (t: string) =>
    setTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  // ── Ingredientes ──────────────────────────────────────────────────────
  const updateIngredient = <K extends keyof Ingredient>(i: number, field: K, value: Ingredient[K]) =>
    setIngredients((prev) => prev.map((ing, idx) => idx === i ? { ...ing, [field]: value } : ing));
  const addIngredient    = () => setIngredients((prev) => [...prev, { ...EMPTY_INGREDIENT }]);
  const removeIngredient = (i: number) => setIngredients((prev) => prev.filter((_, idx) => idx !== i));

  // ── Passos ────────────────────────────────────────────────────────────
  const updateStep = (i: number, value: string) =>
    setSteps((prev) => prev.map((s, idx) => idx === i ? value : s));
  const addStep    = () => setSteps((prev) => [...prev, ""]);
  const removeStep = (i: number) => setSteps((prev) => prev.filter((_, idx) => idx !== i));

  // ── Imagens ───────────────────────────────────────────────────────────
  const handleNewImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setNewFiles((prev) => [...prev, ...files]);
    setNewPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeNewPreview = (i: number) => {
    URL.revokeObjectURL(newPreviews[i]);
    setNewFiles((prev) => prev.filter((_, idx) => idx !== i));
    setNewPreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const removeExistingImage = (i: number) =>
    setExistingImages((prev) => prev.filter((_, idx) => idx !== i));

  const getImageSrc = (src: string) =>
    src.startsWith("http") ? src : `${process.env.PUBLIC_URL}/assets/${src.split("/").pop()}`;

  // ── Submit ────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const drinkName = mode === "create" ? name.trim() : initialData.name;
    if (mode === "create" && !drinkName) return setError("Nome do drink é obrigatório.");
    if (!types.length)                   return setError("Selecione pelo menos uma categoria.");
    const validSteps = steps.filter((s) => s.trim());
    if (!validSteps.length)              return setError("Adicione pelo menos um passo na receita.");
    const validIngredients = ingredients.filter((i) => i.name.trim() && i.quantity.trim());
    if (!validIngredients.length)        return setError("Adicione pelo menos um ingrediente.");

    setSubmitting(true);
    try {
      let uploadedUrls: string[] = [];
      if (newFiles.length) {
        setUploading(true);
        uploadedUrls = await Promise.all(newFiles.map((f) => uploadImage(f)));
        setUploading(false);
      }
      await onSave({
        name: drinkName,
        types,
        recipe: validSteps.join("\n"),
        images: [...existingImages, ...uploadedUrls],
        ingredients: validIngredients,
      });
      setSuccess(true);
      setTimeout(() => onSuccess(drinkName), 1500);
    } catch {
      setError("Erro ao salvar. Tente novamente.");
      setUploading(false);
    } finally {
      setSubmitting(false);
    }
  };

  const btnLabel = uploading
    ? "Enviando fotos..."
    : submitting
    ? "Salvando..."
    : mode === "create" ? "Criar Drink" : "Salvar alterações";

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <StyledPage>
      <StyledTitle>{title}</StyledTitle>
      <StyledForm onSubmit={handleSubmit}>

        {/* Nome — apenas em criação */}
        {mode === "create" && (
          <StyledSection>
            <StyledLabel>Nome</StyledLabel>
            <StyledInput
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Negroni"
            />
          </StyledSection>
        )}

        {/* Categorias */}
        <StyledSection>
          <StyledLabel>Categorias</StyledLabel>
          <StyledCategoryGrid>
            {CATEGORY_TYPES.map((cat) => (
              <StyledCategoryChip
                key={cat}
                type="button"
                $active={types.includes(cat)}
                onClick={() => toggleType(cat)}
              >
                {cat}
              </StyledCategoryChip>
            ))}
          </StyledCategoryGrid>
        </StyledSection>

        {/* Ingredientes */}
        <StyledSection>
          <StyledLabel>Ingredientes</StyledLabel>
          {ingredients.map((ing, i) => (
            <StyledIngredientRow key={i}>
              <StyledInput
                type="text"
                placeholder="Nome"
                value={ing.name}
                onChange={(e) => updateIngredient(i, "name", e.target.value)}
              />
              <StyledInput
                type="text"
                placeholder="Qtd"
                value={ing.quantity}
                onChange={(e) => updateIngredient(i, "quantity", e.target.value)}
              />
              <UnitSelect value={ing.unit} onChange={(v) => updateIngredient(i, "unit", v)} />
              {ingredients.length > 1 && (
                <StyledRemoveBtn type="button" onClick={() => removeIngredient(i)}>✕</StyledRemoveBtn>
              )}
            </StyledIngredientRow>
          ))}
          <StyledAddBtn type="button" onClick={addIngredient}>+ Ingrediente</StyledAddBtn>
        </StyledSection>

        {/* Receita */}
        <StyledSection>
          <StyledLabel>Receita (passos)</StyledLabel>
          {steps.map((step, i) => (
            <StyledStepRow key={i}>
              <span className="step-number">{i + 1}</span>
              <StyledInput
                type="text"
                placeholder={i === 0 ? "Ex: Adicionar gelo ao copo" : "Próximo passo..."}
                value={step}
                onChange={(e) => updateStep(i, e.target.value)}
              />
              {steps.length > 1 && (
                <StyledRemoveBtn type="button" onClick={() => removeStep(i)}>✕</StyledRemoveBtn>
              )}
            </StyledStepRow>
          ))}
          <StyledAddBtn type="button" onClick={addStep}>+ Passo</StyledAddBtn>
        </StyledSection>

        {/* Fotos existentes (edit mode) */}
        {existingImages.length > 0 && (
          <StyledSection>
            <StyledLabel>Fotos atuais</StyledLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {existingImages.map((src, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <StyledImagePreview src={getImageSrc(src)} alt={`foto ${i + 1}`} />
                  <StyledRemoveBtn
                    type="button"
                    onClick={() => removeExistingImage(i)}
                    style={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.5)", opacity: 1, borderRadius: "50%", width: 24, height: 24 }}
                  >✕</StyledRemoveBtn>
                </div>
              ))}
            </div>
          </StyledSection>
        )}

        {/* Novas fotos */}
        <StyledSection>
          <StyledLabel>{mode === "edit" && existingImages.length > 0 ? "Adicionar fotos" : "Fotos (opcional)"}</StyledLabel>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={handleNewImages}
          />
          <StyledAddBtn type="button" onClick={() => fileRef.current?.click()}>
            + Escolher fotos
          </StyledAddBtn>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {newPreviews.map((src, i) => (
              <div key={i} style={{ position: "relative" }}>
                <StyledImagePreview src={src} alt={`preview ${i + 1}`} />
                <StyledRemoveBtn
                  type="button"
                  onClick={() => removeNewPreview(i)}
                  style={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.5)", opacity: 1, borderRadius: "50%", width: 24, height: 24 }}
                >✕</StyledRemoveBtn>
              </div>
            ))}
          </div>
        </StyledSection>

        {error   && <StyledError>{error}</StyledError>}
        {success && <StyledSuccess>{mode === "create" ? "Drink criado! Redirecionando..." : "Salvo! Redirecionando..."}</StyledSuccess>}

        <StyledSubmitBtn type="submit" disabled={submitting}>
          {btnLabel}
        </StyledSubmitBtn>
      </StyledForm>
    </StyledPage>
  );
};
