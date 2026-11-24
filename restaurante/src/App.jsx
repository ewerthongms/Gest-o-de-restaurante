import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./store/CartContext.jsx";
import Cardapio from "./pages/Cardapio.jsx";
import Pagamento from "./pages/Pagamento.jsx";
import Painel from "./pages/Painel.jsx";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/pagamento" element={<Pagamento />} />
          <Route path="/painel" element={<Painel />} />
          <Route path="*" element={<Navigate to="/cardapio" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
