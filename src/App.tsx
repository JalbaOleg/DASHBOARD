import React, { useState, useEffect } from "react";
import { Search } from "./search";
import { Devices } from "./devices";
import { DeviceFormModal } from "./deviceForm";
import type { Device as AppDevice, DeviceFormValues } from "./types/device";

type DeviceWithDisplayFields = AppDevice & {
  DeviceType: string;
  name: string;
  adress: string;
};

const generateId = () => Math.random().toString(36).substring(2, 9);

const mockDevices: DeviceWithDisplayFields[] = [
  {
    id: "1",
    deviceName: "Temperature Sensor 1",
    deviceType: "Sensor",
    ipAddress: "192.168.1.10",
    samplingRate: 5,
    status: "Online",
    location: "Section B",
    DeviceType: "Sensor",
    name: "Temperature Sensor 1",
    adress: "192.168.1.10",
  },
  {
    id: "2",
    deviceName: "Pressure Valve 3",
    deviceType: "Actuator",
    ipAddress: "192.168.1.15",
    samplingRate: 10,
    status: "Online",
    location: "Line A",
    DeviceType: "Actuator",
    name: "Pressure Valve 3",
    adress: "192.168.1.15",
  },
  {
    id: "3",
    deviceName: "Conveyor Motor",
    deviceType: "Controller",
    ipAddress: "192.168.1.20",
    samplingRate: 15,
    status: "Maintenance",
    location: "Section C",
    DeviceType: "Controller",
    name: "Conveyor Motor",
    adress: "192.168.1.20",
  },
  {
    id: "4",
    deviceName: "Humidity Sensor 2",
    deviceType: "Sensor",
    ipAddress: "192.168.1.12",
    samplingRate: 30,
    status: "Offline",
    location: "Line D",
    DeviceType: "Sensor",
    name: "Humidity Sensor 2",
    adress: "192.168.1.12",
  },
  {
    id: "5",
    deviceName: "Gas Detector Alpha",
    deviceType: "Sensor",
    ipAddress: "192.168.1.45",
    samplingRate: 2,
    status: "Online",
    location: "Section B",
    DeviceType: "Sensor",
    name: "Gas Detector Alpha",
    adress: "192.168.1.45",
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("q") || "";
    }
    return "";
  });

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [devices, setDevices] =
    useState<DeviceWithDisplayFields[]>(mockDevices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] =
    useState<DeviceWithDisplayFields | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);

      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        if (searchQuery.trim()) {
          params.set("q", searchQuery);
        } else {
          params.delete("q");
        }
        const newRelativePathQuery =
          window.location.pathname +
          (params.toString() ? "?" + params.toString() : "");
        window.history.replaceState(null, "", newRelativePathQuery);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const filteredDevices = devices.filter((device) => {
    const term = debouncedQuery.toLowerCase().trim();
    if (!term) return true;

    const nameToCompare = device.deviceName || device.name || "";
    return nameToCompare.toLowerCase().includes(term);
  });

  const handleOpenAdd = () => {
    setEditingDevice(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (device: DeviceWithDisplayFields) => {
    setEditingDevice(device);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Sigur dorești să ștergi acest dispozitiv?")) {
      setDevices((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const handleFormSubmit = (data: DeviceFormValues) => {
    if (editingDevice) {
      setDevices((prev) =>
        prev.map((d) =>
          d.id === editingDevice.id
            ? {
                ...d,
                ...data,
                DeviceType: data.deviceType,
                name: data.deviceName,
                adress: data.ipAddress,
              }
            : d,
        ),
      );
    } else {
      const newDevice: DeviceWithDisplayFields = {
        id: generateId(),
        ...data,
        status: "Online",
        location: "Section A",
        DeviceType: data.deviceType,
        name: data.deviceName,
        adress: data.ipAddress,
      };
      setDevices((prev) => [newDevice, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      <h1>TEST DEPLOY</h1>
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-900 pb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <Search value={searchQuery} onChange={setSearchQuery} />
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-lg text-sm shadow-lg shadow-emerald-500/10 transition-all flex items-center justify-center gap-2"
            >
              Adaugă Dispozitiv
            </button>
          </div>
        </header>

        <main className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-slate-400 tracking-wide">
            Devices Grid ({filteredDevices.length})
          </h2>

          <Devices
            items={filteredDevices}
            searchQuery={debouncedQuery}
            onEdit={handleOpenEdit}
          />
        </main>

        <DeviceFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={editingDevice}
        />
      </div>
    </div>
  );
}

export default App;
