import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingCart, Heart } from 'lucide-react';
import { useStore } from "../context/StoreContext";

export default function QuickViewModal() {
  const { productModal, setProductModal, addToCart, wishlist, toggleWishlist } = useStore();

  if (!productModal) return null;

  const discount = productModal.oldPrice ? Math.round(((productModal.oldPrice - productModal.price) / productModal.oldPrice) * 100) : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={() => setProductModal(null)}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-1/2 p-6">
              <div className="relative">
                <motion.img
                  src={productModal.img}
                  alt={productModal.name}
                  className="w-full h-80 object-cover rounded-lg"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                />
                {discount > 0 && (
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                  >
                    -{discount}%
                  </motion.div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{productModal.category}</p>
                  <h2 className="text-2xl font-bold dark:text-white mb-2">{productModal.name}</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setProductModal(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < Math.floor(productModal.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">({productModal.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">${productModal.price}</span>
                {productModal.oldPrice && (
                  <span className="text-xl text-gray-400 line-through">${productModal.oldPrice}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {productModal.description || "High-quality product with excellent features and customer satisfaction. Perfect for your needs."}
              </p>

              {/* Actions */}
              <div className="flex gap-3 mt-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    addToCart(productModal);
                    setProductModal(null);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleWishlist(productModal.id)}
                  className={`p-3 rounded-lg border-2 transition ${
                    wishlist.includes(productModal.id)
                      ? 'bg-red-500 border-red-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 hover:border-red-500 text-gray-600 dark:text-gray-300 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${wishlist.includes(productModal.id) ? 'fill-current' : ''}`} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}