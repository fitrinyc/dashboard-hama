import React from "react";
import { X, AlertTriangle } from "lucide-react";

export default function RodentInfo({ isOpen, onClose }) {
  const rodentData = {
    populasi: "243 ekor",
    pertumbuhan: "+8.5% per minggu",
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100]" onClick={onClose} />

      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 lg:p-8 flex items-center justify-between border-b-4 border-orange-400">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <AlertTriangle className="w-6 h-6 lg:w-8 lg:h-8" />
              </div>
              <div>
                <h2 className="text-xl lg:text-2xl font-black uppercase tracking-tight">Info Populasi Tikus</h2>
                <p className="text-xs lg:text-sm font-bold opacity-90">Data Monitoring Real-time</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 lg:p-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4">
                <p className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-2">Populasi</p>
                <p className="text-2xl lg:text-3xl font-black text-orange-700">{rodentData.populasi}</p>
              </div>
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                <p className="text-xs text-red-600 font-bold uppercase tracking-wider mb-2">Pertumbuhan</p>
                <p className="text-2xl lg:text-3xl font-black text-red-700">{rodentData.pertumbuhan}</p>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button onClick={onClose} className="flex-1 px-6 py-4 bg-slate-100 text-slate-700 rounded-2xl font-black hover:bg-slate-200 transition-colors uppercase text-sm tracking-wider">
                Tutup
              </button>
              <button
                onClick={() => {
                  onClose();
                  window.location.href = "/rekomendasi";
                }}
                className="flex-1 px-6 py-4 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 transition-colors uppercase text-sm tracking-wider"
              >
                Lihat Solusi Lengkap
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
