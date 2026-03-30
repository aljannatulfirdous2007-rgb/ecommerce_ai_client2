import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LuxuryHero from "../components/LuxuryHero";
import LuxuryProductCard from "../components/LuxuryProductCard";
import Footer from "../components/Footer";
import { useStore } from "../context/StoreContext";
import { Truck, Shield, RotateCcw, ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function HomePage() {
  const { filteredProducts } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const featuredProducts = filteredProducts.slice(0, 8);
  const recommendedProducts = filteredProducts.slice(8, 16);
  const customerFavorites = filteredProducts.slice(16, 24);

  const categoryData = [
    { name: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&fit=crop&crop=center", link: "/shop?category=tech" },
    { name: "Fashion", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&fit=crop&crop=center", link: "/shop?category=fashion" },
    { name: "Home", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&fit=crop&crop=center", link: "/shop?category=home" },
    { name: "Beauty", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&fit=crop&crop=center", link: "/shop?category=beauty" },
    { name: "Sports", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&fit=crop&crop=center", link: "/shop?category=sports" },
    { name: "Books", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&fit=crop&crop=center", link: "/shop?category=books" },
  ];

  const ProductSection = ({ title, subtitle, products }) => (
    <section className="py-20 bg-midnight-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block">{subtitle}</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white">{title}</h2>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <motion.div 
              key={product.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <LuxuryProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-midnight">
      {/* Luxury Hero */}
      <LuxuryHero />

      {/* Featured Categories */}
      <section className="py-20 bg-midnight">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block">Browse</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white">Shop by Category</h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categoryData.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={cat.link} className="group block">
                  <div className="relative overflow-hidden rounded-2xl aspect-square mb-4">
                    <img 
                      src={cat.img} 
                      alt={cat.name} 
                      className="w-full h-full object-contain bg-zinc-900" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-gold/30 transition-colors" />
                  </div>
                  <h3 className="text-white text-center font-medium group-hover:text-gold transition-colors">{cat.name}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Sections */}
      <ProductSection title="Featured Products" subtitle="Curated" products={featuredProducts} />
      <ProductSection title="Recommended for You" subtitle="Personalized" products={recommendedProducts.slice(0, 8)} />
      <ProductSection title="Customer Favorites" subtitle="Popular" products={customerFavorites.slice(0, 8)} />

      {/* Trust Section */}
      <section className="py-20 bg-midnight border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Complimentary Shipping</h3>
              <p className="text-gray-400 text-sm">Free express delivery on orders over $500</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-400 text-sm">Bank-level encryption for your protection</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <RotateCcw className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-400 text-sm">60-day hassle-free return policy</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-midnight-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block">Stay Connected</span>
            <h2 className="font-serif text-4xl text-white mb-4">Join the Inner Circle</h2>
            <p className="text-gray-400 mb-8">Subscribe to receive exclusive offers, early access to new arrivals, and curated style guides.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-midnight border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
              />
              <button className="px-8 py-4 bg-gold hover:bg-gold-400 text-midnight font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}