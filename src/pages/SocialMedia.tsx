import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { contactInfo } from '../site-data/contact';
import { InstagramFeed } from '../components/InstagramFeed';

export function SocialMedia() {
  const navigate = useNavigate();

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${contactInfo.whatsapp}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-secondary pt-20 pb-12">
      <div className="container max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-serif font-bold text-white mb-12 text-center"
        >
          Connect With <span className="text-primary">Us</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-secondary-light p-8 rounded-lg shadow-lg mb-16"
        >
          <h2 className="text-2xl font-serif font-bold text-primary mb-6">Quick Connect</h2>
          <button
            onClick={handleWhatsAppClick}
            className="w-full flex items-center gap-4 text-gray-300 hover:text-primary transition-colors group"
          >
            <div className="p-4 bg-secondary rounded-full group-hover:scale-110 transition-transform">
              <MessageCircle size={32} />
            </div>
            <div className="text-left">
              <p className="font-medium">Chat with us on WhatsApp</p>
              <p className="text-sm text-gray-400">Quick responses during business hours</p>
            </div>
          </button>
        </motion.div>

        {/* Instagram Feeds Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-serif font-bold text-white mb-8 text-center">
            Latest from <span className="text-primary">Instagram</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InstagramFeed
              username="makeover_usharanihassan"
              title="Usha Makeover"
            />
            <InstagramFeed
              username="ushaboutique__hassan"
              title="Usha Boutique"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}