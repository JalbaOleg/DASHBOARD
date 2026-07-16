import React from "react";

interface Device {
  id: string;
  DeviceType: string;
  status: "Online" | "Offline" | "Maintenance" | string;
  name: string;
  adress: string;
}

interface DevicesProps {
  items: Device[];
  searchQuery: string;
  onEdit: (item: any) => void;
}

export function Devices({ items, searchQuery, onEdit }: DevicesProps) {
  const getStatusClasses = (status: Device["status"]) => {
    switch (status) {
      case "Online":
        return {
          dot: "bg-emerald-400",
          cardBg: "bg-emerald-950/20 border-emerald-500/20",
        };
      case "Offline":
        return { dot: "bg-red-400", cardBg: "bg-red-950/10 border-red-500/20" };
      case "Maintenance":
        return {
          dot: "bg-amber-400",
          cardBg: "bg-amber-950/20 border-amber-500/20",
        };
      default:
        return {
          dot: "bg-slate-400",
          cardBg: "bg-slate-950/10 border-slate-800/20",
        };
    }
  };

  if (items.length === 0) {
    return (
      <p className="text-slate-500 text-center py-12 col-span-full">
        Nu s-a găsit niciun dispozitiv care să conțină "{searchQuery}".
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((device, index) => {
        const styles = getStatusClasses(device.status);

        return (
          <div
            key={device.id || index}
            className={`border rounded-2xl p-5 flex flex-col gap-4 backdrop-blur-sm transition-all duration-200 hover:scale-[1.01] ${styles.cardBg}`}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-md">
                {device.DeviceType}
              </span>

              <div className="flex items-center gap-2 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
                <span
                  className={`w-2 h-2 rounded-full block animate-pulse ${styles.dot}`}
                ></span>
                <span className="text-xs font-medium text-slate-300">
                  {device.status}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white tracking-wide mb-1">
                {device.name}
              </h3>
              <p className="text-sm text-slate-400 font-mono flex justify-between items-center bg-slate-950/40 p-2 rounded-lg border border-slate-900">
                <span>IP:</span>
                <span className="text-slate-300">{device.adress}</span>
              </p>
            </div>
            <div>
              <button
                onClick={() => onEdit(device)}
                className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-lg text-sm shadow-lg shadow-emerald-500/10 transition-all"
              >
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
