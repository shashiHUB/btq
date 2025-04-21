import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { galleryImages, type GalleryImage } from '../site-data/gallery';

// Get unique categories from gallery images
const categories = [...new Set(galleryImages.map(img => img.category))];
const defaultCategory = categories[0];

export function PictureGallery() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'boutique' | 'tailoring'>(defaultCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastImageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const filtered = galleryImages
      .filter(img => img.category === activeTab)
      .filter(img => 
        img.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.url.toLowerCase().includes(searchQuery.toLowerCase())
      );
    setFilteredImages(filtered);
  }, [activeTab, searchQuery]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observerRef.current?.unobserve(img);
            }
          }
        });
      },
      { rootMargin: '50px' }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      setActiveTab('tailoring');
    } else if (e.key === 'ArrowLeft') {
      setActiveTab('boutique');
    }
  };

  return (
    <div 
      className="min-h-screen bg-secondary pt-20 pb-12"
      onKeyDown={handleKeyNavigation}
      tabIndex={0}
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gallery..."
              className="pl-10 pr-4 py-2 bg-secondary-light rounded-full text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
              >
                <X size={16} />
              </button>
            ) : (
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            )}
          </div>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-serif font-bold text-white mb-12 text-center"
        >
          Welcome to Our <span className="text-primary">Gallery</span>
        </motion.h1>

        <div className="flex justify-center space-x-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === category ? 'bg-primary text-white' : 'text-gray-400 hover:text-primary'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.url}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-[2/3] rounded-lg overflow-hidden group cursor-pointer"
                ref={index === filteredImages.length - 1 ? lastImageRef : null}
              >
                <ImageWithFallback
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-medium text-lg">{image.alt}</h3>
                    {searchQuery && image.alt.toLowerCase().includes(searchQuery.toLowerCase()) && (
                      <p className="text-primary text-sm mt-1">Matching search: "{searchQuery}"</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredImages.length === 0 && (
          <div className="text-center text-gray-400 mt-12">
            <p className="text-xl">No images found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}