
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", Asia: 15, Europe: 25, Americas: 10 },
  { month: "Feb", Asia: 20, Europe: 30, Americas: 8 },
  { month: "Mar", Asia: 18, Europe: 22, Americas: 12 },
  { month: "Apr", Asia: 12, Europe: 15, Americas: 6 },
  { month: "May", Asia: 25, Europe: 35, Americas: 20 },
  { month: "Jun", Asia: 8, Europe: 12, Americas: 4 },
  { month: "Jul", Asia: 32, Europe: 42, Americas: 25 },
  { month: "Aug", Asia: 28, Europe: 38, Americas: 22 },
  { month: "Sep", Asia: 15, Europe: 20, Americas: 8 },
  { month: "Oct", Asia: 35, Europe: 45, Americas: 28 },
  { month: "Nov", Asia: 12, Europe: 18, Americas: 10 },
  { month: "Dec", Asia: 22, Europe: 28, Americas: 15 }
];

const chartConfig = {
  Asia: {
    label: "Asia",
    color: "#2dd4bf"
  },
  Europe: {
    label: "Europe", 
    color: "#fb923c"
  },
  Americas: {
    label: "Americas",
    color: "#0d9488"
  }
};

export function MetricsChart() {
  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Area installed</CardTitle>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>(+43%) than last year</span>
          <select className="text-sm border rounded px-2 py-1">
            <option>2023</option>
            <option>2022</option>
          </select>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#0d9488]"></div>
            <span>Asia 1.23k</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#fb923c]"></div>
            <span>Europe 6.79k</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#2dd4bf]"></div>
            <span>Americas 1.01k</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="Americas" 
                stackId="a" 
                fill="#0d9488" 
                radius={[0, 0, 0, 0]}
                animationBegin={0}
                animationDuration={1500}
              />
              <Bar 
                dataKey="Europe" 
                stackId="a" 
                fill="#fb923c" 
                radius={[0, 0, 0, 0]}
                animationBegin={200}
                animationDuration={1500}
              />
              <Bar 
                dataKey="Asia" 
                stackId="a" 
                fill="#2dd4bf" 
                radius={[4, 4, 0, 0]}
                animationBegin={400}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
