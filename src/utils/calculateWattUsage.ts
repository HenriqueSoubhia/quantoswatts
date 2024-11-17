import IDevice from "@/interfaces/IDevice";
import  IRegistration  from "@/interfaces/IRegistration";

export const convertTimeToFloat = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours + minutes / 60;
};

export const getWattUsage = (registrations: IRegistration[], devices: IDevice[]) => {
  const dailyWatts: { date: string; watts: number }[] = [];

  registrations.forEach((registration) => {
    const registrationDate = new Date(registration.date).toLocaleDateString();

    if (!dailyWatts.find((entry) => entry.date === registrationDate)) {
      dailyWatts.push({ date: registrationDate, watts: 0 });
    }

    const device = devices.find((device) => device.id === registration.deviceId);
    const watts = device
      ? device.wattsPerHour
      : registration.deviceWattsPerHour;

    dailyWatts.find((entry) => entry.date === registrationDate)!.watts +=
      watts * convertTimeToFloat(registration.timeUsed);
  });

  return dailyWatts;
};
