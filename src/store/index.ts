import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  Service, 
  PortfolioItem, 
  Testimonial, 
  ContactInquiry,
  ContactFormData,
  CompanyStats 
} from '@/types';

// Admin Store
interface AdminStore {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (username: string, password: string) => {
        if (username === 'admin' && password === 'asbrumpro2024') {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    { name: 'admin-storage' }
  )
);

// Services Store
interface ServicesStore {
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
}

const defaultServices: Service[] = [
  {
    id: '1',
    title: 'Строительство коттеджей',
    description: 'Полный цикл строительства загородных домов и коттеджей под ключ. От проектирования до сдачи объекта.',
    icon: 'Home',
    features: ['Индивидуальное проектирование', 'Фундамент любой сложности', 'Монолитное строительство', 'Кровельные работы'],
    category: 'construction',
  },
  {
    id: '2',
    title: 'Ремонт квартир под ключ',
    description: 'Качественный ремонт квартир любой сложности. Работаем с новостройками и вторичным жильем.',
    icon: 'Paintbrush',
    features: ['Дизайн-проект', 'Черновые работы', 'Чистовая отделка', 'Электрика и сантехника'],
    category: 'repair',
  },
  {
    id: '3',
    title: 'Дизайн интерьера',
    description: 'Разработка уникальных дизайн-проектов интерьеров для жилых и коммерческих помещений.',
    icon: 'Palette',
    features: ['3D-визуализация', 'Подбор материалов', 'Авторский надзор', 'Комплектация'],
    category: 'design',
  },
  {
    id: '4',
    title: 'Коммерческое строительство',
    description: 'Строительство и отделка офисов, магазинов, ресторанов и других коммерческих объектов.',
    icon: 'Building2',
    features: ['Офисные помещения', 'Торговые площади', 'Рестораны и кафе', 'Склады и производства'],
    category: 'commercial',
  },
  {
    id: '5',
    title: 'Капитальный ремонт',
    description: 'Полная реконструкция и капитальный ремонт зданий любой сложности.',
    icon: 'Hammer',
    features: ['Реконструкция', 'Усиление конструкций', 'Замена коммуникаций', 'Фасадные работы'],
    category: 'repair',
  },
  {
    id: '6',
    title: 'Участие в тендерах',
    description: 'Профессиональная подготовка документации и участие в строительных тендерах.',
    icon: 'FileText',
    features: ['Подготовка документации', 'Сметы и калькуляции', 'Технические задания', 'Юридическое сопровождение'],
    category: 'tender',
  },
];

export const useServicesStore = create<ServicesStore>()(
  persist(
    (set) => ({
      services: defaultServices,
      addService: (service) =>
        set((state) => ({
          services: [...state.services, { ...service, id: Date.now().toString() }],
        })),
      updateService: (id, updatedService) =>
        set((state) => ({
          services: state.services.map((s) =>
            s.id === id ? { ...s, ...updatedService } : s
          ),
        })),
      deleteService: (id) =>
        set((state) => ({
          services: state.services.filter((s) => s.id !== id),
        })),
    }),
    { name: 'services-storage' }
  )
);

// Portfolio Store
interface PortfolioStore {
  items: PortfolioItem[];
  addItem: (item: Omit<PortfolioItem, 'id'>) => void;
  updateItem: (id: string, item: Partial<PortfolioItem>) => void;
  deleteItem: (id: string) => void;
}

const defaultPortfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Жилой комплекс "Парковый"',
    description: 'Внутренняя отделка 120 квартир в многоэтажном доме бизнес-класса.',
    category: 'residential',
    images: ['/images/project-apartment.jpg'],
    year: 2024,
    area: '8500 м²',
    location: 'Уфа',
    client: 'СтройИнвест',
  },
  {
    id: '2',
    title: 'Коттедж в поселке "Зеленый"',
    description: 'Строительство и отделка двухэтажного коттеджа площадью 320 м².',
    category: 'architecture',
    images: ['/images/project-cottage.jpg'],
    year: 2024,
    area: '320 м²',
    location: 'Казань',
    client: 'Частный заказчик',
  },
  {
    id: '3',
    title: 'Бизнес-центр "Олимп"',
    description: 'Отделка офисных помещений в новом бизнес-центре класса А.',
    category: 'commercial',
    images: ['/images/project-office.jpg'],
    year: 2023,
    area: '4500 м²',
    location: 'Москва',
    client: 'Олимп Групп',
  },
  {
    id: '4',
    title: 'Ресторан "Вкус Востока"',
    description: 'Полная реконструкция и дизайнерская отделка ресторана.',
    category: 'commercial',
    images: ['/images/project-restaurant.jpg'],
    year: 2023,
    area: '450 м²',
    location: 'Уфа',
    client: 'Ресторанная группа',
  },
  {
    id: '5',
    title: 'Апартаменты в центре',
    description: 'Элитный ремонт апартаментов с авторским дизайном.',
    category: 'residential',
    images: ['/images/project-apartment.jpg'],
    year: 2024,
    area: '180 м²',
    location: 'Москва',
    client: 'Частный заказчик',
  },
  {
    id: '6',
    title: 'Торговый центр "Галерея"',
    description: 'Отделка торговых площадей и общих зон ТЦ.',
    category: 'commercial',
    images: ['/images/project-mall.jpg'],
    year: 2023,
    area: '12000 м²',
    location: 'Казань',
    client: 'ТЦ Галерея',
  },
];

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      items: defaultPortfolioItems,
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, { ...item, id: Date.now().toString() }],
        })),
      updateItem: (id, updatedItem) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, ...updatedItem } : i
          ),
        })),
      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
    }),
    { name: 'portfolio-storage' }
  )
);

