import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { uploadImage, IngredientUnit } from "../../api/client";
import { UnitSelect } from "../UnitSelect";
import { CATEGORY_TYPES } from "../../constants/categories";
import {
  StyledPage, StyledTitle, StyledCloseBtn,
  StyledOverlay, StyledPanel, StyledPanelHeader,
  StyledForm, StyledSection, StyledLabel,
  StyledInput, StyledCategoryGrid, StyledCategoryChip,
  StyledIngredientRow, StyledStepRow, StyledAddBtn, StyledRemoveBtn,
  StyledImageGrid, StyledImageThumb,
  StyledSubmitBtn, StyledError, StyledSuccess,
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
  onClose?: () => void; // fornecido em modo edit → abre como modal
}

const EMPTY_INGREDIENT: Ingredient = { name: "", quantity: "", unit: "ml" };

export const DrinkForm = ({ mode, title, initialData, onSave, onSuccess, onClose }: DrinkFormProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const isModal = !!onClose;

  const [name, setName]                     = useState(initialData.name);
  const [types, setTypes]                   = useState(initialData.types);
  const [steps, setSteps]                   = useState(initialData.steps);
  const [ingredients, setIngredients]       = useState<Ingredient[]>(initialData.ingredients);
  const [existingImages, setExistingImages] = useState(initialData.existingImages);
  const [newFiles, setNewFiles]             = useState<File[]>([]);
  const [newPreviews, setNewPreviews]       = useState<string[]>([]);
  const [uploading, setUploading]           = useState(false);
  const [submitting, setSubmitting]         = useState(false);
  const [error, setError]                   = useState<string | null>(null);
  const [success, setSuccess]               = useState(false);

  // ESC fecha o modal
  useEffect(() => {
    if (!isModal) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose!(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isModal, onClose]);

  // bloqueia scroll do body quando modal aberto
  useEffect(() => {
    if (!isModal) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isModal]);

  // revoga object URLs ao desmontar
  useEffect(() => () => newPreviews.forEach(URL.revokeObjectURL), []); // eslint-disable-line

  // ── Categorias ────────────────────────────────────────────────────────
  const toggleType = (t: string) =>
    setTypes((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);

  // ── Ingredientes ──────────────────────────────────────────────────────
  const updateIngredient = <K extends keyof Ingredient>(i: number, k: K, v: Ingredient[K]) =>
    setIngredients((p) => p.map((ing, idx) => idx === i ? { ...ing, [k]: v } : ing));
  const addIngredient    = () => setIngredients((p) => [...p, { ...EMPTY_INGREDIENT }]);
  const removeIngredient = (i: number) => setIngredients((p) => p.filter((_, idx) => idx !== i));

  // ── Passos ────────────────────────────────────────────────────────────
  const updateStep = (i: number, v: string) =>
    setSteps((p) => p.map((s, idx) => idx === i ? v : s));
  const addStep    = () => setSteps((p) => [...p, ""]);
  const removeStep = (i: number) => setSteps((p) => p.filter((_, idx) => idx !== i));

  // ── Imagens ───────────────────────────────────────────────────────────
  const handleNewImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setNewFiles((p) => [...p, ...files]);
    setNewPreviews((p) => [...p, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeNewPreview = (i: number) => {
    URL.revokeObjectURL(newPreviews[i]);
    setNewFiles((p) => p.filter((_, idx) => idx !== i));
    setNewPreviews((p) => p.filter((_, idx) => idx !== i));
  };

  const removeExistingImage = (i: number) =>
    setExistingImages((p) => p.filter((_, idx) => idx !== i));

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
      setTimeout(() => onSuccess(drinkName), 1200);
    } catch {
      setError("Erro ao salvar. Tente novamente.");
      setUploading(false);
    } finally {
      setSubmitting(false);
    }
  };

  const btnLabel = uploading ? "Enviando fotos..." : submitting ? "Salvando..." :
    mode === "create" ? "Criar Drink" : "Salvar alterações";

  // ── Form body ─────────────────────────────────────────────────────────
  const formBody = (
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
            autoFocus
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

      {/* Fotos */}
      <StyledSection>
        <StyledLabel>Fotos{existingImages.length + newPreviews.length > 0 ? ` (${existingImages.length + newPreviews.length})` : " (opcional)"}</StyledLabel>
        <StyledImageGrid>
          {existingImages.map((src, i) => (
            <StyledImageThumb key={`ex-${i}`}>
              <img src={getImageSrc(src)} alt={`foto ${i + 1}`} />
              <button type="button" onClick={() => removeExistingImage(i)}>✕</button>
            </StyledImageThumb>
          ))}
          {newPreviews.map((src, i) => (
            <StyledImageThumb key={`new-${i}`}>
              <img src={src} alt={`nova ${i + 1}`} />
              <button type="button" onClick={() => removeNewPreview(i)}>✕</button>
            </StyledImageThumb>
          ))}
        </StyledImageGrid>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleNewImages}
        />
        <StyledAddBtn type="button" onClick={() => fileRef.current?.click()}>
          + Adicionar fotos
        </StyledAddBtn>
      </StyledSection>

      {error   && <StyledError>{error}</StyledError>}
      {success && <StyledSuccess>{mode === "create" ? "Drink criado! Redirecionando..." : "Salvo!"}</StyledSuccess>}

      <StyledSubmitBtn type="submit" disabled={submitting || success}>
        {btnLabel}
      </StyledSubmitBtn>
    </StyledForm>
  );

  // ── Modal (edit) ──────────────────────────────────────────────────────
  if (isModal) {
    return createPortal(
      <>
        <StyledOverlay onClick={onClose} />
        <StyledPanel onClick={(e) => e.stopPropagation()}>
          <StyledPanelHeader>
            <StyledTitle>{title}</StyledTitle>
            <StyledCloseBtn type="button" onClick={onClose} title="Fechar (Esc)">✕</StyledCloseBtn>
          </StyledPanelHeader>
          {formBody}
        </StyledPanel>
      </>,
      document.body
    );
  }

  // ── Full page (create) ────────────────────────────────────────────────
  return (
    <StyledPage>
      <StyledTitle style={{ fontSize: "clamp(1.4rem,4vw,2rem)", paddingBottom: "1.25rem", marginBottom: "2rem", borderBottom: "1px solid rgba(255,208,110,0.1)" }}>
        {title}
      </StyledTitle>
      {formBody}
    </StyledPage>
  );
};
