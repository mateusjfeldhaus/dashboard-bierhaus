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
  const { beverages, updatePrice } = useBeverages();
  const [search, setSearch] = useState("");
  const [editingName, setEditingName] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");
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

  const startEdit = (name: string, currentPrice: number) => {
    setEditingName(name);
    setEditingValue(currentPrice.toFixed(2));
  };

  const cancelEdit = () => {
    setEditingName(null);
    setEditingValue("");
  };

  const confirmEdit = (name: string) => {
    const value = parseFloat(editingValue.replace(",", "."));
    if (!isNaN(value) && value >= 0) {
      updatePrice(name, value);
      showToast();
    }
    setEditingName(null);
    setEditingValue("");
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
            <Link
              className="name"
              to={`/ingrediente/${encodeURIComponent(b.name)}`}
            >
              {b.name}
            </Link>

            {editingName === b.name ? (
              <StyledEditRow>
                <StyledPriceInput
                  type="number"
                  min="0"
                  step="0.01"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") confirmEdit(b.name);
                    if (e.key === "Escape") cancelEdit();
                  }}
                  autoFocus
                />
                <StyledConfirmBtn onClick={() => confirmEdit(b.name)}>
                  Salvar
                </StyledConfirmBtn>
                <StyledCancelBtn onClick={cancelEdit}>✕</StyledCancelBtn>
              </StyledEditRow>
            ) : (
              <>
                <span className="price-display">R$ {b.price.toFixed(2)}</span>
                <button
                  className="edit-btn"
                  onClick={() => startEdit(b.name, b.price)}
                  title="Editar preco"
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
