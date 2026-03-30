import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
  Sparkles
} from "lucide-react";

export default function About() {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { icon: Users, label: 'Happy Customers', value: '500K+', color: 'text-red-600' },
    { icon: ShoppingBag, label: 'Outfits Curated', value: '2M+', color: 'text-white' },
    { icon: Globe, label: 'Countries Served', value: '30+', color: 'text-red-600' },
    { icon: Award, label: 'AI Recommendations', value: '10M+', color: 'text-white' }
  ];

  const values = [
    {
      icon: Target,
      title: 'AI-Powered Precision',
      description: 'Our intelligent algorithms analyze thousands of combinations to recommend perfect outfits tailored to your occasion, style, and preferences.'
    },
    {
      icon: Heart,
      title: 'Personalized Experience',
      description: 'Every recommendation is uniquely yours. We consider your body type, style preferences, and occasion to deliver curated looks that make you shine.'
    },
    {
      icon: Sparkles,
      title: 'Smart Innovation',
      description: 'Leveraging cutting-edge AI technology to revolutionize how you discover fashion. No more endless scrolling – just instant, intelligent recommendations.'
    },
    {
      icon: Shield,
      title: 'Quality & Trust',
      description: 'Every piece in our collection undergoes rigorous quality checks. We partner only with premium brands that share our commitment to excellence.'
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
          <h1 className="text-5xl font-bold mb-6 dark:text-white">About AL FIRDOUS LUXE</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're not just a fashion website – we're a smart fashion recommendation platform powered by AI. 
            Discover your perfect outfit for every occasion with intelligent style matching technology.
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
                <Target className="w-16 h-16 text-red-600 mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-6 dark:text-white">Our Mission</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  To revolutionize fashion shopping through artificial intelligence. We believe finding the perfect outfit 
                  shouldn't be overwhelming – it should be instant, intuitive, and enjoyable.
                  <br /><br />
                  Our AI-powered platform analyzes your preferences, occasion, body type, and current trends to deliver 
                  personalized outfit recommendations in seconds. No more endless scrolling or decision fatigue. Just 
                  curated looks that make you look and feel your absolute best.
                  <br /><br />
                  We're building the future of fashion retail – where technology meets style, where every recommendation 
                  is tailored, and where everyone has access to personal styling that was once reserved for the elite.
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
                        Founded in 2024 by visionary entrepreneurs who saw a gap in the fashion industry – too many choices, 
                        not enough personalization. We realized that traditional online shopping was broken: endless scrolling, 
                        generic recommendations, and decision paralysis.
                      </p>
                      <p>
                        So we built AL FIRDOUS LUXE from the ground up as a technology company first, fashion retailer second. 
                        Our team of AI experts, data scientists, and fashion stylists worked together to create an intelligent 
                        recommendation engine that understands style, occasion, and individual preferences.
                      </p>
                      <p>
                        Today, our platform serves hundreds of thousands of customers worldwide, offering AI-curated outfits 
                        for weddings, parties, casual occasions, and more. Our commitment to innovation and personalized 
                        experience has made us the go-to smart fashion platform for those who value both style and time.
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="/images/slide-1.png"
                      alt="Our office"
                      className="rounded-lg shadow-lg w-full h-96 object-cover"
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
                      <value.icon className="w-12 h-12 text-red-600 mb-4" />
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
                      <p className="text-red-600 font-medium mb-3">{member.role}</p>
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
              <Mail className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h4 className="font-bold mb-2 dark:text-white">Email Us</h4>
              <p className="text-gray-600 dark:text-gray-300">support@alfirdousluxe.com</p>
              <p className="text-gray-600 dark:text-gray-300">styling@alfirdousluxe.com</p>
            </div>
            <div className="text-center">
              <Phone className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h4 className="font-bold mb-2 dark:text-white">Call Us</h4>
              <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
              <p className="text-gray-600 dark:text-gray-300">Mon-Fri 9AM-6PM EST</p>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h4 className="font-bold mb-2 dark:text-white">Visit Us</h4>
              <p className="text-gray-600 dark:text-gray-300">Fashion Tech Hub</p>
              <p className="text-gray-600 dark:text-gray-300">New York, NY 10001</p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h4 className="font-bold mb-2 dark:text-white">Business Hours</h4>
              <p className="text-gray-600 dark:text-gray-300">Mon-Fri: 9AM-6PM EST</p>
              <p className="text-gray-600 dark:text-gray-300">Sat: 10AM-4PM EST</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-8 text-center text-white"
        >
          <Users className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Experience Smart Fashion</h3>
          <p className="mb-6 opacity-90">
            Try our AI-powered occasion selector and discover outfits perfectly matched to your style. 
            Join thousands who've transformed how they shop for fashion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Try Occasion Selector
            </Link>
            <Link to="/about" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-red-600 transition">
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}