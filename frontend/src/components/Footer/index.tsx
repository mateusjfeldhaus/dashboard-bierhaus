import { Link, useLocation } from "react-router-dom";
import { CATEGORIES } from "../../constants/categories";
import { StyledTabBar, StyledTabItem } from "./style";

const HOME_TAB = { path: "/", label: "Home", icon: "🏠" };

export const Footer = () => {
  const location = useLocation();

  return (
    <StyledTabBar>
      <StyledTabItem
        as={Link}
        to={HOME_TAB.path}
        $active={location.pathname === HOME_TAB.path}
      >
        <span className="icon">{HOME_TAB.icon}</span>
        <span className="label">{HOME_TAB.label}</span>
      </StyledTabItem>

      {CATEGORIES.map((cat) => (
        <StyledTabItem
          key={cat.slug}
          as={Link}
          to={`/${cat.slug}`}
          $active={location.pathname === `/${cat.slug}`}
        >
          <span className="icon">{cat.icon}</span>
          <span className="label">{cat.label}</span>
        </StyledTabItem>
      ))}
    </StyledTabBar>
  );
};
