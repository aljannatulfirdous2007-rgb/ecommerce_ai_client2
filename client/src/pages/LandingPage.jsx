import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const PRODUCTS = [
  { id: 1, name: "Obsidian Watch", price: 2499, oldPrice: 3200, category: "Tech", badge: "HOT", img: "⌚", color: "#1a1a2e", rating: 4.9, reviews: 312 },
  { id: 2, name: "Leather Tote", price: 890, oldPrice: 1200, category: "Fashion", badge: "NEW", img: "👜", color: "#2d1b0e", rating: 4.8, reviews: 218 },
  { id: 3, name: "Gold Serum", price: 320, oldPrice: 450, category: "Beauty", badge: "SALE", img: "✨", color: "#1a0e2d", rating: 4.7, reviews: 540 },
  { id: 4, name: "Silk Scarf", price: 450, oldPrice: 600, category: "Fashion", badge: "NEW", img: "🧣", color: "#1e2d0e", rating: 4.9, reviews: 178 },
  { id: 5, name: "Air Pods Pro", price: 1299, oldPrice: 1599, category: "Tech", badge: "HOT", img: "🎧", color: "#0e1e2d", rating: 4.8, reviews: 893 },
  { id: 6, name: "Marble Candle", price: 180, oldPrice: 240, category: "Home", badge: "SALE", img: "🕯️", color: "#2d2d0e", rating: 4.6, reviews: 290 },
  { id: 7, name: "Cashmere Coat", price: 1850, oldPrice: 2400, category: "Fashion", badge: "HOT", img: "🧥", color: "#2d0e1a", rating: 4.9, reviews: 127 },
  { id: 8, name: "Fragrance Set", price: 560, oldPrice: 750, category: "Beauty", badge: "NEW", img: "🌸", color: "#1a0e2d", rating: 4.7, reviews: 420 },
];

const CATEGORIES = ["All", "Fashion", "Tech", "Beauty", "Home"];

