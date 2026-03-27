import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import HeroCarousel from "../components/HeroCarousel";
import Footer from "../components/Footer";
import { Truck, Shield, RotateCcw } from "lucide-react";
import { useStore } from "../context/StoreContext";
import FAQSection from "../components/FAQSection";

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

export default function HomePage() {
  const { filteredProducts } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const featuredProducts = filteredProducts.slice(0, 12);

  const categoryData = [
    { name: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop", link: "/shop?category=tech", color: "gold" },
    { name: "Fashion", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop", link: "/shop?category=fashion", color: "gold" },
    { name: "Home & Garden", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop", link: "/shop?category=home", color: "gold" },
    { name: "Beauty", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop", link: "/shop?category=beauty", color: "gold" },
    { name: "Sports", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop", link: "/shop?category=sports", color: "gold" },
    { name: "Books", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop", link: "/shop?category=books", color: "gold" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-gradient-to-r from-gold-500 to-slate-700 p-8 md:p-12 rounded-3xl animate-pulse shadow-2xl" />
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-black">
      
      {/* Video Slideshow Hero */}
      <section className="relative w-full">
        <HeroCarousel />
      </section>

      {/* Category Grid */}
      <section className="py-32 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.h2 
            className="font-playfair text-5xl md:text-7xl lg:text-8xl font-black text-black text-center mb-20 drop-shadow-2xl leading-tight tracking-tight"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            SHOP BY CATEGORY
          </motion.h2>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {categoryData.map((cat, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ y: -16, scale: 1.05 }}
                className="group"
              >
                <Link 
                  to={cat.link}
                  className="block p-10 md:p-12 rounded-3xl border-2 border-slate-800/50 bg-slate-900/50 hover:border-gold-500/70 hover:bg-slate-900 hover:shadow-2xl hover:shadow-gold-500/20 transition-all duration-700 hover:scale-[1.03] backdrop-blur-xl"
                >
                  <div className="relative w-full h-40 md:h-48 mb-8 overflow-hidden rounded-2xl group-hover:scale-110 transition-transform duration-500">
                    <img 
                      src={cat.img} 
                      alt={cat.name}
                      className="w-full h-full object-cover brightness-75 hover:brightness-100 transition-all" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gold-600/20 to-transparent opacity-0 group-hover:opacity-30 transition-opacity" />
                  </div>
                  <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-extrabold text-black text-center drop-shadow-xl hover:text-gold-500 transition-all group-hover:scale-105">
                    {cat.name.toUpperCase()}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.h2 
            className="font-playfair text-5xl md:text-7xl lg:text-8xl font-black text-black text-center mb-20 drop-shadow-2xl leading-tight tracking-tight"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            FEATURED PRODUCTS
          </motion.h2>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id || idx}
                variants={itemVariants}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center">
          <motion.div 
            className="flex flex-col items-center gap-6 p-12 md:p-16 bg-slate-950/50 rounded-3xl backdrop-blur-xl border border-slate-800/50 hover:border-gold-500/50 transition-all"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <Truck className="w-20 h-20 text-gold-500 drop-shadow-xl" />
            <div>
              <h3 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-4 drop-shadow-2xl">FREE SHIPPING</h3>
              <p className="text-xl md:text-2xl font-bold text-black opacity-90">On orders over $500</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center gap-6 p-12 md:p-16 bg-slate-950/50 rounded-3xl backdrop-blur-xl border border-slate-800/50 hover:border-gold-500/50 transition-all"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <Shield className="w-20 h-20 text-gold-500 drop-shadow-xl" />
            <div>
              <h3 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-4 drop-shadow-2xl">SECURE PAYMENT</h3>
              <p className="text-xl md:text-2xl font-bold text-black opacity-90">100% Protected</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center gap-6 p-12 md:p-16 bg-slate-950/50 rounded-3xl backdrop-blur-xl border border-slate-800/50 hover:border-gold-500/50 transition-all"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <RotateCcw className="w-20 h-20 text-gold-500 drop-shadow-xl" />
            <div>
              <h3 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-4 drop-shadow-2xl">EASY RETURNS</h3>
              <p className="text-xl md:text-2xl font-bold text-black opacity-90">60-Day Guarantee</p>
            </div>
          </motion.div>
        </div>
      </section>

      <FAQSection />
      <Footer />
    </div>
  );
}
