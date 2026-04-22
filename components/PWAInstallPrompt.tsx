"use client";

import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PWAInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPrompt(e);
      // Show our custom prompt
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    // Show the install prompt
    installPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setIsVisible(false);
    } else {
      console.log('User dismissed the install prompt');
    }

    setInstallPrompt(null);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-4 right-4 z-[2000] md:left-auto md:right-6 md:w-96"
        >
          <div className="bg-academic-navy border border-academic-gold/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
            {/* Animated background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-academic-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-academic-gold/20 transition-colors" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 border border-academic-gold/50 shadow-lg">
                <img src="/images/logo.jpeg" alt="SK Logo" className="w-10 h-10 object-contain" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm">Install College App</h3>
                <p className="text-slate-400 text-xs">Get instant access to notices & results.</p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleInstallClick}
                  className="bg-academic-gold text-academic-navy px-4 py-2 rounded-lg font-black text-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Download size={14} />
                  Install
                </button>
              </div>

              <button 
                onClick={() => setIsVisible(false)}
                className="absolute -top-1 -right-1 p-1 text-slate-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
