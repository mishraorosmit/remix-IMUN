import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastNotification } from '../types';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, AlertTriangle, Info, X, Copy, Check } from 'lucide-react';

interface ToastContextValue {
  showToast: (toast: Omit<ToastNotification, 'id'>) => string;
  showSuccess: (title: string, message: string, code?: string, duration?: number) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type = 'success', title, message, code, duration = 5000 }: Omit<ToastNotification, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const newToast: ToastNotification = { id, type, title, message, code, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }

      return id;
    },
    [dismissToast]
  );

  const showSuccess = useCallback(
    (title: string, message: string, code?: string, duration: number = 5000) => {
      return showToast({ type: 'success', title, message, code, duration });
    },
    [showToast]
  );

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, dismissToast }}>
      {children}

      {/* Floating Toast Notification Container */}
      <aside
        aria-label="Notifications"
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm sm:max-w-md w-[calc(100vw-2.5rem)] pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((toast) => {
            const isSuccess = toast.type === 'success';
            const isWarning = toast.type === 'warning';

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.92, transition: { duration: 0.2 } }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="pointer-events-auto bg-[#F8F4E6] border-2 border-[#0B192C] hard-stamp p-4 text-[#0B192C] relative shadow-[5px_5px_0px_#0B192C] overflow-hidden"
              >
                {/* Background Pattern Strip */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#0B192C]">
                  <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: (toast.duration || 5000) / 1000, ease: 'linear' }}
                    className={`h-full ${
                      isSuccess ? 'bg-[#C5A059]' : isWarning ? 'bg-[#C5A059]' : 'bg-[#0B192C]'
                    }`}
                  />
                </div>

                {/* Top Badge Header */}
                <div className="flex items-center justify-between border-b border-[#0B192C]/20 pb-2 mb-2.5 mt-0.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[9px] font-mono-tag font-black px-2 py-0.5 border ${
                        isSuccess
                          ? 'bg-[#C5A059] text-[#F8F4E6] border-[#0B192C]'
                          : isWarning
                          ? 'bg-[#C5A059] text-[#F8F4E6] border-[#0B192C]'
                          : 'bg-[#0B192C] text-[#F8F4E6] border-[#0B192C]'
                      }`}
                    >
                      {isSuccess ? '✓ ACTION VERIFIED' : isWarning ? '⚠ SECURITY NOTICE' : 'ℹ BULLETIN'}
                    </span>
                    <span className="text-[10px] font-mono-tag text-[#1E3A8A] font-bold">
                      TRANSMISSION OK
                    </span>
                  </div>

                  <button
                    onClick={() => dismissToast(toast.id)}
                    aria-label="Close notification"
                    className="p-1 text-[#0B192C] hover:bg-[#C5A059] hover:text-[#F8F4E6] border border-[#0B192C]/30 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 border border-[#0B192C] shrink-0 mt-0.5 ${
                      isSuccess
                        ? 'bg-[#C5A059]/15 text-[#C5A059]'
                        : isWarning
                        ? 'bg-[#C5A059]/15 text-[#C5A059]'
                        : 'bg-[#0B192C]/10 text-[#0B192C]'
                    }`}
                  >
                    {isSuccess ? (
                      <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-5 h-5 text-[#C5A059]" />
                    ) : (
                      <Info className="w-5 h-5 text-[#0B192C]" />
                    )}
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <h4 className="font-display font-black text-sm uppercase tracking-tight text-[#0B192C] skew-heading leading-snug">
                      {toast.title}
                    </h4>
                    <p className="text-xs font-sans text-[#1E3A8A] leading-relaxed">
                      {toast.message}
                    </p>

                    {/* Optional Reference / Clearance Code Pill */}
                    {toast.code && (
                      <div className="mt-2 pt-2 border-t border-[#0B192C]/20 flex items-center justify-between gap-2">
                        <div className="text-[10px] font-mono-tag text-[#0B192C] bg-[#F8F4E6] px-2 py-1 border border-[#0B192C] truncate font-bold">
                          REF: <span className="text-[#C5A059]">{toast.code}</span>
                        </div>
                        <button
                          onClick={() => handleCopyCode(toast.code!, toast.id)}
                          className="flex items-center gap-1 text-[10px] font-mono-tag font-bold text-[#0B192C] hover:text-[#C5A059] px-1.5 py-0.5 border border-[#0B192C]/40 bg-[#F8F4E6] transition-colors cursor-pointer"
                        >
                          {copiedId === toast.id ? (
                            <>
                              <Check className="w-3 h-3 text-[#C5A059]" />
                              <span>COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>COPY</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </aside>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
