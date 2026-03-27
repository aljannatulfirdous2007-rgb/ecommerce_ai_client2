import { motion } from "framer-motion";
import { useStore } from "../context/StoreContext";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function CartDrawer({ open, onClose }) {
  const { cart, cartTotal, removeFromCart, updateQty } = useStore();

  if (!open) return null;

  return (
    <motion.div 
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-50 flex bg-slate-900/60 backdrop-blur-sm" 
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="ml-auto h-full w-full max-w-lg overflow-y-auto bg-slate-900/95 backdrop-blur-xl border-l border-slate-800/50 shadow-2xl shadow-slate-900/50"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30">
                <ShoppingBag className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">Your Cart</h2>
                <p className="text-sm text-slate-500">{cart.length} items</p>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/70 backdrop-blur-sm border border-slate-700/50 text-slate-400 hover:text-slate-200 transition-all duration-200"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>
        </header>

        <div className="p-6 divide-y divide-slate-800/50">
          {cart.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-24 text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-800/50 rounded-2xl flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-400 mb-2">Your cart feels empty</h3>
              <p className="text-slate-500 mb-8">Start shopping to see your items here</p>
              <a href="/shop" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300">
                Start Shopping
                <ShoppingBag className="w-4 h-4" />
              </a>
            </motion.div>
          ) : (
            <>
              <div className="space-y-4 py-6">
                {cart.map((item, idx) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group"
                  >
                    <div className="flex gap-4 p-4 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/70 transition-all duration-200">
                      <img 
                        src={item.img} 
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-200 line-clamp-2 mb-1">{item.name}</h4>
                        <p className="text-sm text-slate-500 mb-3">{item.category}</p>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                          <span className="text-sm text-slate-500">${item.price} × {item.qty}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-xl bg-slate-700/50 hover:bg-slate-600/70 border border-slate-600/50 text-slate-400 hover:text-slate-200 transition-all duration-200 flex-shrink-0"
                            onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          <span className="w-10 text-center font-mono font-bold text-slate-300 bg-slate-800/50 px-3 py-2 rounded-xl border border-slate-700/50 min-w-[2.5rem]">
                            {item.qty}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-xl bg-slate-700/50 hover:bg-slate-600/70 border border-slate-600/50 text-slate-400 hover:text-slate-200 transition-all duration-200 flex-shrink-0"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="ml-auto p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 border border-rose-500/30 text-rose-400 hover:text-rose-300 transition-all duration-200"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="p-6 bg-gradient-to-r from-slate-800/70 to-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl -mt-4 sticky bottom-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-slate-300">Total</span>
                  <span className="text-3xl font-black bg-gradient-to-r from-gold-500 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-indigo-500/40 focus:ring-4 focus:ring-indigo-500/40 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Proceed to Checkout
                  <ShoppingBag className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
