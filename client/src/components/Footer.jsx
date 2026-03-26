import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CreditCard } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    about: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Sustainability', href: '#' },
    ],
    service: [
      { label: 'Customer Service', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Track Order', href: '#' },
      { label: 'Returns', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookies', href: '#' },
      { label: 'Accessibility', href: '#' },
    ],
  };

  const socialIcons = [
    { icon: Mail, label: 'Email' },
    { icon: Phone, label: 'Phone' },
    { icon: MapPin, label: 'Location' },
    { icon: CreditCard, label: 'Payment' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h4 className="font-bold text-lg mb-4">About</h4>
            {footerLinks.about.map((link) => (
              <a key={link.label} href={link.href} className="block text-gray-400 hover:text-white transition mb-2 text-sm">
                {link.label}
              </a>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <h4 className="font-bold text-lg mb-4">Service</h4>
            {footerLinks.service.map((link) => (
              <a key={link.label} href={link.href} className="block text-gray-400 hover:text-white transition mb-2 text-sm">
                {link.label}
              </a>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            {footerLinks.legal.map((link) => (
              <a key={link.label} href={link.href} className="block text-gray-400 hover:text-white transition mb-2 text-sm">
                {link.label}
              </a>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {socialIcons.map(({ icon: Icon, label }) => (
                <motion.a key={label} href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="text-gray-400 hover:text-white transition">
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <p>&copy; 2025 FullStack AI Commerce. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}