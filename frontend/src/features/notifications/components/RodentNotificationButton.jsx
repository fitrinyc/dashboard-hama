import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";

import RodentInfo from "./RodentInfo.jsx";

export default function RodentNotificationButton() {
  const [showInfo, setShowInfo] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  return (
    <>
      <div className="relative group">
        <button
          onClick={() => setShowPopover(!showPopover)}
          className="relative p-2 lg:p-3 bg-gradient-to-br from-orange-100 to-red-100 border-2 border-orange-300 rounded-xl lg:rounded-2xl shadow-md hover:shadow-lg hover:from-orange-200 hover:to-red-200 transition-all group-hover:scale-110 active:scale-95 duration-200"
          title="Info Populasi Tikus"
        >
          <AlertTriangle className="w-5 h-5 lg:w-6 lg:h-6 text-orange-700 animate-pulse" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full animate-bounce"></span>
        </button>

        {showPopover && (
          <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border-2 border-orange-200 p-4 w-64 z-50 animate-in slide-in-from-top-2 duration-200">
            <div className="mb-3">
              <p className="text-xs font-black text-orange-700 uppercase tracking-wider mb-2">Status Populasi Tikus</p>
              <p className="text-sm font-bold text-slate-700 mb-3">
                Populasi tikus terdeteksi <span className="text-red-600 font-black">TINGGI</span> di area lahan Anda.
              </p>
              <div className="space-y-2 mb-4 text-xs font-semibold text-slate-600">
                <div className="flex justify-between bg-orange-50 p-2 rounded-lg">
                  <span>Jumlah Populasi:</span>
                  <span className="font-black text-orange-700">15,243 ekor</span>
                </div>
                <div className="flex justify-between bg-red-50 p-2 rounded-lg">
                  <span>Pertumbuhan:</span>
                  <span className="font-black text-red-700">+8.5%/minggu</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setShowPopover(false);
                setShowInfo(true);
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-black text-sm uppercase tracking-wider hover:shadow-lg transition-all"
            >
              Lihat Detail Lengkap
            </button>
          </div>
        )}
      </div>

      <RodentInfo isOpen={showInfo} onClose={() => setShowInfo(false)} />
    </>
  );
}
