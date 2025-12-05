'use client';

import { XCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FinalisasiDokumenItem {
  nama: string;
  status: 'uploaded' | 'missing';
  tanggal?: string;
}

interface FinalisasiDokumenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinalisasi: () => void;
  data: FinalisasiDokumenItem[];
}

export default function FinalisasiDokumenModal({
  isOpen,
  onClose,
  onFinalisasi,
  data,
}: FinalisasiDokumenModalProps) {
  const allComplete = data.every(item => item.status === 'uploaded');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-2xl font-bold mb-2">
              Finalisasi Data
            </h2>
            <p className="text-center text-gray-600 text-sm mb-6">
              Setelah data difinalisasi, Anda tidak dapat mengubah dokumen.
              Apakah Anda yakin ingin melanjutkan?
            </p>

            <h4 className="font-semibold mb-3">Data yang sudah diunggah:</h4>

            <div className="space-y-3 mb-6">
              {data.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between rounded-xl p-4 text-sm ${
                    item.status === 'uploaded'
                      ? 'border border-green-300 bg-green-200 text-green-800'
                      : 'border border-red-300 bg-red-200 text-red-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.status === 'uploaded' ? (
                      <CheckCircle size={22} />
                    ) : (
                      <XCircle size={22} />
                    )}
                    <div>
                      <p className="font-semibold">{item.nama}</p>
                      <p className="text-xs">
                        {item.status === 'uploaded'
                          ? `Diunggah pada ${item.tanggal}`
                          : 'Belum diunggah'}
                      </p>
                    </div>
                  </div>

                  {item.status === 'missing' && (
                    <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                      Belum Lengkap
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 h-11 rounded-lg border border-gray-300 font-semibold hover:bg-gray-100 transition"
              >
                Batal
              </button>

              <button
                disabled={!allComplete}
                onClick={onFinalisasi}
                className={`flex-1 h-11 rounded-lg font-semibold transition ${
                  allComplete
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Ya, Finalisasi
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}