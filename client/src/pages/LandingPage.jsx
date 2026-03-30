import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart, ShoppingBag, Mail, Sparkles, Zap, Target } from "lucide-react";
import { useStore } from "../context/StoreContext";
import Testimonials from "../components/Testimonials";
import OccasionSelector from "../components/OccasionSelector";
import axios from "axios";

const HERO_SLIDES = [
  { id: 1, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1920&h=1080&fit=crop", title: "DARK FEMININE", subtitle: "POWER", cta: "Shop The Aesthetic" },
  { id: 2, image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1920&h=1080&fit=crop", title: "ELEGANCE", subtitle: "REDEFINED", cta: "Discover Luxury" },
  { id: 3, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=1080&fit=crop", title: "BOLD", subtitle: "BEAUTIFUL", cta: "Explore Now" },
  { id: 4, image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=1920&h=1080&fit=crop", title: "TIMELESS", subtitle: "STYLE", cta: "View Collection" },
];

const CATEGORIES = [
  { name: "Fashion", image: "/images/collage-1.jpg", link: "/shop?category=fashion" },
  { name: "Beauty", image: "/images/collage-3.jpg", link: "/shop?category=beauty" },
];

const FEATURED_PRODUCTS = [
  { id: 4,  name: "Diamond Cat Choker",    price: 3285, image: "/images/diamond-cat.jpg" },
  { id: 8,  name: "Maneater Red Lipstick", price: 485,  image: "/images/maneater-lipstick.jpg" },
  { id: 13, name: "Cherry Red Vinyl Pants",price: 1285, image: "/images/red-vinyl-pants.jpg" },
  { id: 1,  name: "Crimson Velvet Gown",   price: 2890, image: "/images/collage-2.jpg" },
];

const MOOD_BOARD = [
  { src: "/images/collage-1.jpg", alt: "Style I" },
  { src: "/images/collage-2.jpg", alt: "Style II" },
  { src: "/images/collage-3.jpg", alt: "Style III" },
  { src: "/images/collage-4.jpg", alt: "Style IV" },
];

const FAQS = [
  { q: "How do I find my size?", a: "Each product page includes a detailed size guide. For fashion, we recommend measuring your bust, waist and hips." },
  { q: "What is your return policy?", a: "We offer 60-day hassle-free returns on all unworn items with tags attached. Beauty products must be unopened." },
  { q: "Do you ship internationally?", a: "Yes! We ship worldwide with complimentary express shipping on orders over $200." },
  { q: "Are your beauty products cruelty-free?", a: "All AL FIRDOUS LUXE beauty products are 100% cruelty-free and never tested on animals." },
  { q: "How can I track my order?", a: "Once shipped you'll receive a tracking email. Track anytime from your account dashboard." },
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const { addToCart } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Removed auto-rotation for static hero
  }, []);

  const handleNewsletterSubscribe = async (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.trim()) return;
    
    try {
      const response = await axios.post(`${API_URL}/newsletter/subscribe`, {
        email: newsletterEmail,
        source: 'website'
      });
      
      if (response.data.success) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
        setTimeout(() => setNewsletterStatus(null), 3000);
      }
    } catch (error) {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus(null), 3000);
    }
  };

  return (
    <div className="bg-black">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative w-full h-screen min-h-[100dvh] overflow-hidden">
        {/* Full Screen Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1920&h=1080&fit=crop"
            alt="AL FIRDOUS LUXE"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)';
            }}
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Centered Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-6 sm:px-12 lg:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="block text-red-600 text-xs sm:text-sm uppercase tracking-[0.5em] mb-6"
            >
              Smart Fashion Recommendations · AI-Powered Styling
            </motion.span>

            <h1
              className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-light text-white leading-none tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              AL FIRDOUS
              <br />
              LUXE
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl font-light text-white/90 mb-10 tracking-wide max-w-2xl mx-auto">
              Discover your perfect outfit for every occasion with intelligent style matching
            </p>

            <Link
              to="#occasion-selector"
              className="group inline-flex items-center gap-3 px-12 sm:px-14 py-5 bg-red-600 text-white text-xs sm:text-sm uppercase tracking-[0.3em] font-medium hover:bg-white hover:text-black transition-all duration-300 shadow-2xl"
            >
              Find Your Look
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-20"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-white/40" />
        </motion.div>
      </section>

      {/* ── MARQUEE STRIP ─────────────────────────────────────── */}
      <div className="bg-red-600 py-3 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap"
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-white text-xs uppercase tracking-[0.4em] font-medium">
              AL FIRDOUS LUXE &nbsp;·&nbsp; SMART FASHION RECOMMENDATIONS &nbsp;·&nbsp; AI-POWERED STYLING &nbsp;·&nbsp; FREE SHIPPING OVER $200 &nbsp;·&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── OCCASION SELECTOR ────────────────────────────────── */}
      <OccasionSelector />

      {/* ── PROBLEM/SOLUTION ─────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-red-600" />
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-light text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  The Problem
                </h2>
              </div>
              <p className="text-gray-400 text-base leading-relaxed">
                Fashion overwhelm is real. Endless scrolling, too many choices, and still nothing feels quite right. 
                You waste hours searching for the perfect outfit for special occasions, only to end up frustrated and 
                uncertain about what truly works.
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                Traditional shopping lacks personalization. What if there was a smarter way?
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-red-600" />
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-light text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Our Solution
                </h2>
              </div>
              <p className="text-gray-400 text-base leading-relaxed">
                AL FIRDOUS LUXE uses intelligent style matching to curate personalized outfit recommendations 
                based on your occasion, preferences, and body type. Our AI-powered platform analyzes thousands 
                of combinations to present you with perfectly coordinated looks.
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                Simply select your occasion – Wedding, Party, or Casual – and let our algorithm do the styling for you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-red-600 text-xs uppercase tracking-[0.5em] mb-4 block">Why Choose Us</span>
            <h2
              className="text-3xl sm:text-5xl font-light text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Smart Features
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-8 border border-white/10 rounded-2xl hover:border-red-600/50 transition-colors"
            >
              <div className="w-20 h-20 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-white text-xl font-medium mb-3">AI Style Matching</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Advanced algorithms analyze your preferences, occasion, and latest trends to recommend perfect outfits tailored just for you.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 border border-white/10 rounded-2xl hover:border-red-600/50 transition-colors"
            >
              <div className="w-20 h-20 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-white text-xl font-medium mb-3">Instant Recommendations</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Get curated outfit suggestions in seconds. No more endless browsing – just click, select your occasion, and discover your look.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center p-8 border border-white/10 rounded-2xl hover:border-red-600/50 transition-colors"
            >
              <div className="w-20 h-20 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-white text-xl font-medium mb-3">Personalized Curation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every recommendation is handpicked by our AI to match your unique style, body type, and the specific occasion you're dressing for.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-red-600 text-xs uppercase tracking-[0.5em] mb-3 block">Explore</span>
            <h2 className="text-3xl sm:text-5xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shop by Category
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <Link to={cat.link} className="group block relative overflow-hidden aspect-[3/4]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain bg-zinc-900"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70" />
                  <div className="absolute inset-0 border border-white/10 group-hover:border-red-600/50 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3
                      className="text-white text-xl sm:text-2xl font-light mb-1 tracking-wide"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {cat.name}
                    </h3>
                    <span className="text-red-600 text-xs uppercase tracking-widest group-hover:underline">Shop Now →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-red-600 text-xs uppercase tracking-[0.5em] mb-3 block">Curated</span>
            <h2 className="text-3xl sm:text-5xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Featured Pieces
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {FEATURED_PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative overflow-hidden aspect-[3/4] mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain bg-zinc-900"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 border border-white/10 group-hover:border-red-600/40 transition-colors" />
                    {/* Quick add overlay */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-red-600 py-3 flex items-center justify-center gap-2 text-white text-xs uppercase tracking-widest">
                      <ShoppingBag className="w-4 h-4" /> View Product
                    </div>
                  </div>
                  <h3
                    className="text-white text-sm font-light group-hover:text-red-600 transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {product.name}
                  </h3>
                  <p className="text-red-600 text-sm mt-1">${product.price.toLocaleString()}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 px-10 py-4 border border-white/20 text-white text-xs uppercase tracking-[0.3em] hover:border-red-600 hover:text-red-600 transition-colors"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MOOD BOARD ────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-red-600 text-xs uppercase tracking-[0.5em] mb-3 block">Aesthetic</span>
            <h2 className="text-3xl sm:text-5xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Mood Board
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {MOOD_BOARD.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative overflow-hidden group ${idx === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              >
                <div className={idx === 0 ? "aspect-square" : "aspect-[3/4]"}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-contain bg-zinc-900"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 border border-white/10 group-hover:border-red-600/50 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ─────────────────────────────────────────────── */}
      <section className="py-32 sm:py-40 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/hero-1.jpg" alt="" className="w-full h-full object-cover object-center grayscale" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-red-600 text-xs uppercase tracking-[0.6em] mb-8 block">Manifesto</span>
            <p
              className="text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "She doesn't compete.<br />She dominates."
            </p>
            <div className="w-20 h-px bg-red-600 mx-auto mt-12 mb-6" />
            <p className="text-white/50 text-xs uppercase tracking-[0.5em]">AL FIRDOUS LUXE</p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-zinc-950">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-red-600 text-xs uppercase tracking-[0.5em] mb-3 block">Questions</span>
            <h2 className="text-3xl sm:text-4xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Frequently Asked
            </h2>
          </motion.div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-medium text-sm sm:text-base">{faq.q}</span>
                  <span className={`text-red-600 text-2xl transition-transform duration-300 ${openFaq === idx ? "rotate-45" : ""}`}>+</span>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEVELOPERS ────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-red-600 text-xs uppercase tracking-[0.5em] mb-3 block">Team</span>
            <h2 className="text-3xl sm:text-4xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Developers
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { name: "Al Jannatul", role: "Lead Developer",  initial: "A" },
              { name: "Firdous Luxe", role: "UI/UX Designer", initial: "F" },
              { name: "Noir Studio",  role: "Frontend Dev",   initial: "N" },
              { name: "Crimson Tech", role: "Backend Dev",    initial: "C" },
            ].map((dev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full bg-red-600/10 border-2 border-red-600/40 flex items-center justify-center hover:border-red-600 transition-colors">
                  <span className="text-2xl sm:text-3xl font-light text-red-600" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {dev.initial}
                  </span>
                </div>
                <h3 className="text-white font-medium text-sm sm:text-base mb-0.5">{dev.name}</h3>
                <p className="text-gray-500 text-xs sm:text-sm">{dev.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <Testimonials />

      {/* ── NEWSLETTER ────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-zinc-950 border-t border-white/5">
        <div className="max-w-xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-red-600 text-xs uppercase tracking-[0.5em] mb-3 block">Join the Circle</span>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Exclusive Access
            </h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">Be the first to know about new arrivals, exclusive offers, and secret sales.</p>
            
            <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-0">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full pl-12 pr-6 py-4 bg-black border border-white/10 text-white placeholder-gray-500 focus:border-red-600 focus:outline-none text-sm rounded-l-lg"
                  required
                />
              </div>
              <button 
                type="submit"
                className="px-8 py-4 bg-red-600 text-white text-xs uppercase tracking-[0.3em] font-medium hover:bg-white hover:text-black transition-colors whitespace-nowrap rounded-r-lg"
              >
                Subscribe
              </button>
            </form>
            
            {newsletterStatus === 'success' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-green-400 text-sm"
              >
                ✓ Successfully subscribed!
              </motion.p>
            )}
            {newsletterStatus === 'error' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-red-400 text-sm"
              >
                Something went wrong. Please try again.
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="py-16 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-lg tracking-[0.25em] text-white uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>AL</span>
                <span className="text-lg tracking-[0.25em] text-red-600" style={{ fontFamily: "'Playfair Display', serif" }}>FIRDOUS</span>
                <span className="text-lg tracking-[0.25em] text-white uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>LUXE</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                AI-powered smart fashion recommendations for every occasion. Discover your perfect look with intelligent style matching.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white text-sm uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Shop", "Collections", "New Arrivals", "Deals", "About Us"].map(item => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase().replace(' ', '')}`} className="text-gray-400 text-sm hover:text-red-600 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h4 className="text-white text-sm uppercase tracking-wider mb-4">Customer Care</h4>
              <ul className="space-y-2">
                {["Contact Us", "FAQ", "Shipping Info", "Returns", "Size Guide"].map(item => (
                  <li key={item}>
                    <Link to="/about" className="text-gray-400 text-sm hover:text-red-600 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h4 className="text-white text-sm uppercase tracking-wider mb-4">Get in Touch</h4>
              <ul className="space-y-3 mb-6">
                <li className="text-gray-400 text-sm flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@alfirdousluxe.com</span>
                </li>
                <li className="text-gray-400 text-sm flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </li>
              </ul>
              
              {/* Social Media */}
              <div className="flex gap-4">
                {[
                  { name: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                  { name: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                  { name: 'TikTok', path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
                  { name: 'Pinterest', path: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-xs text-gray-500">© 2024 AL FIRDOUS LUXE. All rights reserved.</p>
              <div className="flex gap-6">
                <Link to="/about" className="text-xs text-gray-500 hover:text-red-600 transition-colors">Privacy Policy</Link>
                <Link to="/about" className="text-xs text-gray-500 hover:text-red-600 transition-colors">Terms of Service</Link>
                <Link to="/about" className="text-xs text-gray-500 hover:text-red-600 transition-colors">Cookie Policy</Link>
              </div>
              <div className="flex gap-3">
                {/* Payment Icons */}
                {['Visa', 'Mastercard', 'PayPal'].map((payment) => (
                  <div key={payment} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400">
                    {payment}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
