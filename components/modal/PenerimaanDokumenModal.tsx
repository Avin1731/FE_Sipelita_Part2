'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, XCircle, CheckCircle } from 'lucide-react';

interface PenerimaanDokumenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTerima?: () => void;
  onTolak?: () => void;
}

export default function PenerimaanDokumenModal({
  isOpen,
  onClose,
  onTerima = () => console.log('Dokumen diterima'),
  onTolak = () => console.log('Dokumen ditolak'),
}: PenerimaanDokumenModalProps) {
  const handleTerima = () => {
    onTerima();
    onClose();
  };

  const handleTolak = () => {
    onTolak();
    onClose();
  };

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
            className="bg-white rounded-2xl shadow-xl w-full max-w-5xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ================= KIRI : INFORMASI ================= */}
            <div className="bg-white border rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-4">Informasi Dokumen</h3>

                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <span className="text-green-600">Nama Daerah</span>
                  <span className="text-gray-800 text-right">Kab Sleman</span>

                  <span className="text-green-600">Jenis DLH</span>
                  <span className="text-gray-800 text-right">Kab/Kota</span>

                  <span className="text-green-600">Jenis Dokumen</span>
                  <span className="text-gray-800 text-right">
                    SLHD Buku I (RE)
                  </span>

                  <span className="text-green-600">Tanggal Upload</span>
                  <span className="text-gray-800 text-right">16 Oktober 2025</span>

                  <span className="text-green-600">Nama File</span>
                  <span className="text-gray-800 text-right">Buku L_KabSleman_2025</span>

                  <span className="text-green-600">Ukuran File</span>
                  <span className="text-gray-800 text-right">5.5 MB</span>

                  <span className="text-green-600">Format File</span>
                  <span className="text-gray-800 text-right">PDF</span>

                  <span className="text-green-600">Status</span>
                  <span className="text-right">
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full">
                      Belum diverifikasi
                    </span>
                  </span>
                </div>
              </div>

              {/* ================= BUTTON AREA ================= */}
              <div className="mt-6 grid grid-cols-4 gap-2">
                <button className="col-span-3 flex items-center justify-center gap-2 border border-green-300 bg-green-200 hover:bg-green-300 text-green-800 font-semibold py-3 rounded-xl transition">
                  <Download size={18} />
                  Unduh Dokumen
                </button>

                <button
                  onClick={onClose}
                  className="col-span-1 flex items-center justify-center border border-red-300 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* ================= KANAN : PREVIEW DAN TOMBOL AKSI ================= */}
            <div className="md:col-span-2 flex flex-col gap-4">
              {/* PREVIEW AREA */}
              <div className="bg-gray-200 rounded-xl flex-1 flex items-center justify-center text-gray-500 min-h-[300px]">
                Preview Dokumen
              </div>

              {/* TOMBOL AKSI TERIMA/TOLAK */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  onClick={handleTerima}
                  className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg"
                >
                  <CheckCircle size={20} />
                  Dokumen Diterima
                </button>

                <button
                  onClick={handleTolak}
                  className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg"
                >
                  <XCircle size={20} />
                  Tolak
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}