import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Truck, Shield, RotateCcw, Star,
  ChevronLeft, ChevronRight, Plus, Minus, ShoppingBag,
  Check, Package, Share2
} from "lucide-react";
import { useStore } from "../context/StoreContext";
import axios from "axios";

// Per-product color options with hex codes
const COLOR_OPTIONS = {
  default: [
    { name: "Noir Black",   hex: "#0a0a0a",  border: "#555" },
    { name: "Crimson Red",  hex: "#DC2626",  border: "#DC2626" },
    { name: "Pearl White",  hex: "#F5F5F5",  border: "#ccc" },
  ],
  beauty: [
    { name: "Classic Red",  hex: "#DC2626",  border: "#DC2626" },
    { name: "Berry",        hex: "#7c2d42",  border: "#7c2d42" },
    { name: "Nude",         hex: "#d4a27f",  border: "#d4a27f" },
    { name: "Deep Plum",    hex: "#4a0020",  border: "#4a0020" },
  ],
};

// Rich review dataset
const REVIEWS_DATA = [
  { name: "Sophia L.",  rating: 5, date: "1 week ago",   avatar: "S", verified: true,  text: "Absolutely obsessed. The quality is unlike anything else I've owned. Worth every penny — I get compliments every single time." },
  { name: "Natasha R.", rating: 5, date: "2 weeks ago",  avatar: "N", verified: true,  text: "I was skeptical at first but this exceeded all expectations. The packaging alone is a luxury experience. 10/10 would recommend." },
  { name: "Chloe M.",   rating: 5, date: "3 weeks ago",  avatar: "C", verified: true,  text: "If you want to feel like a main character, this is it. Dark, feminine, powerful. Exactly what I needed." },
  { name: "Amara K.",   rating: 4, date: "1 month ago",  avatar: "A", verified: true,  text: "Stunning piece. Fits true to size and the color is exactly as shown. Shipping was super fast too!" },
  { name: "Isabella T.",rating: 5, date: "1 month ago",  avatar: "I", verified: false, text: "Wore this to a gala and people stopped to ask where it was from. AL FIRDOUS LUXE never disappoints." },
  { name: "Zara P.",    rating: 4, date: "2 months ago", avatar: "Z", verified: true,  text: "Love the aesthetic. A tiny bit snug on the shoulders but the sizing guide helped a lot. Overall amazing." },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist, api, products } = useStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [addedToCart, setAddedToCart] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Try fetching from backend first
        const response = await api.get(`/products/${id}`);
        if (response.data.success && response.data.data) {
          setProduct(response.data.data);
          // Get related products
          const related = response.data.data.category 
            ? await api.get(`/products?category=${response.data.data.category}&limit=4`)
            : null;
          if (related?.data.success) {
            setRelatedProducts(related.data.data.filter(p => p._id !== response.data.data._id).slice(0, 4));
          }
        }
      } catch (error) {
        console.error('Backend not available, using local data:', error);
        // Fallback to local data - search by string or number ID
        const numericId = parseInt(id);
        console.log('Searching for product ID:', id, 'in products array');
        console.log('Total products in local data:', products.length);
        
        // First try exact match
        let localProduct = products.find((p) => p.id === numericId);
        
        // If not found and id is a number, try finding first occurrence
        if (!localProduct && !isNaN(numericId)) {
          localProduct = products.find((p) => p.id === numericId && p.name && p.price);
        }
        
        console.log('Found product:', localProduct);
        if (localProduct) {
          setProduct(localProduct);
          const related = products.filter((p) => p.category === localProduct.category && p.id !== localProduct.id).slice(0, 4);
          setRelatedProducts(related);
        } else {
          console.log('Product not found in local data. Available IDs:', [...new Set(products.map(p => p.id))].sort());
          // Try to find any product as fallback
          if (products.length > 0) {
            console.log('Using first available product as fallback');
            setProduct(products[0]);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400 text-xs uppercase tracking-widest">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-6 text-sm uppercase tracking-widest">Product not found</p>
          <p className="text-gray-500 text-xs mb-6">Product ID: {id}</p>
          <button onClick={() => navigate("/shop")} className="px-8 py-3 bg-red-600 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  // Build images array
  const productImages = product.images?.length > 0 
    ? product.images.map(img => img.url || img)
    : [product.image || product.img || product.primaryImage];

  // Ensure we have at least 4 images for gallery
  while (productImages.length < 4) {
    productImages.push(productImages[0]);
  }

  const colorOptions = product.category === "Beauty" ? COLOR_OPTIONS.beauty : COLOR_OPTIONS.default;

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      id: product._id || product.id,
      image: product.primaryImage || product.image || product.img,
      selectedSize,
      selectedColor,
    };
    for (let i = 0; i < quantity; i++) addToCart(cartItem);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const tabs = ["description", "specifications", "reviews", "shipping", "faqs"];

  // Map backend sizes to display format
  const availableSizes = product.sizes || ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="min-h-screen bg-black pt-20 pb-24">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest">
          <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-red-600 transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-red-600 transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-white truncate max-w-[180px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── IMAGE GALLERY ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            {/* Main Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-950">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
                        
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs uppercase tracking-widest font-medium z-10">
                  Save {discount}%
                </div>
              )}
            
              {/* Prev/Next arrows */}
              <button
                onClick={() => setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedImage((prev) => (prev + 1) % productImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === idx ? "border-red-600 ring-2 ring-red-600/30" : "border-white/10 hover:border-white/50"
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover object-center" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── PRODUCT INFO ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Category */}
            <span className="text-red-600 text-xs uppercase tracking-[0.4em]">{product.category}</span>

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-red-600 fill-red-600" : "text-gray-600"}`} />
                ))}
              </div>
              <span className="text-white text-sm font-medium">{product.rating}</span>
              <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 py-4 border-y border-white/10">
              <span className="text-4xl font-light text-white">${product.price.toLocaleString()}</span>
              {product.oldPrice && (
                <>
                  <span className="text-xl text-gray-600 line-through">${product.oldPrice.toLocaleString()}</span>
                  <span className="text-red-600 text-sm font-medium bg-red-600/10 px-2 py-0.5">{discount}% OFF</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div>
              <p className="text-white text-xs uppercase tracking-[0.3em] mb-3">
                Colour{selectedColor && <span className="text-red-600 ml-2 normal-case tracking-normal">— {selectedColor}</span>}
              </p>
              <div className="flex gap-3 flex-wrap">
                {colorOptions.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    className={`w-8 h-8 rounded-full transition-all duration-200 ${
                      selectedColor === color.name ? "ring-2 ring-red-600 ring-offset-2 ring-offset-black scale-110" : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex, border: `2px solid ${color.border}` }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            {availableSizes && availableSizes.length > 0 && (
              <div>
                <p className="text-white text-xs uppercase tracking-[0.3em] mb-3">
                  Size{selectedSize && <span className="text-red-600 ml-2 normal-case tracking-normal">— {selectedSize}</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 text-xs uppercase tracking-widest border transition-colors ${
                        selectedSize === size
                          ? "border-red-600 bg-red-600 text-white"
                          : "border-white/20 text-white hover:border-red-600 hover:text-red-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && <p className="text-red-600/70 text-xs mt-2">Please select a size to continue</p>}
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <p className="text-white text-xs uppercase tracking-[0.3em]">Qty</p>
              <div className="flex items-center border border-white/20">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2.5 text-white hover:text-red-600 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-white font-medium w-10 text-center text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2.5 text-white hover:text-red-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-gray-500 text-xs">{product.inventory} in stock</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={`flex-1 py-4 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] font-medium transition-all duration-300 ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white hover:bg-white hover:text-black"
                }`}
              >
                {addedToCart ? (
                  <><Check className="w-4 h-4" /> Added!</>
                ) : (
                  <><ShoppingBag className="w-4 h-4" /> Add to Cart — ${(product.price * quantity).toLocaleString()}</>
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 border transition-colors ${
                  wishlist.includes(product.id)
                    ? "border-red-600 bg-red-600/10 text-red-600"
                    : "border-white/20 text-white hover:border-red-600 hover:text-red-600"
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-4 border border-white/20 text-white hover:border-red-600 hover:text-red-600 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { icon: <Truck className="w-4 h-4" />,     text: "Free Express Shipping" },
                { icon: <RotateCcw className="w-4 h-4" />, text: "60-Day Easy Returns" },
                { icon: <Shield className="w-4 h-4" />,    text: "Authenticity Guaranteed" },
                { icon: <Package className="w-4 h-4" />,   text: "Luxury Gift Packaging" },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2.5 text-gray-300 text-xs">
                  <span className="text-red-600">{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── TABS ──────────────────────────────────────────── */}
        <div className="mt-20 border-t border-white/10">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-4 text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-colors relative border-b-2 ${
                  activeTab === tab
                    ? "text-red-600 border-red-600"
                    : "text-gray-500 border-transparent hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="py-10">

            {/* Description */}
            {activeTab === "description" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-6">
                <p className="text-gray-300 leading-relaxed text-base">
                  {product.description} Experience the perfect fusion of dark feminine energy and luxury craftsmanship.
                  Every detail is intentional — made for the woman who commands every room she walks into.
                </p>
                <ul className="space-y-3">
                  {["Premium quality materials", "Expert craftsmanship", "Exclusive AL FIRDOUS LUXE design", "100% cruelty-free & ethically sourced", "Satisfaction guaranteed"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                      <Check className="w-4 h-4 text-red-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Specifications */}
            {activeTab === "specifications" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-2xl">
                {availableSizes && availableSizes.length > 0 && (
                  <div>
                    <h3 className="text-white text-xs uppercase tracking-[0.3em] mb-4">Available Sizes</h3>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map((size) => (
                        <span key={size} className="px-5 py-2 border border-white/20 text-white text-xs uppercase tracking-widest">{size}</span>
                      ))}
                    </div>
                  </div>
                )}
                {product.ingredients && (
                  <div>
                    <h3 className="text-white text-xs uppercase tracking-[0.3em] mb-4">Ingredients / Materials</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{product.ingredients}</p>
                  </div>
                )}
                <div className="border border-white/10 divide-y divide-white/5">
                  {[
                    { label: "Category",     value: product.category },
                    { label: "SKU",          value: `AFL-${product.id.toString().padStart(4, "0")}` },
                    { label: "Availability", value: `${product.inventory} in stock` },
                    { label: "Rating",       value: `${product.rating} / 5.0` },
                    { label: "Total Reviews",value: `${product.reviews} verified` },
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between items-center px-4 py-3">
                      <span className="text-gray-500 text-sm">{s.label}</span>
                      <span className="text-white text-sm">{s.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                {/* Summary */}
                <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center pb-8 border-b border-white/10">
                  <div className="text-center">
                    <div className="text-6xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{product.rating}</div>
                    <div className="flex gap-1 my-2 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-red-600 fill-red-600" : "text-gray-600"}`} />
                      ))}
                    </div>
                    <div className="text-gray-400 text-xs uppercase tracking-widest">{product.reviews} Reviews</div>
                  </div>
                  {/* Bar chart */}
                  <div className="flex-1 space-y-2 w-full max-w-xs">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = star === 5 ? 75 : star === 4 ? 18 : star === 3 ? 5 : star === 2 ? 1 : 1;
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-gray-400 text-xs w-4">{star}</span>
                          <div className="flex-1 h-1.5 bg-white/10 overflow-hidden">
                            <div className="h-full bg-red-600 transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-gray-500 text-xs w-8">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Review Cards */}
                <div className="space-y-6">
                  {REVIEWS_DATA.map((review, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.07 }}
                      className="border-b border-white/5 pb-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center text-red-600 font-medium flex-shrink-0">
                            {review.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium text-sm">{review.name}</span>
                              {review.verified && (
                                <span className="text-green-500 text-[10px] uppercase tracking-widest flex items-center gap-0.5">
                                  <Check className="w-3 h-3" /> Verified
                                </span>
                              )}
                            </div>
                            <div className="text-gray-500 text-xs mt-0.5">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-red-600 fill-red-600" : "text-gray-700"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{review.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Shipping */}
            {activeTab === "shipping" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
                {[
                  { icon: <Truck className="w-7 h-7" />,     title: "Free Express Shipping", desc: "2–3 business days on orders over $200. Same-day dispatch before 2 PM." },
                  { icon: <Package className="w-7 h-7" />,   title: "Luxury Packaging",      desc: "Every order arrives in our signature black gift box with tissue wrap." },
                  { icon: <Shield className="w-7 h-7" />,    title: "Insured & Tracked",     desc: "Full insurance coverage with real-time tracking to your door." },
                ].map((item, i) => (
                  <div key={i} className="p-6 border border-white/10 hover:border-red-600/30 transition-colors">
                    <span className="text-red-600 mb-4 block">{item.icon}</span>
                    <h3 className="text-white font-medium mb-2 text-sm">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* FAQs */}
            {activeTab === "faqs" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 max-w-2xl">
                {(product.faqs || [
                  { q: "How do I care for this item?", a: "Refer to the care label. For delicate pieces, we recommend professional cleaning." },
                  { q: "What is your return policy?", a: "60-day hassle-free returns on unworn items with original tags. Beauty must be unopened." },
                  { q: "Do you offer gift wrapping?", a: "Every order comes in luxury gift packaging at no extra charge." },
                  { q: "Can I exchange for a different size?", a: "Yes! Exchanges are free within 30 days. Contact us and we'll sort it immediately." },
                ]).map((faq, idx) => (
                  <details key={idx} className="group border border-white/10 overflow-hidden">
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-white/5 transition-colors">
                      <span className="text-white text-sm font-medium">{faq.q}</span>
                      <span className="text-red-600 text-xl group-open:rotate-45 transition-transform duration-300">+</span>
                    </summary>
                    <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{faq.a}</div>
                  </details>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* ── RELATED PRODUCTS ──────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-white/10 pt-16">
            <div className="text-center mb-12">
              <span className="text-red-600 text-xs uppercase tracking-[0.4em] block mb-3">You May Also Love</span>
              <h2 className="text-3xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Related Pieces</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rp) => {
                const productId = rp._id || rp.id;
                const productImage = rp.primaryImage || rp.image || rp.img;
                return (
                  <motion.div
                    key={productId}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.random() * 0.2 }}
                    className="group"
                  >
                    <Link to={`/product/${productId}`} className="block">
                      <div className="aspect-[3/4] overflow-hidden mb-3 border border-white/10 group-hover:border-red-600/30 transition-colors">
                        <img src={productImage} alt={rp.name} className="w-full h-full object-contain bg-zinc-900" />
                      </div>
                      <h3 className="text-white text-sm font-light group-hover:text-red-600 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>{rp.name}</h3>
                      <p className="text-red-600 text-sm mt-1">${(rp.price || 0).toLocaleString()}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
