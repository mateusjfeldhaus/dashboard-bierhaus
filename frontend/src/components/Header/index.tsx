import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../../constants/categories";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { clearToken } from "../../api/client";
import {
  StyledHeader,
  StyledMobileControls,
  StyledMenuButton,
  StyledSearchButton,
  StyledDesktopNav,
  StyledDesktopSearchForm,
  StyledMobileNav,
  StyledMobileSearchWrapper,
  StyledAdminMenu,
  StyledAdminToggle,
  StyledAdminDropdown,
} from "./style";

const navLinks = [
  ...CATEGORIES.map((c) => ({ path: `/${c.slug}`, label: c.label })),
  { path: "/contact", label: "Contato" },
];

const adminLinks = [
  { path: "/utils", label: "Utilidades" },
  { path: "/precos", label: "Precos" },
  { path: "/novo-drink", label: "Novo Drink" },
  { path: "/stats", label: "Estatísticas" },
];

export const Header = () => {
  const isAdmin = useIsAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    setIsAdminOpen(false);
    setIsMenuOpen(false);
    navigate("/");
  };
  const adminRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (adminRef.current && !adminRef.current.contains(e.target as Node)) {
        setIsAdminOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
    setIsSearchOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <StyledHeader>
      <Link to="/" className="logo-link">
        <img
          src={process.env.PUBLIC_URL + "/assets/logo.svg"}
          alt="Bierhaus Logo"
        />
      </Link>

      <StyledDesktopNav>
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path}>
            {link.label}
          </Link>
        ))}
        {isAdmin ? (
          <StyledAdminMenu ref={adminRef}>
            <StyledAdminToggle
              $open={isAdminOpen}
              onClick={() => setIsAdminOpen(!isAdminOpen)}
            >
              Admin {isAdminOpen ? "▴" : "▾"}
            </StyledAdminToggle>
            <StyledAdminDropdown $open={isAdminOpen}>
              {adminLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsAdminOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button className="logout-btn" onClick={handleLogout}>Sair</button>
            </StyledAdminDropdown>
          </StyledAdminMenu>
        ) : (
          <Link to="/precos" className="login-link">🔒 Admin</Link>
        )}
      </StyledDesktopNav>

      <StyledDesktopSearchForm onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar drink..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">search</button>
      </StyledDesktopSearchForm>

      <StyledMobileControls>
        <StyledSearchButton
          onClick={() => {
            setIsSearchOpen(!isSearchOpen);
            setIsMenuOpen(false);
          }}
          aria-label="Buscar"
        >
          {isSearchOpen ? "✕" : "🔍"}
        </StyledSearchButton>
        <StyledMenuButton
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            setIsSearchOpen(false);
          }}
          aria-label="Menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </StyledMenuButton>
      </StyledMobileControls>

      <StyledMobileSearchWrapper isOpen={isSearchOpen}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar drink por nome..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus={isSearchOpen}
          />
        </form>
      </StyledMobileSearchWrapper>

      <StyledMobileNav isOpen={isMenuOpen}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
          {isAdmin ? (
            <>
              <li className="mobile-admin-label">Admin</li>
              {adminLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    className="mobile-admin-link"
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button className="mobile-admin-link logout-btn" onClick={handleLogout}>
                  Sair
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                className="mobile-admin-link"
                to="/precos"
                onClick={() => setIsMenuOpen(false)}
              >
                🔒 Entrar como admin
              </Link>
            </li>
          )}
        </ul>
      </StyledMobileNav>
    </StyledHeader>
  );
};
