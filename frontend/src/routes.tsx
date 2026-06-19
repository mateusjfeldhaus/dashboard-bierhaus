import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { CategoryPage } from "./pages/CategoryPage";
import { DrinkPage } from "./pages/DrinkPage";
import { UtilsPage } from "./pages/UtilsPage";
import { PrecosPage } from "./pages/PrecosPage";
import { SearchPage } from "./pages/SearchPage";
import { ContactPage } from "./pages/ContactPage";
import { IngredientPage } from "./pages/IngredientPage";
import { NovoDrinkPage } from "./pages/NovoDrinkPage";
import { EditDrinkPage } from "./pages/EditDrinkPage";
import { StatsPage } from "./pages/StatsPage";
import { NotFound } from "./pages/404NotFound";
import { PasswordGate } from "./components/PasswordGate";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/utils" element={<UtilsPage />} />
      <Route path="/precos" element={<PasswordGate><PrecosPage /></PasswordGate>} />
      <Route path="/novo-drink" element={<PasswordGate><NovoDrinkPage /></PasswordGate>} />
      <Route path="/editar-drink/:name" element={<PasswordGate><EditDrinkPage /></PasswordGate>} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/drink/:name" element={<DrinkPage />} />
      <Route path="/ingrediente/:name" element={<IngredientPage />} />
      <Route path="/:category" element={<CategoryPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
