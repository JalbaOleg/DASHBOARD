import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  deviceSchema,
  type DeviceFormValues,
  type Device,
} from "./types/device";

interface DeviceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DeviceFormValues) => void;
  initialData?: Device | null;
}

export function DeviceFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: DeviceFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DeviceFormValues>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      deviceName: initialData?.deviceName || "",
      deviceType: initialData?.deviceType || "Sensor",
      ipAddress: initialData?.ipAddress || "",
      samplingRate: initialData?.samplingRate || 10,
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      reset({
        deviceName: initialData?.deviceName || "",
        deviceType: initialData?.deviceType || "Sensor",
        ipAddress: initialData?.ipAddress || "",
        samplingRate: initialData?.samplingRate || 10,
      });
    }
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-5">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="text-xl font-bold text-white">
            {initialData ? "Editează Dispozitiv" : "Adaugă Dispozitiv"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-xl font-bold p-1"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Nume Dispozitiv
            </label>
            <input
              type="text"
              placeholder="ex: Temperature Sensor"
              {...register("deviceName")}
              className={`w-full bg-slate-950/60 border rounded-lg px-3 py-2 text-sm text-slate-100 outline-none transition-all ${
                errors.deviceName
                  ? "border-red-500/50 focus:ring-2 focus:ring-red-500/10"
                  : "border-slate-800 focus:border-emerald-500/50"
              }`}
            />
            {errors.deviceName && (
              <span className="text-xs font-medium text-red-400">
                {errors.deviceName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Tip Dispozitiv
            </label>
            <select
              {...register("deviceType")}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500/50 transition-all"
            >
              <option value="Sensor">Sensor</option>
              <option value="Actuator">Actuator</option>
              <option value="Controller">Controller</option>
            </select>
            {errors.deviceType && (
              <span className="text-xs font-medium text-red-400">
                {errors.deviceType.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Adresă IPv4
            </label>
            <input
              type="text"
              placeholder="ex: 192.168.1.1"
              {...register("ipAddress")}
              className={`w-full bg-slate-950/60 border rounded-lg px-3 py-2 text-sm text-slate-100 outline-none transition-all ${
                errors.ipAddress
                  ? "border-red-500/50 focus:ring-2 focus:ring-red-500/10"
                  : "border-slate-800 focus:border-emerald-500/50"
              }`}
            />
            {errors.ipAddress && (
              <span className="text-xs font-medium text-red-400">
                {errors.ipAddress.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Rată de eșantionare (secunde)
            </label>
            <input
              type="number"
              placeholder="10"
              {...register("samplingRate", { valueAsNumber: true })}
              className={`w-full bg-slate-950/60 border rounded-lg px-3 py-2 text-sm text-slate-100 outline-none transition-all ${
                errors.samplingRate
                  ? "border-red-500/50 focus:ring-2 focus:ring-red-500/10"
                  : "border-slate-800 focus:border-emerald-500/50"
              }`}
            />
            {errors.samplingRate && (
              <span className="text-xs font-medium text-red-400">
                {errors.samplingRate.message}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white bg-transparent hover:bg-slate-800/40 rounded-lg transition-colors"
            >
              Anulează
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-lg shadow-emerald-500/10"
            >
              {initialData ? "Salvează modificările" : "Adaugă Dispozitiv"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
