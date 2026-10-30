import "./App.css";
import { FormList } from "./components/FormList";
import { mockForms } from "./data/mockForms";

export function App() {
  return (
    <main>
      <h1>Permit Portal</h1>
      <FormList forms={mockForms} />
    </main>
  );
}
