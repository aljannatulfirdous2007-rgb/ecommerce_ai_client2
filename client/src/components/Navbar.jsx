import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu, MapPin, Moon, Sun } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useStore } from "../context/StoreContext";

export default function Navbar({ cartCount = 0 }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { setFilters, darkMode, toggleDarkMode } = useStore();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setFilters((prev) => ({ ...prev, search: searchQuery.trim() }));
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-dark-900 text-white text-sm py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Deliver to User</span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/dashboard" className="hover:underline">Sign in</Link>
            <Link to="/dashboard" className="hover:underline">Account</Link>
            <Link to="/dashboard" className="hover:underline">Orders</Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-dark-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center text-white">
              <div className="text-2xl font-bold">amazon</div>
              <span className="text-xs ml-1 text-gold-500">.com</span>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-4 hidden md:block">
              <form onSubmit={handleSearch} className="flex">

                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-l text-black"
                />

                <button
                  type="submit"
                  className="bg-gold-500 hover:bg-gold-600 px-4 rounded-r flex items-center"
                >
                  <Search className="w-5 h-5 text-black" />
                </button>

              </form>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-white"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Dark mode */}
              <button
                onClick={toggleDarkMode}
                className="text-white"
              >
                {darkMode ? <Sun /> : <Moon />}
              </button>

              {/* Mobile */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-white"
              >
                <Menu />
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark-800 text-white p-4 space-y-3">
          <Link to="/shop">Shop</Link>
          <Link to="/deals">Deals</Link>
          <Link to="/login">Sign In</Link>
        </div>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}