'use client';

import { useState } from 'react';

import SuccessDokumenModal from '@/components/modal/SuccessDokumenModal';
import ConfirmationDokumenModal from '@/components/modal/ConfirmationDokumenModal';
import HapusDokumenModal from '@/components/modal/HapusDokumenModal';
import LihatDokumenModal from '@/components/modal/LihatDokumenModal';
import UploadDokumenModal from '@/components/modal/UploadDokumenModal';
import FinalisasiDokumenModal from '@/components/modal/FinalisasiDokumenModal';
import PenerimaanDokumenModal from '@/components/modal/PenerimaanDokumenModal';

interface FinalisasiDokumenItem {
  nama: string;
  status: 'uploaded' | 'missing';
  tanggal?: string;
}

export default function TestModalPage() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openLihat, setOpenLihat] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [openFinalisasi, setOpenFinalisasi] = useState(false);
  const [openPenerimaan, setOpenPenerimaan] = useState(false);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // ✅ DATA FINALISASI DUMMY
  const dataFinalisasi: FinalisasiDokumenItem[] = [
    { nama: 'Buku I', status: 'uploaded', tanggal: '12 Nov 2025' },
    { nama: 'Buku II', status: 'uploaded', tanggal: '13 Nov 2025' },
    { nama: 'Tabel Utama', status: 'missing' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-8 p-10">
      <h1 className="text-3xl font-bold text-gray-800">
        Test Semua Modal
      </h1>

      {/* ================= BUTTON TEST ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        <button
          onClick={() => setOpenSuccess(true)}
          className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Open Success Modal
        </button>

        <button
          onClick={() => setOpenWarning(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition"
        >
          Open Warning Modal
        </button>

        <button
          onClick={() => setOpenDelete(true)}
          className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Open Delete Modal
        </button>

        <button
          onClick={() => setOpenLihat(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Open Lihat Dokumen
        </button>

        <button
          onClick={() => setOpenUpload(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Open Upload Dokumen
        </button>

        <button
          onClick={() => setOpenFinalisasi(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Open Finalisasi Dokumen
        </button>

        <button
          onClick={() => setOpenPenerimaan(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Open Penerimaan Dokumen
        </button>
      </div>

      {/* ================= MODALS ================= */}
      <SuccessDokumenModal
        isOpen={openSuccess}
        onClose={() => setOpenSuccess(false)}
        title="Dokumen Berhasil Diunggah"
        message="Dokumen Anda telah berhasil diunggah."
        deadlineText="Batas Waktu: 15 November 2025"
        buttonText="OK"
      />

      <ConfirmationDokumenModal
        isOpen={openWarning}
        onClose={() => setOpenWarning(false)}
        title="Peringatan"
        message="Tindakan ini dapat berdampak pada validasi data Anda."
        confirmText="Saya Mengerti"
      />

      <HapusDokumenModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          setOpenDelete(false);
          alert('DATA DIHAPUS!');
        }}
        title="Hapus Dokumen"
        message="Apakah Anda yakin ingin menghapus dokumen ini?"
        confirmLabel="Hapus"
        cancelLabel="Batal"
      />

      <LihatDokumenModal
        isOpen={openLihat}
        onClose={() => setOpenLihat(false)}
      />

      <PenerimaanDokumenModal
        isOpen={openPenerimaan}
        onClose={() => setOpenPenerimaan(false)}
      />

      <UploadDokumenModal
        isOpen={openUpload}
        onClose={() => {
          setOpenUpload(false);
          setUploadedFile(null);
        }}
        onConfirm={(file: File | null) => {
          if (!file) return;
          setUploadedFile(file);
          setOpenUpload(false);
          setOpenSuccess(true);
          console.log('FILE TERUPLOAD:', file);
        }}
        title="Upload Dokumen"
        message="Unggah dokumen yang diperlukan ke sistem"
        confirmText="Upload"
        cancelText="Batal"
      />

      <FinalisasiDokumenModal
        isOpen={openFinalisasi}
        onClose={() => setOpenFinalisasi(false)}
        onFinalisasi={() => {
          setOpenFinalisasi(false);
          setOpenSuccess(true);
          alert('DOKUMEN DIFINALISASI!');
        }}
        data={dataFinalisasi}
      />

      {uploadedFile && (
        <div className="bg-white p-4 rounded-xl shadow text-sm text-gray-700 w-full max-w-md">
          <p className="font-semibold mb-1">File Terakhir Diunggah:</p>
          <p>Nama: {uploadedFile.name}</p>
          <p>Ukuran: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          <p>Tipe: {uploadedFile.type}</p>
        </div>
      )}
    </div>
  );
}