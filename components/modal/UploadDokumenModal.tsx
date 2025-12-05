'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, FileText, Trash2 } from 'lucide-react';

interface UploadDokumenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (file: File) => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function UploadDokumenModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Upload Dokumen',
  message = 'Unggah dokumen yang diperlukan ke sistem',
  confirmText = 'Upload',
  cancelText = 'Batal',
}: UploadDokumenModalProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  // ================= PILIH FILE =================
  const handleSelectFile = (file: File) => {
    setSelectedFile(file);
    setProgress(0);

    let value = 0;
    const interval = setInterval(() => {
      value += 10;
      setProgress(value);
      if (value >= 100) clearInterval(interval);
    }, 150);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleSelectFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleSelectFile(e.dataTransfer.files[0]);
    }
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
            className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ================= HEADER ================= */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h2 className="font-bold text-lg">{title}</h2>
                <p className="text-sm text-gray-500">{message}</p>
              </div>

              <button
                onClick={onClose}
                className="text-gray-500 hover:text-red-500 transition"
              >
                <X />
              </button>
            </div>

            {/* ================= BODY ================= */}
            <div className="p-6 space-y-5">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center text-center gap-3"
              >
                <UploadCloud className="text-gray-400" size={40} />

                <p className="text-gray-600 text-sm">
                  Seret file ke sini atau klik untuk memilih file
                </p>

                <p className="text-xs text-gray-400">File maksimal 10MB</p>

                <button
                  onClick={() => inputRef.current?.click()}
                  className="mt-2 px-6 py-2 border border-green-300 bg-green-200 hover:bg-green-300 text-green-700 font-semibold rounded-lg transition"
                >
                  Pilih File
                </button>

                <input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  onChange={handleChange}
                />
              </div>

              {selectedFile && (
                <div className="border rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FileText className="text-green-600" />
                    <div>
                      <p className="text-sm font-semibold">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>

                      <div className="w-40 bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
                        <div
                          className="bg-green-600 h-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setProgress(0);
                    }}
                    className="text-gray-500 hover:text-red-500 transition"
                  >
                    <Trash2 />
                  </button>
                </div>
              )}
            </div>

            {/* ================= FOOTER ================= */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                {cancelText}
              </button>

              <button
                disabled={!selectedFile}
                onClick={() => onConfirm?.(selectedFile!)}
                className={`px-5 py-2 rounded-lg text-white transition ${
                  selectedFile
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
