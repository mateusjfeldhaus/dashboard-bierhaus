import { useState, ReactNode } from "react";
import {
  StyledGate,
  StyledLock,
  StyledGateTitle,
  StyledGateForm,
  StyledPinInput,
  StyledGateBtn,
  StyledGateError,
} from "./style";

const SESSION_KEY = "bierhaus_auth";
const PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || "bierhaus";

interface Props {
  children: ReactNode;
}

export const PasswordGate = ({ children }: Props) => {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1"
  );
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
      setInput("");
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
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          autoFocus
        />
        {error && <StyledGateError>Senha incorreta</StyledGateError>}
        <StyledGateBtn type="submit">Entrar</StyledGateBtn>
      </StyledGateForm>
    </StyledGate>
  );
};
