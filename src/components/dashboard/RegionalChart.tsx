
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mac", value: 45, color: "#22c55e" },
  { name: "Windows", value: 30, color: "#3b82f6" },
  { name: "iOS", value: 15, color: "#f59e0b" },
  { name: "Android", value: 10, color: "#0d9488" }
];

const chartConfig = {
  Mac: { label: "Mac", color: "#22c55e" },
  Windows: { label: "Windows", color: "#3b82f6" },
  iOS: { label: "iOS", color: "#f59e0b" },
  Android: { label: "Android", color: "#0d9488" }
};

export function RegionalChart() {
  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Current download</CardTitle>
        <p className="text-sm text-gray-600">Downloaded by operating system</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="relative">
            <ChartContainer config={chartConfig} className="h-[200px] w-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <div className="text-2xl font-bold">188,245</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-sm text-gray-600">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
