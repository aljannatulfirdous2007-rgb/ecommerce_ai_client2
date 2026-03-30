import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, User, Heart, Search } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useStore } from "../context/StoreContext";

export default function LuxuryNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart, wishlist, setFilters } = useStore();
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setFilters(prev => ({ ...prev, search: searchQuery.trim() }));
      navigate("/shop");
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { name: "Shop", path: "/shop" },
    { name: "New", path: "/new" },
    { name: "Collections", path: "/collections" },
    { name: "Deals", path: "/deals" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 text-black ${
        scrolled ? "bg-white/98 backdrop-blur-xl border-b border-gray-200 shadow-xl" : "bg-white/90 backdrop-blur-md"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20" style={{ color: '#000000' }}>

            {/* Logo - Left Side */}
            <Link to="/" className="flex items-center gap-1">
              <span className="text-lg sm:text-xl font-semibold tracking-[0.25em] text-black uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>AL</span>
              <span className="text-lg sm:text-xl font-semibold tracking-[0.25em] text-red-600" style={{ fontFamily: "'Playfair Display', serif" }}>FIRDOUS</span>
              <span className="text-lg sm:text-xl font-semibold tracking-[0.25em] text-black uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>LUXE</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-black hover:text-red-600 transition-colors ml-auto"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Nav Links - Bold & Visible */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-semibold uppercase tracking-[0.15em] text-black hover:text-red-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-black hover:text-red-600 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link to="/dashboard" className="relative p-2 text-black hover:text-red-600 transition-colors hidden sm:block">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Login */}
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 border border-black text-black text-xs uppercase tracking-[0.15em] hover:bg-black hover:text-white transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                Login
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-black hover:text-red-600 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-black/98 border-t border-white/10 px-4 py-4"
            >
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-3">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search AL FIRDOUS LUXE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-5 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-red-600 focus:outline-none text-sm"
                />
                <button type="submit" className="px-6 py-3 bg-red-600 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                  Search
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-black/98 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-6 py-6 space-y-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm uppercase tracking-[0.2em] text-black hover:text-red-600 transition-colors py-2 border-b border-gray-100"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-2 flex gap-4">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 border border-black/20 text-black text-xs uppercase tracking-widest hover:border-red-600 hover:text-red-600 transition-colors"
                  >
                    <User className="w-3.5 h-3.5" /> Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
