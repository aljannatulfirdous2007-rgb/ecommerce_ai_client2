import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Award,
  Heart,
  Mail,
  Phone,
  MapPin,
  Clock,
  Star,
  ShoppingBag,
  Globe,
  Shield,
  Truck,
  HeadphonesIcon
} from "lucide-react";

export default function About() {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { icon: Users, label: 'Happy Customers', value: '1M+', color: 'text-blue-500' },
    { icon: ShoppingBag, label: 'Products Sold', value: '5M+', color: 'text-green-500' },
    { icon: Globe, label: 'Countries Served', value: '50+', color: 'text-purple-500' },
    { icon: Award, label: 'Years of Excellence', value: '10+', color: 'text-orange-500' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Every product undergoes rigorous quality checks to ensure you receive only the best.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Lightning-fast shipping with real-time tracking for all your orders.'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Our customer service team is always ready to help with any questions or concerns.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority. We go above and beyond for our customers.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'With over 15 years in e-commerce, Sarah founded our company with a vision to revolutionize online shopping.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Tech innovator passionate about creating seamless digital experiences for millions of users worldwide.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Customer Experience',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Dedicated to ensuring every customer interaction is positive, memorable, and exceeds expectations.'
    },
    {
      name: 'David Kim',
      role: 'VP of Operations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Expert in supply chain optimization and logistics, ensuring smooth operations across all departments.'
    }
  ];

  const tabs = [
    { id: 'mission', label: 'Our Mission', icon: Target },
    { id: 'story', label: 'Our Story', icon: Users },
    { id: 'values', label: 'Our Values', icon: Heart },
    { id: 'team', label: 'Our Team', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 dark:text-white">About Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're more than just an online store. We're your trusted partner in discovering amazing products
            that enhance your lifestyle and bring joy to your everyday moments.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Content Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-16">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-center font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-amazon-orange text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5 mx-auto mb-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'mission' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <Target className="w-16 h-16 text-amazon-orange mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-6 dark:text-white">Our Mission</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  To democratize access to quality products by creating an online marketplace that combines
                  cutting-edge technology with exceptional customer service. We believe that everyone deserves
                  access to products that improve their lives, regardless of their location or budget.
                  <br /><br />
                  Our mission is to build lasting relationships with our customers by consistently delivering
                  value, innovation, and trust. We strive to be more than just a retailer – we want to be
                  your go-to destination for all your shopping needs.
                </p>
              </motion.div>
            )}

            {activeTab === 'story' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-6 dark:text-white">Our Story</h3>
                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                      <p>
                        Founded in 2014 by a group of passionate entrepreneurs who saw an opportunity to
                        revolutionize the online shopping experience. What started as a small startup in a
                        garage has grown into one of the most trusted e-commerce platforms worldwide.
                      </p>
                      <p>
                        Our journey began with a simple idea: make quality products accessible to everyone.
                        We invested heavily in technology and customer service from day one, building a
                        platform that prioritizes user experience and satisfaction above all else.
                      </p>
                      <p>
                        Today, we serve millions of customers across 50+ countries, offering a curated
                        selection of products from trusted brands and emerging artisans. Our commitment
                        to excellence has earned us numerous awards and the loyalty of our growing community.
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=600&h=400&fit=crop"
                      alt="Our office"
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'values' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-3xl font-bold text-center mb-12 dark:text-white">Our Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {values.map((value, index) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                    >
                      <value.icon className="w-12 h-12 text-amazon-orange mb-4" />
                      <h4 className="text-xl font-bold mb-3 dark:text-white">{value.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'team' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-3xl font-bold text-center mb-12 dark:text-white">Meet Our Team</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {team.map((member, index) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h4 className="text-xl font-bold mb-2 dark:text-white">{member.name}</h4>
                      <p className="text-amazon-orange font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12 dark:text-white">Get In Touch</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Mail className="w-8 h-8 text-amazon-orange mx-auto mb-3" />
              <h4 className="font-bold mb-2 dark:text-white">Email Us</h4>
              <p className="text-gray-600 dark:text-gray-300">support@amazonecommerce.com</p>
              <p className="text-gray-600 dark:text-gray-300">business@amazonecommerce.com</p>
            </div>
            <div className="text-center">
              <Phone className="w-8 h-8 text-amazon-orange mx-auto mb-3" />
              <h4 className="font-bold mb-2 dark:text-white">Call Us</h4>
              <p className="text-gray-600 dark:text-gray-300">1-800-SHOP-NOW</p>
              <p className="text-gray-600 dark:text-gray-300">Mon-Fri 9AM-6PM PST</p>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 text-amazon-orange mx-auto mb-3" />
              <h4 className="font-bold mb-2 dark:text-white">Visit Us</h4>
              <p className="text-gray-600 dark:text-gray-300">123 Commerce Street</p>
              <p className="text-gray-600 dark:text-gray-300">Seattle, WA 98101</p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-amazon-orange mx-auto mb-3" />
              <h4 className="font-bold mb-2 dark:text-white">Business Hours</h4>
              <p className="text-gray-600 dark:text-gray-300">Mon-Fri: 9AM-6PM</p>
              <p className="text-gray-600 dark:text-gray-300">Sat-Sun: 10AM-4PM</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amazon-orange to-orange-600 rounded-lg p-8 text-center text-white"
        >
          <Users className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Join Our Community</h3>
          <p className="mb-6 opacity-90">
            Become part of our growing family of satisfied customers. Follow us for the latest updates,
            exclusive deals, and behind-the-scenes content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-amazon-orange px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Start Shopping
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-amazon-orange transition">
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}