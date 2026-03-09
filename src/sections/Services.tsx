import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Paintbrush, 
  Building2, 
  Hammer, 
  FileText, 
  Ruler,
  ArrowRight,
  Check
} from 'lucide-react';
import { useServicesStore } from '@/store';
import type { Service } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  Home,
  Paintbrush,
  Building2,
  Hammer,
  FileText,
  Ruler,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export default function Services() {
  const { services } = useServicesStore();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="section-padding bg-[#0F0F0F] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm uppercase tracking-wider mb-6">
            Наши услуги
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-['Montserrat']">
            Полный спектр <span className="text-gradient">строительных услуг</span>
          </h2>
          <p className="text-white/60 text-lg">
            От проектирования до сдачи объекта — берем на себя все этапы строительства 
            и ремонта любой сложности
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Home;
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group relative bg-[#1A1A1A] rounded-xl p-8 border border-transparent hover:border-primary/50 transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/60 mb-6 line-clamp-2">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-white/50">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <div className="flex items-center gap-2 text-primary font-medium group/link">
                  <span className="text-sm uppercase tracking-wider">Подробнее</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-white/50 mb-4">
            Не нашли нужную услугу? Свяжитесь с нами для индивидуальной консультации
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary inline-flex"
          >
            Обсудить проект
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedService(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-[#1A1A1A] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                  {(() => {
                    const IconComponent = iconMap[selectedService.icon] || Home;
                    return <IconComponent className="w-7 h-7 text-primary" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedService.title}</h3>
                  <span className="text-primary text-sm uppercase tracking-wider">
                    {selectedService.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-white/70 mb-6 leading-relaxed">
              {selectedService.description}
            </p>

            <div className="mb-6">
              <h4 className="text-white font-semibold mb-4">Что входит в услугу:</h4>
              <ul className="grid sm:grid-cols-2 gap-3">
                {selectedService.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-white/60">
                    <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedService.price && (
              <div className="bg-primary/10 rounded-lg p-4 mb-6">
                <span className="text-white/60 text-sm">Стоимость от</span>
                <p className="text-2xl font-bold text-primary">{selectedService.price}</p>
              </div>
            )}

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setSelectedService(null);
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary w-full justify-center"
            >
              Заказать услугу
            </a>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
