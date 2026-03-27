import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { PRODUCTS } from "../data/products";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filters, setFilters] = useState({ category: "All", sort: "popularity", search: "" });
  const [productModal, setProductModal] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.stringify(saved) : null;
  });


  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []); 


  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  };

  const addToCart = (product, qty = 1) => {
    setCart((items) => {
      const exists = items.find((item) => item.id === product.id);
      if (exists) return items.map((item) => item.id === product.id ? { ...item, qty: item.qty + qty } : item);
      return [...items, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => setCart((items) => items.filter((item) => item.id !== id));
  const updateQty = (id, qty) => setCart((items) => items.map((item) => item.id === id ? { ...item, qty } : item));
  const toggleWishlist = (id) => setWishlist((items) => items.includes(id) ? items.filter((x) => x !== id) : [...items, id]);

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];
    if (filters.category !== "All") list = list.filter((p) => p.category === filters.category);
    if (filters.search) list = list.filter((p) => p.name.toLowerCase().includes(filters.search.toLowerCase()));

    if (filters.sort === "low") list.sort((a, b) => a.price - b.price);
    if (filters.sort === "high") list.sort((a, b) => b.price - a.price);
    if (filters.sort === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [filters]);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);

  return (
    <StoreContext.Provider value={{
      cart,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQty,
      wishlist,
      toggleWishlist,
      filters,
      setFilters,
      filteredProducts,
      productModal,
      setProductModal,
      PRODUCTS,
      darkMode,
      toggleDarkMode,
      user,
      loginUser,
      logout
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}