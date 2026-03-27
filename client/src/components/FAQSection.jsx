import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "What are your shipping options and costs?",
    answer: "We offer free standard shipping on orders over $50. Standard shipping takes 3-7 business days. Express shipping (1-2 days) is $12.99. All orders are shipped from our US warehouses."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of delivery. Items must be unused and in original packaging. Return shipping is free for orders over $100. Please contact support for return instructions."
  },
  {
    question: "How secure is my payment information?",
    answer: "Your payment information is encrypted with 256-bit SSL security. We accept all major credit cards, PayPal, Apple Pay, and Google Pay. We never store your full card details."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes! We ship to 200+ countries. International shipping costs are calculated at checkout. Please note potential customs fees and import duties which are the recipient's responsibility."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order in real-time from your account dashboard under 'My Orders'."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Visa, MasterCard, American Express, Discover, PayPal, Apple Pay, Google Pay, and Afterpay. Payments are processed securely through Stripe."
  },
  {
    question: "Is my data safe with you?",
    answer: "Absolutely. We use industry-leading security measures including SSL encryption, PCI compliance, and regular security audits to protect your personal information."
  },
  {
    question: "How do I contact customer support?",
    answer: "Our support team is available 24/7 via live chat, email (support@shop.com), and phone (1-800-555-0199). Average response time is under 2 minutes."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 via-purple-900/20 to-slate-950">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white px-6 py-3 rounded-full mb-8 font-semibold">
            <MessageCircle className="w-5 h-5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
            Got Questions?
          </h2>
          <p className="text-xl text-slate-400 mt-4 max-w-2xl mx-auto">
            Find answers to the most common questions about shopping with us
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl overflow-hidden hover:border-rose-500/50 hover:shadow-rose-500/10 transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-8 text-left flex items-center justify-between group"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-200 group-hover:text-rose-400 transition-colors">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-slate-500 group-hover:text-rose-400 transition-colors" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-2">
                      <p className="text-slate-400 leading-relaxed text-lg">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

