import { Route, Routes, NavLink } from "react-router";
import "./App.css";
import { BuilderPage } from "./pages/BuilderPage";
import { FillFormPage } from "./pages/FillFormPage";
import { FormsPage } from "./pages/FormsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export function App() {
  return (
    <>
      <header>
        <nav aria-label="Main">
          <ul className="main-nav">
            <li>
              <NavLink to="/">Forms</NavLink>
            </li>
            <li>
              <NavLink to="/builder">Builder</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<FormsPage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/forms/:formId" element={<FillFormPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
