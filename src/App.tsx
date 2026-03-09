import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminPanel from '@/components/AdminPanel';
import Hero from '@/sections/Hero';
import Services from '@/sections/Services';
import Portfolio from '@/sections/Portfolio';
import About from '@/sections/About';
import Testimonials from '@/sections/Testimonials';
import Contact from '@/sections/Contact';

// Loading Screen Component
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-[#0F0F0F] flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-[#0F0F0F] font-bold text-3xl font-['Montserrat']">АСБ</span>
          </div>
          <h1 className="text-white font-bold text-2xl font-['Montserrat']">РУМ ПРО</h1>
          <p className="text-white/50 text-sm uppercase tracking-wider">Строительная компания</p>
        </motion.div>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="h-full bg-primary"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/40 text-sm mt-4"
        >
          Загрузка...
        </motion.p>
      </div>
    </motion.div>
  );
}

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowContent(true);
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-[#0F0F0F]"
        >
          <Header />
          
          <main>
            <Hero />
            <Services />
            <Portfolio />
            <About />
            <Testimonials />
            <Contact />
          </main>

          <Footer />
          <AdminPanel />
        </motion.div>
      )}
    </>
  );
}

export default App;
