import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-40"
        animate={{ y: isOpen ? 0 : [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 right-6 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 z-40"
        >
          <h3 className="font-bold text-lg mb-3 dark:text-white">Need Help?</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Our support team is here to assist you 24/7.</p>
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm font-medium">Send</button>
        </motion.div>
      )}
    </>
  );
}