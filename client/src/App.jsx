import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
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

import FAQSection from "./components/FAQSection";


function RequireAuth({ children }) {
  const { user } = useStore();
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function AppContent() {
  const { cart } = useStore();
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <>
      <Navbar cartCount={cart.length} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <HomePage />
              </motion.div>
            } 
          />
          <Route 
            path="/shop" 
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <ShopPage />
              </motion.div>
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <ProductPage />
              </motion.div>
            } 
          />
          <Route 
            path="/deals" 
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <DealsPage />
              </motion.div>
            } 
          />
          <Route 
            path="/collections" 
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Collections />
              </motion.div>
            } 
          />
          <Route 
            path="/new" 
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Newin />
              </motion.div>
            } 
          />
          <Route 
            path="/sale" 
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Sale />
              </motion.div>
            } 
          />
          <Route 
            path="/about" 
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <About />
              </motion.div>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <RequireAuth>
                <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <Dashboard />
                </motion.div>
              </RequireAuth>
            } 
          />
          <Route 
            path="/faq" 
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <FAQSection />
              </motion.div>
            } 
          />
          <Route 
            path="/chat" 
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Chat />
              </motion.div>
            } 
          />
          <Route 
            path="/login" 
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <LoginPage />
              </motion.div>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <SignupPage />
              </motion.div>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
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