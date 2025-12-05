'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  deadlineText?: string;
  buttonText?: string;
}

export default function SuccessDokumenModal({
  isOpen,
  onClose,
  title = 'Dokumen Berhasil Diunggah',
  message = 'Dokumen Anda telah berhasil diunggah. Pastikan semua dokumen yang diperlukan telah dikirim sebelum batas waktu.',
  deadlineText = 'Batas Waktu Pengumpulan: 15 November 2025',
  buttonText = 'OK',
}: SuccessModalProps) {
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
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <Check className="h-10 w-10 text-green-600 stroke-[3]" />
              </div>
            </div>

            {/* TITLE */}
            <h2 className="mb-3 text-center text-2xl font-bold text-gray-900">
              {title}
            </h2>

            {/* MESSAGE */}
            <p className="mb-5 text-center text-gray-600 leading-relaxed">
              {message}
            </p>

            {/* DEADLINE */}
            <div className="mb-6 border border-green-300 rounded-lg bg-green-100 px-4 py-3 text-center text-sm font-semibold text-green-700">
              {deadlineText}
            </div>

            {/* BUTTON */}
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-green-600 py-3 text-white font-semibold hover:bg-green-700 transition"
            >
              {buttonText}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
