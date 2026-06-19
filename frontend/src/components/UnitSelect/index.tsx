import styled from "styled-components";
import { theme } from "../../styles/theme";
import { IngredientUnit } from "../../api/client";

export const UNITS: { value: IngredientUnit; label: string }[] = [
  { value: "ml",      label: "mL" },
  { value: "dash",    label: "dash" },
  { value: "folha",   label: "folha" },
  { value: "lata",    label: "lata" },
  { value: "unidade", label: "unidade" },
  { value: "pitada",  label: "pitada" },
  { value: "suco",    label: "suco de" },
];

const StyledSelect = styled.select`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 208, 110, 0.25);
  color: ${theme.colors.primary};
  font-size: 0.9rem;
  font-family: inherit;
  padding: 0.5rem 0.25rem;
  outline: none;
  cursor: pointer;
  width: 90px;
  flex-shrink: 0;

  option { background: #1a1208; }
`;

interface Props {
  value: IngredientUnit;
  onChange: (v: IngredientUnit) => void;
}

export const UnitSelect = ({ value, onChange }: Props) => (
  <StyledSelect value={value} onChange={(e) => onChange(e.target.value as IngredientUnit)}>
    {UNITS.map((u) => (
      <option key={u.value} value={u.value}>{u.label}</option>
    ))}
  </StyledSelect>
);
