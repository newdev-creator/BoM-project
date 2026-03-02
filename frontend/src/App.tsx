import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComponentsList from "./pages/ComponentsList";
import Navbar from "./components/Navbar";
import ComponentDetails from "./pages/ComponentDetails";
import AskAI from "./pages/AskAI";

const navigationData = [
  {
    title: "Home",
    href: "#",
  },
  {
    title: "Products",
    href: "#",
  },
  {
    title: "About Us",
    href: "#",
  },
  {
    title: "Contacts",
    href: "#",
  },
];

export function App() {
  return (
    <div className="min-h-screen container mx-auto px-5">
      <BrowserRouter>
        <Navbar navigationData={navigationData} />
        <Routes>
          <Route path="/" element={<ComponentsList />} />
          <Route path="/components/:id" element={<ComponentDetails />} />
          <Route path="/ask-ia" element={<AskAI />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
