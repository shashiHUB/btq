import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, MapPin, Phone, Mail, Instagram, Scissors, MessageCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { Carousel } from './components/Carousel';
import { Dropdown } from './components/Dropdown';
import { services } from './site-data/services';
import { portfolio } from './site-data/portfolio';
import { navigationItems } from './site-data/navigation';
import { contactInfo } from './site-data/contact';
import slideshowImages from './site-data/images';
import 'swiper/css';
import 'swiper/css/navigation';

interface YouTubeEmbedProps {
  videoId: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => {
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

function App() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<keyof typeof portfolio>('beauty');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('bridal');
  
  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: ''
  });

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false); // Close the menu when clicking outside
      }
    }

    // Only add the event listener if the menu is open
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isMenuOpen]); // Add isMenuOpen as a dependency

  const portfolioItems = portfolio[activeCategory]?.[activeSubCategory as keyof typeof portfolio[typeof activeCategory]];

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const errors = {
      name: '',
      email: ''
    };

    if (contactName.length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }

    if (!validateEmail(contactEmail)) {
      errors.email = 'Please enter a valid email address';
    }

    setFormErrors(errors);
    return !errors.name && !errors.email;
  };

  const isFormValid = contactName.length >= 2 && validateEmail(contactEmail);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBookAppointment = () => {
    navigate('/book-appointment');
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${contactInfo.whatsapp}`, '_blank');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const message = encodeURIComponent(
        `Dear Representative,\n` +
        `Customer Name: ${contactName}\n` +
        `Customer Email: ${contactEmail}\n` +
        `Customer Message: ${contactMessage}\n\n` +
        `Please respond to this message. Thank you!`
      );

      window.open(`https://wa.me/919148717456?text=${message}`, '_blank');
      
      // Reset form
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setFormErrors({ name: '', email: '' });
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-secondary/95 backdrop-blur-sm">
        <div className="container py-4">
          <nav className="flex items-center justify-between" ref={menuRef}>
            <div className="flex items-center gap-2">
              <Scissors className="h-8 w-8 text-primary" />
              <span className="text-2xl font-serif font-bold text-primary">Usha</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Dropdown 
                label="Services" 
                items={[
                  ...navigationItems.services,
                  {
                    label: "Tailoring",
                    onClick: () => {
                      setActiveCategory('tailoring');
                      setActiveSubCategory('wedding'); // Set wedding as default subcategory
                      scrollToSection('portfolio');
                    }
                  }
                ]}
              />
              <Dropdown 
                label="Portfolio" 
                items={navigationItems.portfolio}
              />
              <a href="#about" className="px-4 py-2 text-gray-300 hover:text-primary transition-colors duration-200">
                About
              </a>
              <a href="#contact" className="px-4 py-2 text-gray-300 hover:text-primary transition-colors duration-200">
                Contact
              </a>
              <button 
                className="btn btn-primary"
                onClick={handleBookAppointment}
              >
                Book Appointment
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:hidden absolute top-full left-0 right-0 bg-secondary/95 backdrop-blur-sm"
              >
                <div className="space-y-4">
                  <Dropdown 
                    label="Services" 
                    items={navigationItems.services}
                  />
                  <Dropdown 
                    label="Portfolio" 
                    items={navigationItems.portfolio}
                  />
                  <a href="#about" className="block px-4 py-2 text-gray-300 hover:text-primary transition-colors duration-200">
                    About
                  </a>
                  <a href="#contact" className="block px-4 py-2 text-gray-300 hover:text-primary transition-colors duration-200">
                    Contact
                  </a>
                  <button 
                    className="btn btn-primary w-full"
                    onClick={handleBookAppointment}
                  >
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000 }}
        >
          <SwiperSlide>
            <div 
              className="h-[80vh] bg-cover bg-center relative"
              style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&q=80")'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary/40"></div>
              <div className="container h-full flex items-center relative z-10">
                <div className="max-w-2xl">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
                  >
                    Beauty & Style
                    <span className="text-primary"> Redefined</span>
                  </motion.h1>
                  <p className="text-lg text-gray-200 mb-8">
                    Experience luxury beauty treatments and bespoke tailoring services
                  </p>
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => scrollToSection('beauty-services')}
                      className="btn btn-primary"
                    >
                      Beauty Services
                    </button>
                    <button 
                      onClick={() => scrollToSection('tailoring-services')}
                      className="btn btn-outline"
                    >
                      Tailoring
                    </button>
                    <button 
                      onClick={() => scrollToSection('portfolio')}
                      className="btn btn-outline"
                    >
                      Picture Gallery
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Featured Gallery Section */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <h2 className="section-title text-center mb-12">Featured Gallery</h2>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{ 
              delay: 5000,
              disableOnInteraction: false
            }}
            className="rounded-lg overflow-hidden"
          >
            {slideshowImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-[600px]">
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent">
                    <div className="absolute bottom-8 left-8">
                      <h3 className="text-2xl font-serif text-white mb-2">
                        {image.caption}
                      </h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-secondary-light">
        <div className="container">
          <h2 className="section-title text-center">Our Services</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Beauty Services */}
            <div id="beauty-services" className="bg-secondary p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-primary mb-6">Beauty Services</h3>
              <div className="space-y-4">
                {services.beauty.map((service, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border border-gray-700 rounded hover:border-primary/50 transition-colors">
                    <div>
                      <h4 className="font-medium text-white">{service.name}</h4>
                      <p className="text-sm text-gray-400">{service.duration}</p>
                    </div>
                    <p className="text-primary font-medium">{service.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tailoring Services */}
            <div id="tailoring-services" className="bg-secondary p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-primary mb-6">Tailoring Services</h3>
              <div className="space-y-4">
                {services.tailoring.map((service, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border border-gray-700 rounded hover:border-primary/50 transition-colors">
                    <div>
                      <h4 className="font-medium text-white">{service.name}</h4>
                      <p className="text-sm text-gray-400">{service.duration}</p>
                    </div>
                    <p className="text-primary font-medium">{service.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16">
        <div className="container">
          <h2 className="section-title text-center mb-12">Our Portfolio</h2>
          
          <div className="flex justify-center space-x-4 mb-8">
            <button 
              className={`px-4 py-2 rounded-full transition-colors ${activeCategory === 'beauty' ? 'bg-primary text-white' : 'text-gray-400 hover:text-primary'}`}
              onClick={() => {
                setActiveCategory('beauty');
                setActiveSubCategory('bridal');
              }}
            >
              Beauty
            </button>
            <button 
              className={`px-4 py-2 rounded-full transition-colors ${activeCategory === 'tailoring' ? 'bg-primary text-white' : 'text-gray-400 hover:text-primary'}`}
              onClick={() => {
                setActiveCategory('tailoring');
                setActiveSubCategory('wedding'); // Set default subcategory
              }}
            >
              Tailoring
            </button>
          </div>

          <div id="beauty-portfolio" className={`${activeCategory === 'beauty' ? 'block' : 'hidden'}`}>
            <div className="flex justify-center space-x-4 mb-12">
              {Object.keys(portfolio.beauty).map((subCategory) => (
                <button
                  key={subCategory}
                  className={`px-4 py-2 rounded-full transition-colors ${activeSubCategory === subCategory ? 'bg-secondary-light text-primary' : 'text-gray-400 hover:text-primary'}`}
                  onClick={() => setActiveSubCategory(subCategory)}
                >
                  {subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}
                </button>
              ))}
            </div>
            {portfolioItems && activeCategory === 'beauty' && (
              <div className="mb-12">
                <Carousel items={portfolioItems} />
              </div>
            )}
          </div>

          <div id="tailoring-portfolio" className={`${activeCategory === 'tailoring' ? 'block' : 'hidden'}`}>
            <div className="flex justify-center space-x-4 mb-12">
              {Object.keys(portfolio.tailoring).map((subCategory) => (
                <button
                  key={subCategory}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    activeSubCategory === subCategory ? 'bg-secondary-light text-primary' : 'text-gray-400 hover:text-primary'
                  }`}
                  onClick={() => setActiveSubCategory(subCategory)}
                >
                  {subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}
                </button>
              ))}
            </div>
            {portfolioItems && activeCategory === 'tailoring' && (
              <div className="mb-12">
                <Carousel items={portfolioItems} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">About Usha Boutique</h2>
              <div className="space-y-4 text-gray-300">
                <div className="space-y-2">
                  <h3 className="text-xl font-serif text-primary">Usha Rani</h3>
                  <p className="text-lg">Makeup Artist</p>
                  <p>Certificated MUA</p>
                  <p>Rental bridal jewelry available</p>
                </div>
                <p>
                  With years of expertise in both beauty treatments and
                  tailoring, we ensure that every client leaves feeling confident and beautiful.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-secondary-light rounded shadow-lg">
                  <h4 className="text-primary font-medium mb-2">Experience</h4>
                  <p className="text-2xl font-bold">10+ Years</p>
                </div>
                <div className="p-4 bg-secondary-light rounded shadow-lg">
                  <h4 className="text-primary font-medium mb-2">Happy Clients</h4>
                  <p className="text-2xl font-bold">5000+</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <YouTubeEmbed videoId="EnulhZuwz04" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent rounded-lg pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-secondary-light">
        <div className="container">
          <h2 className="section-title text-center">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name <span className="text-primary">*</span>
                  </label>
                  <input 
                    type="text"
                    value={contactName}
                    onChange={(e) => {
                      setContactName(e.target.value);
                      if (formErrors.name) {
                        setFormErrors(prev => ({ ...prev, name: '' }));
                      }
                    }}
                    className={`w-full px-4 py-2 bg-secondary border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white ${
                      formErrors.name ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Enter your name (min. 2 characters)"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input 
                    type="email"
                    value={contactEmail}
                    onChange={(e) => {
                      setContactEmail(e.target.value);
                      if (formErrors.email) {
                        setFormErrors(prev => ({ ...prev, email: '' }));
                      }
                    }}
                    className={`w-full px-4 py-2 bg-secondary border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white ${
                      formErrors.email ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {formErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea 
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-4 py-2 bg-secondary border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white"
                    placeholder="Your message (optional)"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className={`btn w-full ${
                    isFormValid 
                    ? 'btn-primary hover:bg-primary/90 transition-colors' 
                    : 'btn-primary opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!isFormValid}
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-serif font-bold text-primary mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-300">
                  <p>Monday - Friday: {contactInfo.businessHours.weekdays}</p>
                  <p>Saturday: {contactInfo.businessHours.saturday}</p>
                  <p>Sunday: {contactInfo.businessHours.sunday}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-primary mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <MapPin className="text-primary" size={20} />
                    <p>{contactInfo.address}</p>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Phone className="text-primary" size={20} />
                    <p>{contactInfo.phone}</p>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Mail className="text-primary" size={20} />
                    <p>{contactInfo.email}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-primary mb-4">Follow Us</h3>
                <div className="flex flex-col space-y-4">
                  <a 
                    href={contactInfo.social.instagram.makeover} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors group"
                  >
                    <Instagram size={24} className="group-hover:scale-110 transition-transform" />
                    <span>Usha Makeover</span>
                  </a>
                  <a 
                    href={contactInfo.social.instagram.boutique} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors group"
                  >
                    <Instagram size={24} className="group-hover:scale-110 transition-transform" />
                    <span>Usha Boutique</span>
                  </a>
                  <button
                    onClick={handleWhatsAppClick}
                    className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors group"
                  >
                    <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 Usha Boutique. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

