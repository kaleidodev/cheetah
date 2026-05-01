"use client";

import { CalendarDays, Eye, EyeOff } from "lucide-react";
import { useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DateRange } from "react-day-picker";

const trendData = [
  { date: "OCT 14", issued: 2500, clipped: 2000, redeemed: 2000 },
  { date: "OCT 15", issued: 3500, clipped: 2600, redeemed: 2300 },
  { date: "OCT 16", issued: 5200, clipped: 3100, redeemed: 3200 },
  { date: "OCT 17", issued: 9000, clipped: 5000, redeemed: 7000 },
  { date: "OCT 18", issued: 16800, clipped: 8600, redeemed: 19900 },
];

const chartConfig = {
  issued: { label: "Issued", color: "#2ab0b1" },
  clipped: { label: "Clipped", color: "#efa92e" },
  redeemed: { label: "Redeemed", color: "#4e88e5" },
};

const metricBlocks = [
  { key: "audience", label: "Audience", value: 673, percent: null, color: "#c3c8ce", icon: null },
  { key: "issued", label: "Issued", value: 486, percent: "80%", color: "#5db8b7", icon: "off" },
  { key: "clipped", label: "Clipped", value: 286, percent: "80%", color: "#efb53f", icon: "off" },
  { key: "redeemed", label: "Redeemed", value: 183, percent: "80%", color: "#6998dd", icon: "on" },
] as const;

