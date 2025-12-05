'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText: string;
}

export default function ConfirmationDokumenModal({
  isOpen,
  onClose,
  title,
  message,
  confirmText,
}: WarningModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ICON */}
            <div className="flex justify-center mb-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
                <AlertTriangle className="h-10 w-10 text-yellow-600" />
              </div>
            </div>

            {/* TITLE */}
            <h2 className="mb-3 text-center text-2xl font-bold text-gray-900">
              {title}
            </h2>

            {/* MESSAGE */}
            <p className="mb-6 text-center text-gray-600 leading-relaxed">
              {message}
            </p>

            {/* BUTTON */}
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-yellow-500 py-3 text-white font-semibold hover:bg-yellow-600 transition"
            >
              {confirmText}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
