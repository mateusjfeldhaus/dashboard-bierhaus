import { Link, useLocation } from "react-router-dom";
import { StyledTabBar, StyledTabItem } from "./style";

const tabs = [
  { path: "/", label: "Home", icon: "🏠" },
  { path: "/cachaca", label: "Cachaca", icon: "🌿" },
  { path: "/espumante", label: "Espumante", icon: "🥂" },
  { path: "/gin", label: "Gin", icon: "🫙" },
  { path: "/licor", label: "Licores", icon: "🍊" },
  { path: "/alkoholfrei", label: "Sem Alcool", icon: "🧃" },
  { path: "/rum", label: "Rum", icon: "🍹" },
  { path: "/sake", label: "Sake", icon: "🍶" },
  { path: "/tequila", label: "Tequila", icon: "🌵" },
  { path: "/vodka", label: "Vodka", icon: "🧊" },
  { path: "/whisky", label: "Whisky", icon: "🥃" },
  { path: "/contact", label: "Contato", icon: "✉️" },
];

export const Footer = () => {
  const location = useLocation();

  return (
    <StyledTabBar>
      {tabs.map((tab) => (
        <StyledTabItem
          key={tab.path}
          as={Link}
          to={tab.path}
          $active={location.pathname === tab.path}
        >
          <span className="icon">{tab.icon}</span>
          <span className="label">{tab.label}</span>
        </StyledTabItem>
      ))}
    </StyledTabBar>
  );
};
