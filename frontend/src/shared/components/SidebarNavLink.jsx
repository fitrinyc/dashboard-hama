import React from "react";
import { Link } from "react-router-dom";

export default function SidebarNavLink({ icon, label, onClick, to }) {
  return (
    <Link
      className="flex items-center gap-3 px-3.5 py-3 text-slate-500 hover:text-green-700 hover:bg-green-50 rounded-[1rem] transition-all font-black group text-[12px] lg:text-[13px] uppercase tracking-[0.04em] border border-transparent hover:border-green-100"
      onClick={onClick}
      to={to}
    >
      <span className="group-hover:rotate-6 transition-transform text-slate-400 group-hover:text-green-600">{icon}</span>
      {label}
    </Link>
  );
}
