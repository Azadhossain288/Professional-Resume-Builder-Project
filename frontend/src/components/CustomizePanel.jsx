import { useState } from "react";

const CustomizePanel = ({ customize, setCustomize }) => {
  const update = (key, value) =>
    setCustomize(prev => ({ ...prev, [key]: value }));

  const colors = [
    "#c45a8a", "#3b82f6", "#10b981",
    "#8b5cf6", "#f59e0b", "#ef4444",
    "#06b6d4", "#ec4899", "#14b8a6",
  ];

  return (
    <div className="w-full animate-fadeUp">
      {/* Header */}
      <div className="mb-8 group">
        <h2 className="text-[17px] font-medium text-white">🎨 Design & Style</h2>
        <p className="text-[12px] text-white/30 mt-1">Personalize your resume look and feel</p>
        <div className="h-[2px] w-7 bg-pink-500 rounded mt-2" />
      </div>

      <div className="flex flex-col gap-8 max-w-md">
        {/* Primary Color */}
        <div className="bg-[#0e0e1e] border border-white/6 rounded-2xl p-5">
          <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-4">Accent Color</p>
          <div className="grid grid-cols-5 gap-3 mb-4">
            {colors.map(c => (
              <button
                key={c}
                onClick={() => update("primaryColor", c)}
                style={{ background: c }}
                className={`aspect-square rounded-xl transition-all hover:scale-110 active:scale-95 ${
                  customize.primaryColor === c
                    ? "ring-2 ring-white ring-offset-4 ring-offset-[#080812] scale-105"
                    : "opacity-80 hover:opacity-100"
                }`}
              />
            ))}
            <label className="aspect-square rounded-xl border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all relative overflow-hidden">
              <span className="text-xl text-white/20">+</span>
              <input
                type="color"
                value={customize.primaryColor}
                onChange={e => update("primaryColor", e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 bg-black/20 rounded-lg border border-white/5">
             <div className="w-4 h-4 rounded shadow-sm" style={{backgroundColor: customize.primaryColor}}></div>
             <span className="text-[11px] font-mono text-white/40 uppercase">{customize.primaryColor}</span>
          </div>
        </div>

        {/* Font Size & Spacing (Grid Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Font Size */}
          <div className="bg-[#0e0e1e] border border-white/6 rounded-2xl p-5">
            <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-4">Font Size</p>
            <div className="flex gap-2">
              {[
                { id: "small", label: "Small" },
                { id: "medium", label: "Med" },
                { id: "large", label: "Large" },
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => update("fontSize", s.id)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all border ${
                    customize.fontSize === s.id
                      ? "bg-pink-500/10 border-pink-500/30 text-pink-400"
                      : "bg-white/4 border-white/5 text-white/30 hover:bg-white/8"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Spacing */}
          <div className="bg-[#0e0e1e] border border-white/6 rounded-2xl p-5">
            <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-4">Spacing</p>
            <div className="flex gap-2">
              {[
                { id: "compact", label: "Tight" },
                { id: "normal", label: "Normal" },
                { id: "spacious", label: "Wide" },
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => update("spacing", s.id)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all border ${
                    customize.spacing === s.id
                      ? "bg-pink-500/10 border-pink-500/30 text-pink-400"
                      : "bg-white/4 border-white/5 text-white/30 hover:bg-white/8"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reset Action */}
        <button
          onClick={() => setCustomize({
            fontSize: "medium",
            spacing: "normal",
            primaryColor: "#c45a8a",
          })}
          className="mt-4 flex items-center justify-center gap-2 text-white/20 hover:text-pink-400 transition-colors py-2 text-xs"
        >
          <span className="text-lg">↺</span> Reset to Default Styles
        </button>
      </div>
    </div>
  );
};

export default CustomizePanel;