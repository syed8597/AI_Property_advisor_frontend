import { Link } from 'react-router-dom';
import { 
  Building2, 
  TrendingUp, 
  Shield, 
  Target, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Star,
  Search,
  MapPin,
  Home,
  DollarSign
} from 'lucide-react';
import { useState } from 'react';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Building2 className="h-12 w-12 text-white" />,
      title: 'Smart Property Discovery',
      description: 'AI-powered recommendations based on your budget, location preferences, and investment goals.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-white" />,
      title: 'Investment Scoring',
      description: 'Advanced ML models evaluate ROI, legal clarity, growth potential, and market demand.',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: <Shield className="h-12 w-12 text-white" />,
      title: 'Risk Alerts',
      description: 'Real-time warnings about overpriced properties, legal disputes, and liquidity risks.',
      gradient: 'from-red-500 to-red-600'
    },
    {
      icon: <Target className="h-12 w-12 text-white" />,
      title: 'Portfolio Tracker',
      description: 'Monitor your properties, track valuations, and receive AI-driven hold/sell recommendations.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-white" />,
      title: 'Market Analytics',
      description: 'Interactive heatmaps showing demand trends, price movements, and regional insights.',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: <Users className="h-12 w-12 text-white" />,
      title: 'Expert Advisors',
      description: 'Connect with professional advisors who provide personalized investment strategies.',
      gradient: 'from-indigo-500 to-indigo-600'
    },
  ];

  const stats = [
    { label: 'Properties Listed', value: '10,000+', icon: <Home className="h-6 w-6" /> },
    { label: 'Active Investors', value: '5,000+', icon: <Users className="h-6 w-6" /> },
    { label: 'Investment Value', value: '$500M+', icon: <DollarSign className="h-6 w-6" /> },
    { label: 'Success Rate', value: '94%', icon: <TrendingUp className="h-6 w-6" /> },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Real Estate Investor',
      image: 'SJ',
      content: 'This platform helped me identify high-ROI properties I would have missed. The AI scoring is incredibly accurate!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Property Advisor',
      image: 'MC',
      content: 'Managing my clients has never been easier. The analytics dashboard gives me all the insights I need.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'First-time Investor',
      image: 'ER',
      content: 'As a beginner, the risk alerts and recommendations gave me confidence to make my first investment.',
      rating: 5,
    },
  ];

  const properties = [
    {
      title: 'Luxury Apartment Downtown',
      location: 'Manhattan, NY',
      price: '$1.2M',
      type: 'Residential',
      roi: '12.5%',
      image: '🏙️'
    },
    {
      title: 'Commercial Space',
      location: 'Financial District',
      price: '$2.8M',
      type: 'Commercial',
      roi: '15.2%',
      image: '🏢'
    },
    {
      title: 'Suburban Villa',
      location: 'Brooklyn Heights',
      price: '$850K',
      type: 'Residential',
      roi: '9.8%',
      image: '🏡'
    },
    {
      title: 'Tech Park Office',
      location: 'Silicon Valley',
      price: '$3.5M',
      type: 'Commercial',
      roi: '18.3%',
      image: '💼'
    },
    {
      title: 'Waterfront Property',
      location: 'Miami Beach',
      price: '$4.2M',
      type: 'Luxury',
      roi: '14.7%',
      image: '🌊'
    },
    {
      title: 'Student Housing',
      location: 'Boston, MA',
      price: '$950K',
      type: 'Investment',
      roi: '11.2%',
      image: '🎓'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Navigation Header */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PropertyAI
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Features
              </a>
              <a href="#properties" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Properties
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                How It Works
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Testimonials
              </a>
              <Link 
                to="/auth/login" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link 
                to="/auth/register" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
              <div className="flex flex-col space-y-4">
                <a 
                  href="#features" 
                  className="text-gray-700 hover:text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#properties" 
                  className="text-gray-700 hover:text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Properties
                </a>
                <a 
                  href="#how-it-works" 
                  className="text-gray-700 hover:text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How It Works
                </a>
                <a 
                  href="#testimonials" 
                  className="text-gray-700 hover:text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </a>
                <Link 
                  to="/auth/login" 
                  className="text-gray-700 hover:text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/auth/register" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Smart Property
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Investment </span>
              Made Simple
            </h1>
            <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Discover high-ROI properties, analyze investment risks, and build a winning portfolio with our AI-powered platform trusted by thousands of investors.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="flex flex-col lg:flex-row gap-4 items-end">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Location Input */}
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter location..."
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    {/* Property Type Filter */}
                    <div className="relative">
                      <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option>Property Type</option>
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Industrial</option>
                        <option>Land</option>
                      </select>
                    </div>
                    
                    {/* Price Range Filter */}
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option>Price Range</option>
                        <option>Under 50 Lac</option>
                        <option>50 Lac - 1 Cr</option>
                        <option>1 Cr - 5 Cr</option>
                        <option>5 Cr+</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Search Button */}
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-12 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3">
                    <Search className="h-5 w-5" />
                    Search Properties
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                  <div className="text-white mb-3 flex justify-center">
                    <div className="p-3 bg-white/10 rounded-xl">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-blue-200 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked investment opportunities with verified ROI potential and comprehensive analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-6xl">
                  {property.image}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {property.title}
                    </h3>
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                      ROI: {property.roi}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {property.location}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">{property.price}</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {property.type}
                    </span>
                  </div>
                  <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Why Choose PropertyAI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful AI-driven tools that transform how you discover, analyze, and manage property investments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300"></div>
                <div className="relative p-8 h-full">
                  <div className={`bg-gradient-to-r ${feature.gradient} rounded-2xl p-4 w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Start Investing in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              Get from zero to your first investment in less than 30 minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[1, 2, 3].map((step) => (
              <div key={step} className="text-center group">
                <div className="relative mb-8">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-3xl font-bold text-white">{step}</span>
                  </div>
                  <div className="absolute top-12 left-1/2 transform translate-x-12 w-24 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 hidden md:block"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {step === 1 && 'Create Your Profile'}
                  {step === 2 && 'Get AI Recommendations'}
                  {step === 3 && 'Invest with Confidence'}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {step === 1 && 'Sign up and tell us about your investment goals, budget, and preferred locations. Our AI gets to know you in minutes.'}
                  {step === 2 && 'Our AI analyzes thousands of properties and recommends the best matches tailored specifically to your criteria.'}
                  {step === 3 && 'Review detailed analytics, risk assessments, and make informed investment decisions with expert guidance.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Transform Your Property Investment Strategy?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join thousands of investors who are already making smarter decisions with AI-powered insights and growing their portfolios.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/auth/register" 
              className="inline-flex items-center justify-center bg-white text-gray-900 px-12 py-5 rounded-2xl text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              Start Free Trial
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
            <Link 
              to="/auth/login" 
              className="inline-flex items-center justify-center border-2 border-white text-white px-12 py-5 rounded-2xl text-lg font-bold hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Sign In to Account
            </Link>
          </div>
          <p className="text-blue-200 mt-8 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold">PropertyAI</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Making property investment smarter, safer, and more profitable with cutting-edge AI technology and expert insights.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#properties" className="hover:text-white transition-colors">Properties</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PropertyAI. All rights reserved. Making property investment accessible to everyone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;