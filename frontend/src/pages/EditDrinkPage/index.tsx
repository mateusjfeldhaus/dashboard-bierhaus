import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, uploadImage, updateDrink, IngredientUnit } from "../../api/client";
import { UnitSelect } from "../../components/UnitSelect";
import { CATEGORY_TYPES } from "../../constants/categories";
import { DrinkPageSkeleton } from "../../components/Skeleton";
import {
  StyledPage, StyledTitle, StyledForm, StyledSection, StyledLabel,
  StyledInput, StyledCategoryGrid, StyledCategoryChip,
  StyledIngredientRow, StyledStepRow, StyledAddBtn, StyledRemoveBtn, StyledImagePreview,
  StyledSubmitBtn, StyledError, StyledSuccess,
} from "../NovoDrinkPage/style";

interface Ingredient { name: string; quantity: string; unit: IngredientUnit; }

export const EditDrinkPage = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [types, setTypes] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([""]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const decoded = decodeURIComponent(name ?? "");

  useEffect(() => {
    if (!name) return;
    api.drinks.get(decoded).then((drink) => {
      setTypes(drink.type);
      const parsed = drink.recipe.split("\n").filter((s) => s.trim());
      setSteps(parsed.length ? parsed : [""]);
      setIngredients(
        drink.ingredients.length
          ? drink.ingredients.map((i) => ({ name: i.name, quantity: i.quantity, unit: i.unit ?? "ml" }))
          : [{ name: "", quantity: "", unit: "ml" }]
      );
      setExistingImages(drink.img);
      setLoading(false);
    }).catch(() => navigate("/"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const toggleType = (t: string) =>
    setTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  const updateIngredient = <K extends keyof Ingredient>(i: number, field: K, value: Ingredient[K]) =>
    setIngredients((prev) => prev.map((ing, idx) => idx === i ? { ...ing, [field]: value } : ing));

  const addIngredient = () => setIngredients((prev) => [...prev, { name: "", quantity: "", unit: "ml" }]);
  const removeIngredient = (i: number) => setIngredients((prev) => prev.filter((_, idx) => idx !== i));

  const updateStep = (i: number, value: string) =>
    setSteps((prev) => prev.map((s, idx) => idx === i ? value : s));
  const addStep = () => setSteps((prev) => [...prev, ""]);
  const removeStep = (i: number) => setSteps((prev) => prev.filter((_, idx) => idx !== i));

  useEffect(() => {
    return () => newPreviews.forEach(URL.revokeObjectURL);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeExistingImage = (i: number) => setExistingImages((prev) => prev.filter((_, idx) => idx !== i));

  const handleNewImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setNewFiles((prev) => [...prev, ...files]);
    setNewPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const validIngredients = ingredients.filter((i) => i.name.trim() && i.quantity.trim());

    setSubmitting(true);
    try {
      let uploadedUrls: string[] = [];
      if (newFiles.length) {
        setUploading(true);
        uploadedUrls = await Promise.all(newFiles.map((f) => uploadImage(f)));
        setUploading(false);
      }
      const images = [...existingImages, ...uploadedUrls];
      const validSteps = steps.filter((s) => s.trim());
      await updateDrink(decoded, { types, recipe: validSteps.join("\n"), images, ingredients: validIngredients });
      setSuccess(true);
      setTimeout(() => navigate(`/drink/${encodeURIComponent(decoded)}`), 1500);
    } catch {
      setError("Erro ao salvar. Tente novamente.");
      setUploading(false);
    } finally { setSubmitting(false); }
  };

  if (loading) return <DrinkPageSkeleton />;

  const getImageSrc = (src: string) =>
    src.startsWith("http") ? src : `${process.env.PUBLIC_URL}/assets/${src.split("/").pop()}`;

  return (
    <StyledPage>
      <StyledTitle>Editar: {decoded}</StyledTitle>
      <StyledForm onSubmit={handleSubmit}>
        <StyledSection>
          <StyledLabel>Categorias</StyledLabel>
          <StyledCategoryGrid>
            {CATEGORY_TYPES.map((cat) => (
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
              <StyledInput type="text" placeholder="Nome" value={ing.name}
                onChange={(e) => updateIngredient(i, "name", e.target.value)} />
              <StyledInput type="text" placeholder="Qtd" value={ing.quantity}
                onChange={(e) => updateIngredient(i, "quantity", e.target.value)} />
              <UnitSelect value={ing.unit} onChange={(v) => updateIngredient(i, "unit", v)} />
              {ingredients.length > 1 && <StyledRemoveBtn type="button" onClick={() => removeIngredient(i)}>✕</StyledRemoveBtn>}
            </StyledIngredientRow>
          ))}
          <StyledAddBtn type="button" onClick={addIngredient}>+ Ingrediente</StyledAddBtn>
        </StyledSection>

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

        <StyledSection>
          <StyledLabel>Fotos atuais</StyledLabel>
          {existingImages.length === 0 && <span style={{ opacity: 0.4, fontSize: "0.85rem" }}>Nenhuma foto</span>}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {existingImages.map((src, i) => (
              <div key={i} style={{ position: "relative" }}>
                <StyledImagePreview src={getImageSrc(src)} alt={`foto ${i + 1}`} />
                <StyledRemoveBtn type="button" onClick={() => removeExistingImage(i)}
                  style={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.5)", opacity: 1, borderRadius: "50%", width: 24, height: 24 }}>
                  ✕
                </StyledRemoveBtn>
              </div>
            ))}
          </div>
        </StyledSection>

        <StyledSection>
          <StyledLabel>Adicionar fotos</StyledLabel>
          <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handleNewImages} />
          <StyledAddBtn type="button" onClick={() => fileRef.current?.click()}>+ Escolher fotos</StyledAddBtn>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {newPreviews.map((src, i) => <StyledImagePreview key={i} src={src} alt={`nova ${i + 1}`} />)}
          </div>
        </StyledSection>

        {error && <StyledError>{error}</StyledError>}
        {success && <StyledSuccess>Salvo! Redirecionando...</StyledSuccess>}

        <StyledSubmitBtn type="submit" disabled={submitting}>
          {uploading ? "Enviando fotos..." : submitting ? "Salvando..." : "Salvar alterações"}
        </StyledSubmitBtn>
      </StyledForm>
    </StyledPage>
  );
};
