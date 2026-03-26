import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider, useStore } from "./context/StoreContext";
import Navbar from "./components/Navbar";
import QuickViewModal from "./components/QuickViewModal";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import DealsPage from "./pages/DealsPage";
import Collections from "./pages/Collections";
import Newin from "./pages/Newin";
import Sale from "./pages/Sale";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";

function AppContent() {
  const { cart } = useStore();

  return (
    <>
      <Navbar cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/new" element={<Newin />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <QuickViewModal />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </StoreProvider>
  );
}