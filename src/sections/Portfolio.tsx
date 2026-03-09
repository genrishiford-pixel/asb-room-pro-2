import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePortfolioStore } from '@/store';
import type { PortfolioItem } from '@/types';

const categories = [
  { id: 'all', label: 'Все проекты' },
  { id: 'residential', label: 'Жилые' },
  { id: 'commercial', label: 'Коммерческие' },
  { id: 'architecture', label: 'Архитектура' },
  { id: 'repair', label: 'Ремонт' },
];

const categoryLabels: Record<string, string> = {
  residential: 'Жилой объект',
  commercial: 'Коммерческий',
  architecture: 'Архитектура',
  repair: 'Ремонт',
};

export default function Portfolio() {
  const { items } = usePortfolioStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter((item) => item.category === activeCategory);

  const nextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => 
        prev === selectedItem.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedItem.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="portfolio" className="section-padding bg-[#0F0F0F] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm uppercase tracking-wider mb-6">
            Портфолио
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-['Montserrat']">
            Наши <span className="text-gradient">выполненные проекты</span>
          </h2>
          <p className="text-white/60 text-lg">
            Ознакомьтесь с нашими работами — от небольших квартир до масштабных коммерческих объектов
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-[#0F0F0F]'
                  : 'bg-[#1A1A1A] text-white/60 hover:text-white hover:bg-[#252525]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-xl cursor-pointer bg-[#1A1A1A]"
                onClick={() => {
                  setSelectedItem(item);
                  setCurrentImageIndex(0);
                }}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs uppercase tracking-wider rounded-full mb-3">
                    {categoryLabels[item.category]}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <div className="flex items-center gap-4 text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </span>
                    )}
                    {item.year && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {item.year}
                      </span>
                    )}
                  </div>
                </div>

                {/* View Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Maximize2 className="w-5 h-5 text-primary" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-white/50 text-lg">В этой категории пока нет проектов</p>
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1A1A1A] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Gallery */}
              <div className="relative aspect-video">
                <img
                  src={selectedItem.images[currentImageIndex]}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {selectedItem.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedItem.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            idx === currentImageIndex ? 'bg-primary' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs uppercase tracking-wider rounded-full mb-3">
                      {categoryLabels[selectedItem.category]}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">{selectedItem.title}</h3>
                  </div>
                </div>

                <p className="text-white/70 mb-6 leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Project Details */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {selectedItem.location && (
                    <div className="bg-[#252525] rounded-lg p-4">
                      <span className="text-white/50 text-sm block mb-1">Локация</span>
                      <span className="text-white font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {selectedItem.location}
                      </span>
                    </div>
                  )}
                  {selectedItem.year && (
                    <div className="bg-[#252525] rounded-lg p-4">
                      <span className="text-white/50 text-sm block mb-1">Год</span>
                      <span className="text-white font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        {selectedItem.year}
                      </span>
                    </div>
                  )}
                  {selectedItem.area && (
                    <div className="bg-[#252525] rounded-lg p-4">
                      <span className="text-white/50 text-sm block mb-1">Площадь</span>
                      <span className="text-white font-medium">{selectedItem.area}</span>
                    </div>
                  )}
                  {selectedItem.client && (
                    <div className="bg-[#252525] rounded-lg p-4">
                      <span className="text-white/50 text-sm block mb-1">Заказчик</span>
                      <span className="text-white font-medium">{selectedItem.client}</span>
                    </div>
                  )}
                </div>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedItem(null);
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary w-full sm:w-auto justify-center"
                >
                  Обсудить похожий проект
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