// Testimonials Store
interface TestimonialsStore {
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Александр Петров',
    role: 'Владелец коттеджа',
    content: 'Отличная компания! Построили наш дом точно в срок и с отличным качеством. Все пожелания были учтены, работа выполнена на высшем уровне.',
    rating: 5,
    project: 'Коттедж 320 м²',
  },
  {
    id: '2',
    name: 'Мария Иванова',
    role: 'Директор ресторана',
    content: 'Реконструкция ресторана прошла безупречно. Дизайн превзошел все ожидания, посетители в восторге. Спасибо за профессионализм!',
    rating: 5,
    project: 'Ресторан "Вкус Востока"',
  },
  {
    id: '3',
    name: 'Сергей Козлов',
    role: 'Генеральный директор',
    content: 'Работаем с АСБ РУМ ПРО уже третий год. Всегда четкие сроки, прозрачное ценообразование и отличное качество работ.',
    rating: 5,
    project: 'Бизнес-центр "Олимп"',
  },
];

export const useTestimonialsStore = create<TestimonialsStore>()(
  persist(
    (set) => ({
      testimonials: defaultTestimonials,
      addTestimonial: (testimonial) =>
        set((state) => ({
          testimonials: [...state.testimonials, { ...testimonial, id: Date.now().toString() }],
        })),
      deleteTestimonial: (id) =>
        set((state) => ({
          testimonials: state.testimonials.filter((t) => t.id !== id),
        })),
    }),
    { name: 'testimonials-storage' }
  )
);

// Inquiries Store
interface InquiriesStore {
  inquiries: ContactInquiry[];
  addInquiry: (inquiry: ContactFormData) => void;
  markAsRead: (id: string) => void;
  deleteInquiry: (id: string) => void;
}

export const useInquiriesStore = create<InquiriesStore>()(
  persist(
    (set) => ({
      inquiries: [],
      addInquiry: (inquiryData) =>
        set((state) => ({
          inquiries: [
            {
              ...inquiryData,
              id: Date.now().toString(),
              date: new Date().toISOString(),
              read: false,
            },
            ...state.inquiries,
          ],
        })),
      markAsRead: (id) =>
        set((state) => ({
          inquiries: state.inquiries.map((i) =>
            i.id === id ? { ...i, read: true } : i
          ),
        })),
      deleteInquiry: (id) =>
        set((state) => ({
          inquiries: state.inquiries.filter((i) => i.id !== id),
        })),
    }),
    { name: 'inquiries-storage' }
  )
);

// Stats Store
interface StatsStore {
  stats: CompanyStats;
  updateStats: (stats: Partial<CompanyStats>) => void;
}

export const useStatsStore = create<StatsStore>()(
  persist(
    (set) => ({
      stats: {
        projectsCompleted: 247,
        yearsExperience: 8,
        teamMembers: 45,
        happyClients: 189,
      },
      updateStats: (newStats) =>
        set((state) => ({
          stats: { ...state.stats, ...newStats },
        })),
    }),
    { name: 'stats-storage' }
  )
);
