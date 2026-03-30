import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { PRODUCTS } from "../data/products";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filters, setFilters] = useState({ category: "All", sort: "popularity", search: "" });
  const [productModal, setProductModal] = useState(null);
  const [products, setProducts] = useState(PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
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

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products');
        if (response.data.success) {
          setProducts(response.data.data || PRODUCTS);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

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
  
  const clearCart = () => setCart([]);
  
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (filters.category !== "All") list = list.filter((p) => p.category === filters.category);
    if (filters.search) list = list.filter((p) => p.name.toLowerCase().includes(filters.search.toLowerCase()));

    if (filters.sort === "low") list.sort((a, b) => a.price - b.price);
    if (filters.sort === "high") list.sort((a, b) => b.price - a.price);
    if (filters.sort === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [products, filters]);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);

  return (
    <StoreContext.Provider value={{
      cart,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      wishlist,
      toggleWishlist,
      filters,
      setFilters,
      filteredProducts,
      products,
      loading,
      error,
      productModal,
      setProductModal,
      user,
      login,
      logout,
      darkMode,
      toggleDarkMode,
      api
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}