const HERO_SLIDES = [
  { headline: "WEAR THE", accent: "FUTURE", sub: "Discover our new tech-fashion fusion collection", tag: "SS 2025" },
  { headline: "LIVE IN", accent: "LUXURY", sub: "Handpicked essentials for the discerning lifestyle", tag: "HOME EDIT" },
  { headline: "DEFINE YOUR", accent: "STYLE", sub: "Over 150,000 curated products, just for you", tag: "TRENDING NOW" },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
    const interval = setInterval(() => setHeroIndex((i) => (i + 1) % HERO_SLIDES.length), 5000);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const userData = JSON.parse(localStorage.getItem("signupData") || "{}");

  const filteredProducts = PRODUCTS.filter((p) => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const searchMatch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  const addToCart = (product) => {
    setCart((c) => {
      const exists = c.find((i) => i.id === product.id);
      return exists ? c.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) : [...c, { ...product, qty: 1 }];
    });
    showNotif(`${product.name} added to cart`);
    setCartOpen(true);
    setTimeout(() => setCartOpen(false), 2000);
  };

  const toggleWishlist = (id) => {
    setWishlist((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id]);
  };

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const hero = HERO_SLIDES[heroIndex];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <motion.div 
      className={`land-root ${mounted ? "mounted" : ""}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {notification && <motion.div 
        className="notif" 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
      >{notification}</motion.div>}

      <motion.nav 
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-inner">
          <motion.div 
            className="nav-logo" 
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="logo-box">LM</span>
            <span className="logo-text">LUXE<em>MARKET</em></span>
          </motion.div>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {["Collection", "New Arrivals", "Brands", "Sale"].map((l) => (
              <motion.button 
                key={l} 
                className="nav-link"
                whileHover={{ scale: 1.05 }}
              >{l}</motion.button>
            ))}
          </div>

          <div className="nav-actions">
            <motion.button 
              className="nav-btn" 
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => setSearchOpen(!searchOpen)}
            >⌕</motion.button>
            <motion.button 
              className="nav-btn" 
              whileHover={{ scale: 1.1 }}
              onClick={() => setCartOpen(!cartOpen)}
            >
              ⊕ {cartCount > 0 && <motion.span 
                className="cart-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >{cartCount}</motion.span>}
            </motion.button>
            <div className="nav-user">
              <span className="user-avatar">{userData.name?.[0]?.toUpperCase() || "U"}</span>
              <div className="user-dropdown">
                <span className="user-name">{userData.name || "Guest"}</span>
                <button onClick={handleLogout}>Sign Out</button>
              </div>
            </div>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div 
              className="search-bar open"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder="Search products…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>✕</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Your Cart ({cartCount})</h3>
          <button onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <span>◉</span>
              <p>Your cart is empty</p>
            </div>
          ) : cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="ci-icon" style={{ background: item.color }}>{item.img}</div>
              <div className="ci-info">
                <span className="ci-name">{item.name}</span>
                <span className="ci-price">${item.price} × {item.qty}</span>
              </div>
              <button className="ci-remove" onClick={() => setCart((c) => c.filter((x) => x.id !== item.id))}>✕</button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span><span>${cartTotal.toLocaleString()}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout →</button>
          </div>
        )}
      </div>
      {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)} />}

      <motion.section 
        className="hero"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={heroVariants}
      >
        <div className="hero-bg">
          <motion.div className="hero-orb h-orb-1" 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div className="hero-orb h-orb-2" 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <div className="hero-grid" />
        </div>

        <motion.div className="hero-content" variants={itemVariants}>
          <motion.div className="hero-tag" variants={itemVariants}>{hero.tag}</motion.div>
          <motion.h1 className="hero-title" variants={itemVariants}>
            {hero.headline}<br />
            <span>{hero.accent}</span>
          </motion.h1>
          <motion.p className="hero-sub" variants={itemVariants}>{hero.sub}</motion.p>
          <motion.div className="hero-ctas" variants={itemVariants}>
            <motion.button 
              className="hero-btn-primary"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >Shop Now →</motion.button>
            <motion.button 
              className="hero-btn-ghost"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >Explore Collections</motion.button>
          </motion.div>
          <motion.div className="hero-metrics" variants={itemVariants}>
            {[["150K+", "Products"], ["48hr", "Delivery"], ["Free", "Returns"]].map(([v, l], i) => (
              <motion.div 
                className="hm" 
                key={l}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <span>{v}</span><span>{l}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="hero-visual">
          <div className="floating-cards">
            {PRODUCTS.slice(0, 3).map((p, i) => (
              <motion.div 
                className="float-card" 
                key={p.id} 
                style={{ "--delay": `${i * 0.8}s`, "--color": p.color }}
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              >
                <span className="float-emoji">{p.img}</span>
                <div>
                  <p>{p.name}</p>
                  <strong>${p.price}</strong>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <motion.button 
              key={i} 
              className={`hero-dot ${i === heroIndex ? "active" : ""}`} 
              onClick={() => setHeroIndex(i)}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </motion.section>

      <div className="marquee-wrap">
        <div className="marquee-track">
          {["FASHION ✦", "TECH ✦", "BEAUTY ✦", "HOME ✦", "LUXURY ✦", "PREMIUM ✦", "EXCLUSIVE ✦", "FASHION ✦", "TECH ✦", "BEAUTY ✦", "HOME ✦", "LUXURY ✦"].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <motion.section 
        className="categories-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <motion.h2 variants={itemVariants}>Shop by Category</motion.h2>
          <motion.p variants={itemVariants}>Curated just for you</motion.p>
        </motion.div>
        <motion.div className="cat-grid" variants={containerVariants}>
          {[
            { name: "Fashion", icon: "👗", count: "42K+" },
            { name: "Tech", icon: "💻", count: "18K+" },
            { name: "Beauty", icon: "💄", count: "30K+" },
            { name: "Home", icon: "🏡", count: "25K+" },
          ].map((c, i) => (
            <motion.div
              className={`cat-card ${activeCategory === c.name ? "active" : ""}`}
              key={c.name}
              variants={itemVariants}
              custom={i}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => { setActiveCategory(c.name); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              <span className="cat-icon">{c.icon}</span>
              <h3>{c.name}</h3>
              <span>{c.count} items</span>
              <div className="cat-hover-line" />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <section className="products-section" id="products">
        <div className="section-header">
          <h2>Trending Now</h2>
          <p>Our most-wanted picks this season</p>
        </div>

        <div className="filter-tabs">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`filter-tab ${activeCategory === c ? "active" : ""}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div 
          className="products-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredProducts.map((p, i) => (
            <motion.div 
              className="product-card" 
              key={p.id} 
              style={{ "--i": i }}
              variants={itemVariants}
              custom={i}
              whileHover={{ 
                y: -12,
                scale: 1.02,
                rotateX: 2,
                boxShadow: "0 30px 60px rgba(0,0,0,0.2)"
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 15 
              }}
              layout
            >
              <motion.div 
                className="pc-image" 
                style={{ background: p.color }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span 
                  className="pc-emoji"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >{p.img}</motion.span>
                <div className="pc-badge">{p.badge}</div>
                <motion.button
                  className={`pc-wish ${wishlist.includes(p.id) ? "active" : ""}`}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleWishlist(p.id)}
                >
                  ♥
                </motion.button>
                <motion.div 
                  className="pc-hover-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.button 
                    className="quick-add" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(p)}
                  >Quick Add</motion.button>
                </motion.div>
              </motion.div>
              <motion.div 
                className="pc-info"
                layout
              >
                <div className="pc-cat">{p.category}</div>
                <h3 className="pc-name">{p.name}</h3>
                <div className="pc-rating">
                  {"★".repeat(Math.floor(p.rating))} <span>{p.rating} ({p.reviews})</span>
                </div>
                <div className="pc-price-row">
                  <span className="pc-price">${p.price.toLocaleString()}</span>
                  {p.oldPrice && <span className="pc-old">${p.oldPrice.toLocaleString()}</span>}
                  {p.oldPrice && <span className="pc-save">-{Math.round((1 - p.price / p.oldPrice) * 100)}%</span>}
                </div>
                <motion.button 
                  className="pc-cart-btn" 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(p)}
                >Add to Cart</motion.button>
              </motion.div>
            </motion.div>
          ))}
          {filteredProducts.length === 0 && (
            <motion.div 
              className="no-results"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span>◉</span>
              <p>No products found for "{searchQuery}"</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              >Clear filters</motion.button>
            </motion.div>
          )}
        </motion.div>
      </section>

      <section className="promo-banner">
        <div className="pb-inner">
          <div className="pb-text">
            <div className="pb-tag">LIMITED TIME</div>
            <h2>Up to <span>60% OFF</span></h2>
            <p>On our entire summer collection. Ends midnight Friday.</p>
            <button className="pb-btn">Shop the Sale →</button>
          </div>
          <div className="pb-visual">
            <div className="pb-countdown">
              {[["08", "HRS"], ["34", "MIN"], ["52", "SEC"]].map(([v, l]) => (
                <div className="pb-unit" key={l}><span>{v}</span><small>{l}</small></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter">
        <div className="nl-inner">
          <h2>Stay in the loop</h2>
          <p>Get early access to drops, exclusive deals, and style guides</p>
          <div className="nl-form">
            <input type="email" placeholder="Enter your email address" />
            <button>Subscribe ✦</button>
          </div>
          <p className="nl-note">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo-box sm">LM</div>
            <span>LUXEMARKET</span>
            <p>Curated luxury for the modern lifestyle.</p>
          </div>
          <div className="footer-links">
            {[["Shop", ["Fashion", "Tech", "Beauty", "Home"]], ["Company", ["About", "Careers", "Press"]], ["Support", ["FAQ", "Shipping", "Returns"]]].map(([title, links]) => (
              <div key={title} className="footer-col">
                <h4>{title}</h4>
                {links.map((l) => <a key={l} href="#">{l}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 LuxeMarket. All rights reserved.</p>
          <p>Privacy · Terms · Cookies</p>
        </div>
      </footer>
    </div>
  );
}