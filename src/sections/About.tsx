import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, Building, CheckCircle, Target, Shield } from 'lucide-react';
import { useStatsStore } from '@/store';

const advantages = [
  {
    icon: Award,
    title: 'Опыт и экспертиза',
    description: '8 лет успешной работы в строительстве. Реализовали более 247 проектов различной сложности.',
  },
  {
    icon: Users,
    title: 'Профессиональная команда',
    description: '45 квалифицированных специалистов: архитекторы, инженеры, прорабы, мастера отделки.',
  },
  {
    icon: Building,
    title: 'Полный цикл работ',
    description: 'От проектирования до сдачи объекта. Все этапы строительства под одной крышей.',
  },
  {
    icon: CheckCircle,
    title: 'Гарантия качества',
    description: 'Даем гарантию до 5 лет на все виды работ. Строгий контроль на каждом этапе.',
  },
  {
    icon: Target,
    title: 'Точность в сроках',
    description: 'Соблюдаем установленные сроки. Прозрачное планирование и отчетность.',
  },
  {
    icon: Shield,
    title: 'Прозрачные цены',
    description: 'Фиксированная стоимость в договоре. Никаких скрытых платежей и доплат.',
  },
];

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-['Oswald'] font-bold">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const { stats } = useStatsStore();

  return (
    <section id="about" className="section-padding bg-[#0F0F0F] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm uppercase tracking-wider mb-6">
              О компании
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-['Montserrat']">
              АСБ РУМ ПРО — <span className="text-gradient">надежный партнер</span> в строительстве
            </h2>
            
            <div className="space-y-4 text-white/70 leading-relaxed mb-8">
              <p>
                Мы — строительная компания полного цикла, специализирующаяся на возведении 
                жилых и коммерческих объектов, а также на выполнении отделочных работ любой 
                сложности.
              </p>
              <p>
                Наша команда имеет успешный опыт работы с частными клиентами, 
                девелоперами и государственными организациями. Мы участвуем в тендерах, 
                выполняем проекты под ключ и гарантируем высокое качество на каждом этапе.
              </p>
              <p>
                Работаем по всей России: Уфа, Москва, Казань и другие города. 
                География наших проектов постоянно расширяется.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl text-primary mb-1">
                  <AnimatedCounter value={stats.projectsCompleted} />
                </div>
                <p className="text-white/50 text-sm uppercase tracking-wider">Проектов</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl text-primary mb-1">
                  <AnimatedCounter value={stats.yearsExperience} />
                </div>
                <p className="text-white/50 text-sm uppercase tracking-wider">Лет опыта</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl text-primary mb-1">
                  <AnimatedCounter value={stats.teamMembers} />
                </div>
                <p className="text-white/50 text-sm uppercase tracking-wider">Специалистов</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl text-primary mb-1">
                  <AnimatedCounter value={stats.happyClients} />
                </div>
                <p className="text-white/50 text-sm uppercase tracking-wider">Клиентов</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Advantages Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group bg-[#1A1A1A] rounded-xl p-6 border border-transparent hover:border-primary/30 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <advantage.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {advantage.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-['Montserrat']">
              Готовы начать свой проект?
            </h3>
            <p className="text-white/60 mb-6 max-w-2xl mx-auto">
              Свяжитесь с нами для бесплатной консультации. Мы обсудим ваши задачи 
              и предложим оптимальное решение.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary inline-flex"
            >
              Получить консультацию
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