export function DashboardContent() {
  const initialRange: DateRange = { from: new Date(2023, 9, 14), to: new Date(2023, 9, 18) };
  const [summaryView, setSummaryView] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(initialRange);
  const [draftRange, setDraftRange] = useState<DateRange | undefined>(initialRange);

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
  };

  const rangeLabel = range?.from && range?.to ? `${formatDate(range.from)} - ${formatDate(range.to)}` : "Select date range";

  return (
    <div className="mt-3 space-y-3">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="overview">
          <TabsList className="h-auto gap-0 bg-transparent p-0">
            <TabsTrigger
              value="overview"
              className="inline-flex h-10 rounded-l-lg rounded-r-none border border-[#d2d8dc] bg-[#f2f4f5] px-4 text-[12px] font-semibold tracking-tight text-[#aeb7bc] data-active:border-2 data-active:border-[#2ea6a9] data-active:bg-[#dff1f2] data-active:text-[#3a737d] data-active:shadow-none after:hidden"
            >
              Performance Overview
            </TabsTrigger>
            <TabsTrigger
              value="engagement"
              className="inline-flex h-10 rounded-r-lg rounded-l-none border border-[#d2d8dc] bg-[#f2f4f5] px-4 text-[12px] font-semibold tracking-tight text-[#aeb7bc] data-active:border-2 data-active:border-[#2ea6a9] data-active:bg-[#dff1f2] data-active:text-[#3a737d] data-active:shadow-none after:hidden"
            >
              Engagement Insights
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 text-[11px] text-[#3f4a4f]">
          <span>Summary View</span>
          <Switch checked={summaryView} onCheckedChange={setSummaryView} size="sm" className="data-checked:bg-[#23a8a9]" />
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger className="inline-flex h-6 items-center gap-1 rounded border border-[#cfd7db] bg-white px-2 text-[10px] text-[#59656c]">
              {rangeLabel}
              <CalendarDays className="size-3" />
            </PopoverTrigger>
            <PopoverContent align="end" sideOffset={8} className="w-[760px] gap-0 overflow-hidden rounded border border-[#d8dfe3] bg-white p-0">
              <div className="grid grid-cols-[120px_1fr]">
                <div className="border-r border-[#e0e5e8] bg-[#f7f8f9] py-2 text-[10px] text-[#5f6b72]">
                  {[
                    "Today",
                    "Yesterday",
                    "Last 7 Days",
                    "Last 30 Days",
                    "Last 90 Days",
                    "This Month",
                    "Custom",
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`flex h-7 w-full items-center px-3 text-left ${item === "Custom" ? "bg-[#c8eaea] text-[#0d7f86] font-semibold" : "hover:bg-[#eef2f4]"}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div>
                  <div className="p-3">
                    <Calendar
                      mode="range"
                      numberOfMonths={2}
                      selected={draftRange}
                      onSelect={setDraftRange}
                      defaultMonth={draftRange?.from}
                      className="w-full p-0 [&_button[data-range-start=true]]:rounded-full [&_button[data-range-end=true]]:rounded-full [&_button[data-selected-single=true]]:rounded-full [&_button[data-range-start=true]]:bg-[#499a99] [&_button[data-range-end=true]]:bg-[#499a99] [&_button[data-selected-single=true]]:bg-[#499a99] [&_button[data-range-middle=true]]:bg-[#def2ef] [&_button[data-range-middle=true]]:text-[#2f5151] [&_button[data-range-start=true]]:text-white [&_button[data-range-end=true]]:text-white [&_button[data-selected-single=true]]:text-white"
                      classNames={{
                        range_start:
                          "relative isolate z-0 bg-transparent after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-[#def2ef] last:after:hidden",
                        range_middle: "rounded-none bg-transparent",
                        range_end:
                          "relative isolate z-0 bg-transparent after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-[#def2ef] first:after:hidden",
                        today: "bg-transparent text-inherit",
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-[#e0e5e8] px-3 py-2 text-[10px] text-[#5f6b72]">
                    <div className="flex items-center gap-2">
                      <span>End Date</span>
                      <Switch checked size="sm" className="data-checked:bg-[#23a8a9]" />
                    </div>
                    <div>{draftRange?.from && draftRange?.to ? `${formatDate(draftRange.from)} - ${formatDate(draftRange.to)}` : ""}</div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setDraftRange(range);
                          setDateOpen(false);
                        }}
                        className="h-7 rounded border border-[#cfd7db] bg-white px-3 text-[10px] text-[#44616b]"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setRange(draftRange);
                          setDateOpen(false);
                        }}
                        className="h-7 rounded border border-[#7fc6c5] bg-[#dff2ef] px-3 text-[10px] text-[#1c7d83]"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <PerformanceOverview summaryView={summaryView} />

      <button type="button" className="inline-flex w-fit items-center text-[13px] font-medium text-[#0a8a8f]">
        Back to offers
      </button>
    </div>
  );
}

export function PerformanceOverview({ summaryView }: { summaryView: boolean }) {
  const blockHeights = useMemo(() => {
    const values = metricBlocks.map((item) => item.value);
    const max = Math.max(...values);
    const min = Math.min(...values);

    return metricBlocks.map((item) => {
      if (max === min) {
        return 60;
      }
      const ratio = (item.value - min) / (max - min);
      return 28 + ratio * 34;
    });
  }, []);

  const areaPaths = useMemo(() => {
    const width = 1000;
    const height = 86;
    const segWidth = width / metricBlocks.length;
    const curveWidth = 52;

    return metricBlocks.map((_, index) => {
      const x0 = index * segWidth;
      const x1 = (index + 1) * segWidth;
      const y0 = height - blockHeights[index];
      const y1 = index < metricBlocks.length - 1 ? height - blockHeights[index + 1] : y0;

      if (index < metricBlocks.length - 1) {
        const curveStart = x1 - curveWidth;
        const c1x = curveStart + curveWidth * 0.35;
        const c2x = curveStart + curveWidth * 0.7;
        return `M ${x0} ${height} L ${x0} ${y0} L ${curveStart} ${y0} C ${c1x} ${y0}, ${c2x} ${y1}, ${x1} ${y1} L ${x1} ${height} Z`;
      }

      return `M ${x0} ${height} L ${x0} ${y0} L ${x1} ${y0} L ${x1} ${height} Z`;
    });
  }, [blockHeights]);
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <Card className="h-[124px] rounded-none bg-[#f3f4f5] py-4 shadow-none ring-1 ring-[#e0e5e8]">
          <CardContent className="px-4 text-center">
            <div className="text-[11px] text-[#5f6b72]">Purchases</div>
            <div className="mt-4 text-[42px] leading-none text-[#2f363b]">836</div>
          </CardContent>
        </Card>
        <Card className="h-[124px] rounded-none bg-[#f3f4f5] py-4 shadow-none ring-1 ring-[#e0e5e8]">
          <CardContent className="px-4 text-center">
            <div className="text-[11px] text-[#5f6b72]">Revenue</div>
            <div className="mt-4 text-[42px] leading-none text-[#2f363b]">$138,270</div>
          </CardContent>
        </Card>
        <Card className="h-[124px] rounded-none bg-[#f3f4f5] py-4 shadow-none ring-1 ring-[#e0e5e8]">
          <CardContent className="px-4 text-center">
            <div className="text-[11px] text-[#5f6b72]">AOV</div>
            <div className="mt-4 text-[42px] leading-none text-[#2f363b]">$165.39</div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-sm border border-[#d9dfe3] bg-white">
        <div className="grid grid-cols-4 border-b border-[#d9dfe3]">
          {metricBlocks.map((item) => (
            <div key={item.key} className="border-r border-[#d9dfe3] px-3 py-2 last:border-r-0">
              <div className="flex items-center justify-between text-[10px] text-[#5f6b72]">
                <span>{item.label}</span>
                {item.icon === "off" && <EyeOff className="size-3 text-[#68757c]" />}
                {item.icon === "on" && <Eye className="size-3 text-[#68757c]" />}
              </div>
              <div className="mt-1 text-[37px] leading-none text-[#2f363b]">{item.value}</div>
              {item.percent ? <div className="mt-1 text-[10px] text-[#5f6b72]">{item.percent}</div> : <div className="mt-1 h-[14px]" />}
            </div>
          ))}
        </div>

        <div className="relative h-[86px] overflow-hidden border-b border-[#d9dfe3] bg-[#f5f6f7]">
          <svg viewBox="0 0 1000 86" preserveAspectRatio="none" className="h-full w-full">
            {metricBlocks.map((item, index) => (
              <path key={item.key} d={areaPaths[index]} fill={item.color} />
            ))}
          </svg>
          <div className="pointer-events-none absolute inset-0 grid grid-cols-4">
            {metricBlocks.map((item) => (
              <div key={`${item.key}-divider`} className="border-r border-[#d9dfe3] last:border-r-0" />
            ))}
          </div>
        </div>

        {!summaryView ? (
          <div className="p-3 pb-1">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={trendData} margin={{ top: 12, right: 10, left: 8, bottom: 10 }}>
                <CartesianGrid vertical={false} stroke="#edf1f3" />
                <XAxis dataKey="date" tickLine={false} axisLine={{ stroke: "#d7dee2" }} tick={{ fontSize: 10, fill: "#8a959b" }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "#8a959b" }}
                  tickFormatter={(value) => (value === 0 ? "0" : `${Math.round(value / 1000)}k`)}
                />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <Line type="monotone" dataKey="issued" stroke="var(--color-issued)" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 3 }} />
                <Line type="monotone" dataKey="clipped" stroke="var(--color-clipped)" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 3 }} />
                <Line type="monotone" dataKey="redeemed" stroke="var(--color-redeemed)" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 3 }} />
              </LineChart>
            </ChartContainer>
            <div className="mt-1 flex items-center gap-5 px-2 pb-2 text-[10px] text-[#4f5f66]">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 bg-[#2ab0b1]" />Issued
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="size-2 bg-[#efa92e]" />Clipped
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="size-2 bg-[#4e88e5]" />Redeemed
              </span>
            </div>
          </div>
        ) : (
          <div className="p-3">
            <div className="max-h-[220px] overflow-y-auto rounded border border-[#dfe4e7]">
              <Table className="text-[10px]">
                <TableHeader>
                  <TableRow className="bg-[#f1f3f4] hover:bg-[#f1f3f4]">
                    <TableHead className="h-7 text-[10px] font-semibold text-[#4f5f66]">Date</TableHead>
                    <TableHead className="h-7 text-[10px] font-semibold text-[#4f5f66]">Issued</TableHead>
                    <TableHead className="h-7 text-[10px] font-semibold text-[#4f5f66]">Clipped</TableHead>
                    <TableHead className="h-7 text-[10px] font-semibold text-[#4f5f66]">Redeemed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>10/14/2023</TableCell>
                    <TableCell>2500</TableCell>
                    <TableCell>2000</TableCell>
                    <TableCell>2000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>10/15/2023</TableCell>
                    <TableCell>1500</TableCell>
                    <TableCell>1000</TableCell>
                    <TableCell>1000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>10/16/2023</TableCell>
                    <TableCell>1000</TableCell>
                    <TableCell>500</TableCell>
                    <TableCell>500</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>10/17/2023</TableCell>
                    <TableCell>2000</TableCell>
                    <TableCell>800</TableCell>
                    <TableCell>800</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>10/18/2023</TableCell>
                    <TableCell>486</TableCell>
                    <TableCell>286</TableCell>
                    <TableCell>183</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </>
  )
}