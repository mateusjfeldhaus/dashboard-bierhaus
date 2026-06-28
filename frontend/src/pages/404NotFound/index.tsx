import { Link } from "react-router-dom";
import { StyledNotFound } from "./style";

export const NotFound = () => (
  <StyledNotFound>
    <span className="code">404</span>
    <p className="message">Página não encontrada</p>
    <Link className="back-link" to="/">Voltar ao início</Link>
  </StyledNotFound>
);
