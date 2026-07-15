import { z } from "zod";

export const deviceSchema = z.object({
  deviceName: z
    .string()
    .min(3, { message: "Numele trebuie să aibă cel puțin 3 caractere" }),

  deviceType: z.enum(["Sensor", "Actuator", "Controller"] as const, {
    error: () => ({ message: "Selectează un tip valid de dispozitiv" }),
  }),

  ipAddress: z
    .string()
    .regex(
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      { message: "Adresa IP trebuie să fie un format IPv4 valid" },
    ),

  samplingRate: z
    .number({ error: "Rata trebuie să fie un număr" })
    .min(1, { message: "Rata minimă este de 1 secundă" })
    .max(60, { message: "Rata maximă este de 60 de secunde" }),
});

export type DeviceFormValues = z.infer<typeof deviceSchema>;

export interface Device extends DeviceFormValues {
  id: string;
  status: "Online" | "Offline" | "Maintenance";
  location: string;
}
