import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useBeverages } from "../../hooks/useBeverages";
import {
  StyledPrecosPage,
  StyledPageHeader,
  StyledSearchInput,
  StyledBeverageList,
  StyledBeverageItem,
  StyledEditRow,
  StyledPriceInput,
  StyledConfirmBtn,
  StyledCancelBtn,
  StyledSavedToast,
} from "./style";

export const PrecosPage = () => {
  const { beverages, updatePrice, updateAbv } = useBeverages();
  const [search, setSearch] = useState("");
  const [editingName, setEditingName] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState("");
  const [editingAbv, setEditingAbv] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtered = beverages
    .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

  const showToast = () => {
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2000);
  };

  const startEdit = (name: string, price: number, abv: number) => {
    setEditingName(name);
    setEditingPrice(price.toFixed(2));
    setEditingAbv(abv > 0 ? (abv * 100).toFixed(1) : "");
  };

  const cancelEdit = () => {
    setEditingName(null);
    setEditingPrice("");
    setEditingAbv("");
  };

  const confirmEdit = async (name: string) => {
    const price = parseFloat(editingPrice.replace(",", "."));
    const abvPct = parseFloat(editingAbv.replace(",", "."));

    if (!isNaN(price) && price >= 0) await updatePrice(name, price);
    if (!isNaN(abvPct) && abvPct >= 0 && abvPct <= 100) await updateAbv(name, abvPct / 100);

    showToast();
    setEditingName(null);
    setEditingPrice("");
    setEditingAbv("");
  };

  return (
    <StyledPrecosPage>
      <StyledPageHeader>
        <h1>Precos</h1>
      </StyledPageHeader>

      <StyledSearchInput
        type="text"
        placeholder="Filtrar ingrediente..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <StyledBeverageList>
        {filtered.map((b) => (
          <StyledBeverageItem key={b.name} $modified={false}>
            <Link className="name" to={`/ingrediente/${encodeURIComponent(b.name)}`}>
              {b.name}
            </Link>

            {editingName === b.name ? (
              <StyledEditRow>
                <StyledPriceInput
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Preço"
                  value={editingPrice}
                  onChange={(e) => setEditingPrice(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") confirmEdit(b.name);
                    if (e.key === "Escape") cancelEdit();
                  }}
                  autoFocus
                />
                <StyledPriceInput
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="ABV %"
                  value={editingAbv}
                  onChange={(e) => setEditingAbv(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") confirmEdit(b.name);
                    if (e.key === "Escape") cancelEdit();
                  }}
                  style={{ width: 70 }}
                />
                <span style={{ fontSize: "0.8rem", opacity: 0.5 }}>%</span>
                <StyledConfirmBtn onClick={() => confirmEdit(b.name)}>Salvar</StyledConfirmBtn>
                <StyledCancelBtn onClick={cancelEdit}>✕</StyledCancelBtn>
              </StyledEditRow>
            ) : (
              <>
                {b.abv > 0 && (
                  <span className="abv-badge">{(b.abv * 100).toFixed(0)}%</span>
                )}
                <span className="price-display">R$ {b.price.toFixed(2)}</span>
                <button
                  className="edit-btn"
                  onClick={() => startEdit(b.name, b.price, b.abv)}
                  title="Editar"
                >
                  ✏
                </button>
              </>
            )}
          </StyledBeverageItem>
        ))}
      </StyledBeverageList>

      <StyledSavedToast $visible={toastVisible}>Salvo</StyledSavedToast>
    </StyledPrecosPage>
  );
};
