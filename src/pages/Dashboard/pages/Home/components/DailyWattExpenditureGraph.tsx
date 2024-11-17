import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import IDevice from "@/interfaces/IDevice";
import  IRegistration  from "@/interfaces/IRegistration";
import { getWattUsage } from "@/utils/calculateWattUsage";

const chartConfig = {
  watts: {
    label: "Watts",
    color: "#34d399", // Cor verde para diferenciar
  },
} satisfies ChartConfig;

interface IDailyWattExpenditureGraphProps {
  devices: IDevice[];
  registrations: IRegistration[];
}

const DailyWattExpenditureGraph = ({
  registrations,
  devices,
}: IDailyWattExpenditureGraphProps) => {
  const [dailyWatts, setDailyWatts] = useState<any[]>([]);

  useEffect(() => {
    const data = getWattUsage(registrations, devices);
    setDailyWatts(data);
  }, [registrations, devices]);

  return (
    <div className="mb-4">
      <Label>Gasto de watts diário</Label>
      <ChartContainer config={chartConfig} className="w-full h-64">
        <BarChart data={dailyWatts}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 5)} // Data abreviada
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="watts" fill={chartConfig.watts.color} radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default DailyWattExpenditureGraph;
