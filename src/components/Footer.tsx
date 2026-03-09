import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
  services: [
    { label: 'Строительство коттеджей', href: '#services' },
    { label: 'Ремонт квартир', href: '#services' },
    { label: 'Дизайн интерьера', href: '#services' },
    { label: 'Коммерческие объекты', href: '#services' },
    { label: 'Капитальный ремонт', href: '#services' },
  ],
  company: [
    { label: 'О нас', href: '#about' },
    { label: 'Портфолио', href: '#portfolio' },
    { label: 'Отзывы', href: '#testimonials' },
    { label: 'Контакты', href: '#contact' },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                <span className="text-[#0F0F0F] font-bold text-xl font-['Montserrat']">АСБ</span>
              </div>
              <div>
                <span className="text-white font-bold text-xl font-['Montserrat']">РУМ ПРО</span>
                <p className="text-[#707070] text-xs uppercase tracking-wider">Строительная компания</p>
              </div>
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Строительная компания полного цикла. Возводим объекты любой сложности 
              с 2016 года. Работаем по всей России.
            </p>
            <div className="space-y-3">
              <a href="tel:+79001234567" className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+7 (900) 123-45-67</span>
              </a>
              <a href="mailto:info@asbrumpro.ru" className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@asbrumpro.ru</span>
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Уфа, ул. Строителей, 15</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Услуги</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Компания</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Начать проект</h4>
            <p className="text-white/60 text-sm mb-6">
              Готовы обсудить ваш проект? Оставьте заявку и мы свяжемся с вами в ближайшее время.
            </p>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
              className="btn-primary w-full justify-center text-sm"
            >
              Оставить заявку
            </a>

            {/* Social Links */}
            <div className="mt-8">
              <h5 className="text-white/50 text-xs uppercase tracking-wider mb-4">Мы в соцсетях</h5>
              <div className="flex gap-3">
                {['VK', 'TG', 'YT'].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 bg-[#1A1A1A] hover:bg-primary rounded-lg flex items-center justify-center text-white hover:text-[#0F0F0F] text-xs font-bold transition-all duration-300"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center sm:text-left">
            © 2024 АСБ РУМ ПРО. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
              Политика конфиденциальности
            </a>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              className="w-10 h-10 bg-[#1A1A1A] hover:bg-primary rounded-lg flex items-center justify-center text-white hover:text-[#0F0F0F] transition-all duration-300"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
