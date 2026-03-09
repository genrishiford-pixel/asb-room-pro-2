import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  LayoutDashboard, 
  Briefcase, 
  Image, 
  MessageSquare, 
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Check,
  AlertCircle
} from 'lucide-react';
import { 
  useAdminStore, 
  useServicesStore, 
  usePortfolioStore, 
  useInquiriesStore,
  useTestimonialsStore 
} from '@/store';
import type { Service, PortfolioItem } from '@/types';

type AdminTab = 'dashboard' | 'services' | 'portfolio' | 'inquiries' | 'testimonials';

// Login Component
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAdminStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      onLogin();
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1A1A1A] rounded-2xl p-8 w-full max-w-md border border-white/10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <LayoutDashboard className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Админ-панель</h2>
          <p className="text-white/60">АСБ РУМ ПРО</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-white/60 text-sm mb-2">Логин</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-white/60 text-sm mb-2">Пароль</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full justify-center">
            Войти
          </button>
        </form>

        <p className="text-white/40 text-xs text-center mt-6">
          Демо: логин "admin", пароль "asbrumpro2024"
        </p>
      </motion.div>
    </motion.div>
  );
}

// Dashboard Tab
function DashboardTab() {
  const { inquiries } = useInquiriesStore();
  const { items: portfolioItems } = usePortfolioStore();
  const { services } = useServicesStore();
  const { testimonials } = useTestimonialsStore();

  const unreadInquiries = inquiries.filter((i) => !i.read).length;

  const stats = [
    { label: 'Всего заявок', value: inquiries.length, icon: MessageSquare },
    { label: 'Новых заявок', value: unreadInquiries, icon: AlertCircle, highlight: true },
    { label: 'Проектов', value: portfolioItems.length, icon: Image },
    { label: 'Услуг', value: services.length, icon: Briefcase },
    { label: 'Отзывов', value: testimonials.length, icon: MessageSquare },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Обзор</h2>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-[#1A1A1A] rounded-xl p-6 border ${
              stat.highlight ? 'border-primary/50' : 'border-white/5'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-6 h-6 ${stat.highlight ? 'text-primary' : 'text-white/40'}`} />
              {stat.highlight && unreadInquiries > 0 && (
                <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              )}
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-white/50 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-[#1A1A1A] rounded-xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-bold text-white">Последние заявки</h3>
        </div>
        <div className="divide-y divide-white/5">
          {inquiries.slice(0, 5).map((inquiry) => (
            <div
              key={inquiry.id}
              className={`p-4 flex items-center justify-between ${
                !inquiry.read ? 'bg-primary/5' : ''
              }`}
            >
              <div>
                <p className="text-white font-medium">{inquiry.name}</p>
                <p className="text-white/50 text-sm">{inquiry.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-white/40 text-sm">
                  {new Date(inquiry.date).toLocaleDateString('ru-RU')}
                </p>
                {!inquiry.read && <span className="text-primary text-xs">Новая</span>}
              </div>
            </div>
          ))}
          {inquiries.length === 0 && (
            <div className="p-8 text-center text-white/40">
              Пока нет заявок
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Services Tab
function ServicesTab() {
  const { services, addService, updateService, deleteService } = useServicesStore();
  const [isEditing, setIsEditing] = useState<Service | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const serviceData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      icon: formData.get('icon') as string,
      category: formData.get('category') as string,
      features: (formData.get('features') as string).split('\n').filter(Boolean),
    };

    if (isEditing) {
      updateService(isEditing.id, serviceData);
      setIsEditing(null);
    } else {
      addService(serviceData);
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Услуги</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="btn-primary text-sm py-2 px-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить
        </button>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[#1A1A1A] rounded-xl p-6 border border-white/5 flex items-center justify-between"
          >
            <div>
              <h3 className="text-white font-bold">{service.title}</h3>
              <p className="text-white/50 text-sm line-clamp-1">{service.description}</p>
              <span className="text-primary text-xs uppercase tracking-wider">{service.category}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(service)}
                className="w-10 h-10 bg-[#252525] hover:bg-primary/20 rounded-lg flex items-center justify-center text-white/60 hover:text-primary transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteService(service.id)}
                className="w-10 h-10 bg-[#252525] hover:bg-red-500/20 rounded-lg flex items-center justify-center text-white/60 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1A1A1A] rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6">
              {isEditing ? 'Редактировать услугу' : 'Добавить услугу'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">Название</label>
                <input
                  name="title"
                  defaultValue={isEditing?.title}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Описание</label>
                <textarea
                  name="description"
                  defaultValue={isEditing?.description}
                  required
                  rows={3}
                  className="input-field resize-none"
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Иконка</label>
                <select name="icon" defaultValue={isEditing?.icon || 'Home'} className="input-field">
                  <option value="Home">Дом</option>
                  <option value="Paintbrush">Кисть</option>
                  <option value="Building2">Здание</option>
                  <option value="Hammer">Молоток</option>
                  <option value="FileText">Документ</option>
                  <option value="Ruler">Линейка</option>
                </select>
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Категория</label>
                <input
                  name="category"
                  defaultValue={isEditing?.category}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Особенности (по одной на строку)</label>
                <textarea
                  name="features"
                  defaultValue={isEditing?.features.join('\n')}
                  rows={4}
                  className="input-field resize-none"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setIsEditing(null);
                  }}
                  className="flex-1 btn-secondary"
                >
                  Отмена
                </button>
                <button type="submit" className="flex-1 btn-primary justify-center">
                  <Check className="w-4 h-4 mr-2" />
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Portfolio Tab
function PortfolioTab() {
  const { items, addItem, updateItem, deleteItem } = usePortfolioStore();
  const [isEditing, setIsEditing] = useState<PortfolioItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const itemData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as PortfolioItem['category'],
      images: [(formData.get('image') as string) || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800'],
      year: parseInt(formData.get('year') as string) || new Date().getFullYear(),
      area: formData.get('area') as string,
      location: formData.get('location') as string,
      client: formData.get('client') as string,
    };

    if (isEditing) {
      updateItem(isEditing.id, itemData);
      setIsEditing(null);
    } else {
      addItem(itemData);
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Портфолио</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="btn-primary text-sm py-2 px-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить
        </button>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#1A1A1A] rounded-xl p-4 border border-white/5 flex items-center gap-4"
          >
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-white font-bold">{item.title}</h3>
              <p className="text-white/50 text-sm">{item.location} • {item.year}</p>
              <span className="text-primary text-xs uppercase tracking-wider">{item.category}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(item)}
                className="w-10 h-10 bg-[#252525] hover:bg-primary/20 rounded-lg flex items-center justify-center text-white/60 hover:text-primary transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="w-10 h-10 bg-[#252525] hover:bg-red-500/20 rounded-lg flex items-center justify-center text-white/60 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1A1A1A] rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6">
              {isEditing ? 'Редактировать проект' : 'Добавить проект'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">Название</label>
                <input
                  name="title"
                  defaultValue={isEditing?.title}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Описание</label>
                <textarea
                  name="description"
                  defaultValue={isEditing?.description}
                  required
                  rows={3}
                  className="input-field resize-none"
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Категория</label>
                <select
                  name="category"
                  defaultValue={isEditing?.category || 'residential'}
                  className="input-field"
                >
                  <option value="residential">Жилой</option>
                  <option value="commercial">Коммерческий</option>
                  <option value="architecture">Архитектура</option>
                  <option value="repair">Ремонт</option>
                </select>
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">URL изображения</label>
                <input
                  name="image"
                  defaultValue={isEditing?.images[0]}
                  placeholder="https://..."
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Год</label>
                  <input
                    name="year"
                    type="number"
                    defaultValue={isEditing?.year || new Date().getFullYear()}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Площадь</label>
                  <input
                    name="area"
                    defaultValue={isEditing?.area}
                    placeholder="100 м²"
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Локация</label>
                <input
                  name="location"
                  defaultValue={isEditing?.location}
                  placeholder="Уфа"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Клиент</label>
                <input
                  name="client"
                  defaultValue={isEditing?.client}
                  placeholder="Название компании"
                  className="input-field"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setIsEditing(null);
                  }}
                  className="flex-1 btn-secondary"
                >
                  Отмена
                </button>
                <button type="submit" className="flex-1 btn-primary justify-center">
                  <Check className="w-4 h-4 mr-2" />
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Inquiries Tab
function InquiriesTab() {
  const { inquiries, markAsRead, deleteInquiry } = useInquiriesStore();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Заявки</h2>

      <div className="bg-[#1A1A1A] rounded-xl border border-white/5 overflow-hidden">
        <div className="divide-y divide-white/5">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className={`p-6 ${!inquiry.read ? 'bg-primary/5' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold">{inquiry.name}</h3>
                  <p className="text-white/50 text-sm">{inquiry.phone}</p>
                  {inquiry.email && <p className="text-white/50 text-sm">{inquiry.email}</p>}
                </div>
                <div className="text-right">
                  <p className="text-white/40 text-sm">
                    {new Date(inquiry.date).toLocaleDateString('ru-RU')}
                  </p>
                  <p className="text-white/40 text-xs">
                    {new Date(inquiry.date).toLocaleTimeString('ru-RU')}
                  </p>
                </div>
              </div>

              {inquiry.service && (
                <p className="text-primary text-sm mb-2">
                  Услуга: {inquiry.service}
                </p>
              )}

              {inquiry.message && (
                <p className="text-white/70 text-sm mb-4 bg-[#252525] rounded-lg p-3">
                  {inquiry.message}
                </p>
              )}

              <div className="flex gap-2">
                {!inquiry.read && (
                  <button
                    onClick={() => markAsRead(inquiry.id)}
                    className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                  >
                    <Check className="w-4 h-4" />
                    Отметить прочитанным
                  </button>
                )}
                <button
                  onClick={() => deleteInquiry(inquiry.id)}
                  className="text-sm text-red-400 hover:text-red-500 flex items-center gap-1 ml-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  Удалить
                </button>
              </div>
            </div>
          ))}
          {inquiries.length === 0 && (
            <div className="p-12 text-center text-white/40">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Пока нет заявок</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Admin Panel Component
export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated, logout } = useAdminStore();

  const tabs = [
    { id: 'dashboard' as AdminTab, label: 'Обзор', icon: LayoutDashboard },
    { id: 'services' as AdminTab, label: 'Услуги', icon: Briefcase },
    { id: 'portfolio' as AdminTab, label: 'Портфолио', icon: Image },
    { id: 'inquiries' as AdminTab, label: 'Заявки', icon: MessageSquare },
  ];

  const handleOpen = () => {
    if (isAuthenticated) {
      setIsOpen(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setIsOpen(true);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    setActiveTab('dashboard');
  };

  return (
    <>
      {/* Admin Button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={handleOpen}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center text-[#0F0F0F] shadow-lg hover:shadow-xl transition-all duration-300"
        title="Админ-панель"
      >
        <Settings className="w-6 h-6" />
      </motion.button>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && <AdminLogin onLogin={handleLoginSuccess} />}
      </AnimatePresence>

      {/* Admin Panel */}
      <AnimatePresence>
        {isOpen && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0F0F0F]"
          >
            <div className="h-full flex">
              {/* Sidebar */}
              <div className="w-64 bg-[#1A1A1A] border-r border-white/5 flex flex-col">
                <div className="p-6 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                      <span className="text-[#0F0F0F] font-bold font-['Montserrat']">АСБ</span>
                    </div>
                    <div>
                      <span className="text-white font-bold font-['Montserrat']">РУМ ПРО</span>
                      <p className="text-[#707070] text-xs">Админ-панель</p>
                    </div>
                  </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-primary text-[#0F0F0F]'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
                  >
                    <LogOut className="w-5 h-5" />
                    Выйти
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="h-16 border-b border-white/5 flex items-center justify-between px-8">
                  <h1 className="text-xl font-bold text-white">
                    {tabs.find((t) => t.id === activeTab)?.label}
                  </h1>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 bg-[#1A1A1A] hover:bg-[#252525] rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-8">
                  {activeTab === 'dashboard' && <DashboardTab />}
                  {activeTab === 'services' && <ServicesTab />}
                  {activeTab === 'portfolio' && <PortfolioTab />}
                  {activeTab === 'inquiries' && <InquiriesTab />}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
