import { useState, ReactNode } from "react";
import { api, getToken, setToken } from "../../api/client";
import {
  StyledGate,
  StyledLock,
  StyledGateTitle,
  StyledGateForm,
  StyledPinInput,
  StyledGateBtn,
  StyledGateError,
} from "./style";

function isTokenValid(): boolean {
  const token = getToken();
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

interface Props { children: ReactNode; }

export const PasswordGate = ({ children }: Props) => {
  const [unlocked, setUnlocked] = useState(isTokenValid);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  if (unlocked) return <>{children}</>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      const { token } = await api.auth.login(input);
      setToken(token);
      setUnlocked(true);
    } catch {
      setError(true);
      setInput("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledGate>
      <StyledLock>🔒</StyledLock>
      <StyledGateTitle>Acesso restrito</StyledGateTitle>
      <StyledGateForm onSubmit={handleSubmit}>
        <StyledPinInput
          type="password"
          placeholder="Senha"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false); }}
          autoFocus
          disabled={loading}
        />
        {error && <StyledGateError>Senha incorreta</StyledGateError>}
        <StyledGateBtn type="submit" disabled={loading}>
          {loading ? "Verificando..." : "Entrar"}
        </StyledGateBtn>
      </StyledGateForm>
    </StyledGate>
  );
};
