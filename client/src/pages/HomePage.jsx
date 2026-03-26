
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroCarousel from "../components/HeroCarousel";
import CategorySlider from "../components/CategorySlider";
import DealsSection from "../components/DealsSection";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { useStore } from "../context/StoreContext";
import { Truck, Shield, RotateCcw } from "lucide-react";

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
    { name: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300", link: "/shop?category=tech" },
    { name: "Fashion", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300", link: "/shop?category=fashion" },
    { name: "Home", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300", link: "/shop?category=home" },
    { name: "Beauty", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300", link: "/shop?category=beauty" },
    { name: "Sports", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300", link: "/shop?category=sports" },
    { name: "Books", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300", link: "/shop?category=books" },
  ];

  const ProductSection = ({ title, products }) => (
    <motion.section 
      className="py-12 bg-gradient-to-b from-dark-800 to-dark-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white text-center mb-8"
          variants={itemVariants}
        >
          {title}
        </motion.h2>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {products.map((product, idx) => (
            <motion.div
              key={product.id || idx}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      
      <HeroCarousel />
      <CategorySlider />

      {/* Shop by Category */}
      <motion.section className="py-12" initial="hidden" whileInView="visible" variants={containerVariants}>
        <div className="max-w-7xl mx-auto px-4">
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white text-center mb-8"
            variants={itemVariants}
          >
            Shop by Category
          </motion.h2>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
            variants={containerVariants}
          >
            {categoryData.map((cat, idx) => (
              <motion.div key={idx} variants={itemVariants} whileHover={{ y: -10, scale: 1.05 }}>
                
                <Link 
                  to={cat.link} 
                  className="block bg-dark-800 border border-dark-600 rounded-2xl p-6 hover:scale-105 transition-all duration-300"
                >
                  <div className="relative overflow-hidden rounded-xl mb-4 h-32">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                  </div>

                  <h3 className="text-lg font-semibold text-white text-center">
                    {cat.name}
                  </h3>
                </Link>

              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.section>

      <DealsSection />

      <ProductSection title="Featured Products" products={featuredProducts} />
      <ProductSection title="Recommended for You" products={recommendedProducts.slice(0, 8)} />
      <ProductSection title="Customer Favorites" products={customerFavorites.slice(0, 8)} />

      {/* Trust Section */}
      <section className="bg-dark-800 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">

          <div className="flex items-center gap-4">
            <Truck className="w-10 h-10" />
            <div>
              <h3 className="font-bold">FREE Shipping</h3>
              <p className="text-sm">on orders over $25</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Shield className="w-10 h-10" />
            <div>
              <h3 className="font-bold">Secure Payment</h3>
              <p className="text-sm">100% protected</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <RotateCcw className="w-10 h-10" />
            <div>
              <h3 className="font-bold">Easy Returns</h3>
              <p className="text-sm">30-day policy</p>
            </div>
          </div>

        </div>
      </section>

      {/* Back to top */}
      <section className="bg-gray-900 py-4 text-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-gold-500 text-black px-6 py-2 rounded font-medium hover:bg-gold-600 transition"
        >
          Back to top
        </button>
      </section>

      <Footer />
    </div>
  );
} 