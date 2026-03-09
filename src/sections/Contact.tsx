import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  MessageSquare,
  Building2
} from 'lucide-react';
import { useInquiriesStore, useServicesStore } from '@/store';
import type { ContactFormData } from '@/types';

const contactInfo = [
  {
    icon: Phone,
    title: 'Телефон',
    content: '+7 (900) 123-45-67',
    href: 'tel:+79001234567',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@asbrumpro.ru',
    href: 'mailto:info@asbrumpro.ru',
  },
  {
    icon: MapPin,
    title: 'Адрес',
    content: 'Уфа, ул. Строителей, 15',
    href: '#',
  },
  {
    icon: Clock,
    title: 'Режим работы',
    content: 'Пн-Пт: 9:00 - 18:00',
    href: '#',
  },
];

export default function Contact() {
  const { addInquiry } = useInquiriesStore();
  const { services } = useServicesStore();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
    service: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      addInquiry(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
        service: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="section-padding bg-[#0F0F0F] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary/5 to-transparent pointer-events-none" />

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
            Контакты
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-['Montserrat']">
            Свяжитесь <span className="text-gradient">с нами</span>
          </h2>
          <p className="text-white/60 text-lg">
            Оставьте заявку, и мы свяжемся с вами в ближайшее время для обсуждения вашего проекта
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-white/5">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-primary" />
                Оставить заявку
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Спасибо за заявку!</h4>
                  <p className="text-white/60">
                    Мы получили ваше сообщение и свяжемся с вами в ближайшее время.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/60 text-sm mb-2">
                        Ваше имя <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Иван Иванов"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-2">
                        Телефон <span className="text-primary">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+7 (___) ___-__-__"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@mail.ru"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Интересующая услуга</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Выберите услугу</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                      <option value="other">Другое</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Сообщение</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Опишите ваш проект или задайте вопрос..."
                      className="input-field resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Отправка...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Отправить заявку
                      </span>
                    )}
                  </button>

                  <p className="text-white/40 text-xs text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group bg-[#1A1A1A] rounded-xl p-6 border border-transparent hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-white/50 text-sm uppercase tracking-wider mb-1">
                    {item.title}
                  </h4>
                  <p className="text-white font-medium group-hover:text-primary transition-colors">
                    {item.content}
                  </p>
                </motion.a>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/5">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Наши офисы
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-[#252525] rounded-lg">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-1">Головной офис — Уфа</h5>
                    <p className="text-white/60 text-sm">ул. Строителей, 15, офис 301</p>
                    <p className="text-primary text-sm mt-1">+7 (347) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-[#252525] rounded-lg">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-1">Офис — Москва</h5>
                    <p className="text-white/60 text-sm">ул. Строительная, 42, офис 205</p>
                    <p className="text-primary text-sm mt-1">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-[#252525] rounded-lg">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-1">Офис — Казань</h5>
                    <p className="text-white/60 text-sm">ул. Профсоюзная, 28, офис 102</p>
                    <p className="text-primary text-sm mt-1">+7 (843) 123-45-67</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-6 border border-primary/20">
              <h4 className="text-white font-bold mb-4">Следите за нами</h4>
              <div className="flex gap-4">
                {['VK', 'TG', 'WA'].map((social) => (
                  <button
                    key={social}
                    className="w-12 h-12 bg-[#252525] hover:bg-primary rounded-lg flex items-center justify-center text-white hover:text-[#0F0F0F] font-bold transition-all duration-300"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
