"use client";

import { CalendarDays, ChevronLeft, Eye, EyeOff, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { Bar, CartesianGrid, ComposedChart, Line, LineChart, XAxis, YAxis } from "recharts";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const engagementData = [
  { date: "OCT 14", purchaseCurrent: 780, purchaseCompare: 400, revenueCurrent: 0, revenueCompare: 0 },
  { date: "OCT 15", purchaseCurrent: 900, purchaseCompare: 560, revenueCurrent: 7600, revenueCompare: 6800 },
  { date: "OCT 16", purchaseCurrent: 1450, purchaseCompare: 1150, revenueCurrent: 16500, revenueCompare: 12800 },
  { date: "OCT 17", purchaseCurrent: 790, purchaseCompare: 560, revenueCurrent: 10400, revenueCompare: 11800 },
  { date: "OCT 18", purchaseCurrent: 770, purchaseCompare: 500, revenueCurrent: 5600, revenueCompare: 7400 },
];

const engagementChartConfig = {
  revenueCurrent: { label: "Revenue (Current Offer)", color: "#2ab0b1" },
  revenueCompare: { label: "Revenue (Offer_02)", color: "#f1a529" },
  purchaseCurrent: { label: "Purchases (Current Offer)", color: "#6a95d8" },
  purchaseCompare: { label: "Purchases (Offer_02)", color: "#8fbc7d" },
};

const metricBlocks = [
  { key: "audience", label: "Audience", value: 673, percent: null, color: "#c3c8ce", icon: null },
  { key: "issued", label: "Issued", value: 486, percent: "80%", color: "#5db8b7", icon: "off" },
  { key: "clipped", label: "Clipped", value: 286, percent: "80%", color: "#efb53f", icon: "off" },
  { key: "redeemed", label: "Redeemed", value: 183, percent: "80%", color: "#6998dd", icon: "on" },
] as const;

function DateRangePopover({
  rangeLabel,
  dateOpen,
  setDateOpen,
  draftRange,
  setDraftRange,
  range,
  setRange,
  formatDate,
  months,
}: {
  rangeLabel: string;
  dateOpen: boolean;
  setDateOpen: (open: boolean) => void;
  draftRange: DateRange | undefined;
  setDraftRange: (range: DateRange | undefined) => void;
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
  formatDate: (date?: Date) => string;
  months: 1 | 2;
}) {
  return (
    <Popover open={dateOpen} onOpenChange={setDateOpen}>
      <PopoverTrigger className="inline-flex h-8 w-full items-center justify-between gap-1 rounded border border-[#cfd7db] bg-white px-2 text-[10px] text-[#59656c] sm:h-6 sm:w-auto sm:justify-start">
        {rangeLabel}
        <CalendarDays className="size-3" />
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-[calc(100vw-2rem)] max-w-[760px] gap-0 overflow-hidden rounded border border-[#d8dfe3] bg-white p-0 sm:w-auto">
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr]">
          <div className="border-b border-[#e0e5e8] bg-[#f7f8f9] py-2 text-[10px] text-[#5f6b72] md:border-r md:border-b-0">
            {["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "Last 90 Days", "This Month", "Custom"].map((item) => (
              <button
                key={item}
                type="button"
                className={`flex h-7 w-full items-center px-3 text-left ${item === "Custom" ? "bg-[#c8eaea] font-semibold text-[#0d7f86]" : "hover:bg-[#eef2f4]"}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div>
            <div className="p-3">
              <Calendar
                mode="range"
                numberOfMonths={months}
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

            <div className="flex flex-col gap-3 border-t border-[#e0e5e8] px-3 py-2 text-[10px] text-[#5f6b72] md:flex-row md:items-center md:justify-between md:gap-2">
              <div className="flex items-center gap-2">
                <span>End Date</span>
                <Switch checked size="sm" className="data-checked:bg-[#23a8a9]" />
              </div>
              <div className="break-words">{draftRange?.from && draftRange?.to ? `${formatDate(draftRange.from)} - ${formatDate(draftRange.to)}` : ""}</div>
              <div className="flex items-center gap-2 self-end md:self-auto">
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
  );
}

export function DashboardContent() {
  const router = useRouter();
  const initialRange: DateRange = { from: new Date(2023, 9, 14), to: new Date(2023, 9, 18) };
  const [summaryView, setSummaryView] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(initialRange);
  const [draftRange, setDraftRange] = useState<DateRange | undefined>(initialRange);
  const [insightTab, setInsightTab] = useState<"overview" | "engagement">("overview");
  const [calendarMonths, setCalendarMonths] = useState<1 | 2>(2);

  useEffect(() => {
    const updateCalendarMonths = () => setCalendarMonths(window.innerWidth < 768 ? 1 : 2);
    updateCalendarMonths();
    window.addEventListener("resize", updateCalendarMonths);
    return () => window.removeEventListener("resize", updateCalendarMonths);
  }, []);

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
  };

  const rangeLabel = range?.from && range?.to ? `${formatDate(range.from)} - ${formatDate(range.to)}` : "Select date range";

  return (
    <div className="mt-3 space-y-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Tabs value={insightTab} onValueChange={(value) => setInsightTab(value as "overview" | "engagement")} className="w-full lg:w-auto">
          <TabsList className="grid h-auto w-full grid-cols-1 gap-2 bg-transparent p-0 sm:grid-cols-2 sm:gap-0">
            <TabsTrigger
              value="overview"
              className="inline-flex h-10 rounded-lg border border-[#d2d8dc] bg-[#f2f4f5] px-4 text-[12px] font-semibold tracking-tight text-[#aeb7bc] data-active:border-2 data-active:border-[#2ea6a9] data-active:bg-[#dff1f2] data-active:text-[#3a737d] data-active:shadow-none after:hidden sm:rounded-l-lg sm:rounded-r-none"
            >
              Performance Overview
            </TabsTrigger>
            <TabsTrigger
              value="engagement"
              className="inline-flex h-10 rounded-lg border border-[#d2d8dc] bg-[#f2f4f5] px-4 text-[12px] font-semibold tracking-tight text-[#aeb7bc] data-active:border-2 data-active:border-[#2ea6a9] data-active:bg-[#dff1f2] data-active:text-[#3a737d] data-active:shadow-none after:hidden sm:rounded-r-lg sm:rounded-l-none"
            >
              Engagement Insights
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col gap-2 text-[11px] text-[#3f4a4f] sm:flex-row sm:flex-wrap sm:items-center lg:justify-end">
          {insightTab === "overview" && (
            <div className="flex items-center justify-between rounded border border-[#d8dde0] bg-white px-3 py-2 sm:border-0 sm:bg-transparent sm:p-0">
              <span>Summary View</span>
              <Switch checked={summaryView} onCheckedChange={setSummaryView} size="sm" className="data-checked:bg-[#23a8a9]" />
            </div>
          )}
          <div className="w-full sm:w-auto">
            <DateRangePopover
              rangeLabel={rangeLabel}
              dateOpen={dateOpen}
              setDateOpen={setDateOpen}
              draftRange={draftRange}
              setDraftRange={setDraftRange}
              range={range}
              setRange={setRange}
              formatDate={formatDate}
              months={calendarMonths}
            />
          </div>
        </div>
      </div>

      {insightTab === "overview" ? <PerformanceOverview summaryView={summaryView} /> : <EngagementInsights />}

      <button type="button" onClick={() => router.back()} className="inline-flex w-fit items-center text-[13px] font-medium text-[#0a8a8f]">
        <ChevronLeft className="mr-1 size-4" />
        Back to offers
      </button>
    </div>
  );
}

export function EngagementInsights() {
  const [compareType, setCompareType] = useState("offer-to-offer");
  const [compareOffer, setCompareOffer] = useState("offer-02");

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="w-full sm:w-auto">
          <div className="mb-1 text-[12px] font-semibold text-[#4f5f66]">Compare</div>
          <Select value={compareType} onValueChange={(value) => setCompareType(value ?? "offer-to-offer")}>
            <SelectTrigger className="h-9 w-full sm:w-[170px] rounded border border-[#d3d9dd] bg-white text-[12px] text-[#5b676d]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} side="bottom" align="start" className="w-[170px] text-[12px]">
              <SelectItem value="offer-to-offer">Offer to Offer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-[170px]">
          <Select value={compareOffer} onValueChange={(value) => setCompareOffer(value ?? "offer-02")}>
            <SelectTrigger className="h-9 w-full sm:w-[170px] rounded border border-[#d3d9dd] bg-white text-[12px] text-[#5b676d]">
              <SelectValue placeholder="Select a offer" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} side="bottom" align="start" className="w-[170px] rounded border border-[#d9dfe3] p-0 text-[12px]">
              <div className="flex h-8 items-center border-b border-[#e2e7ea] px-2 text-[#8b959b]">
                <span className="text-[12px]">Search Offer name</span>
                <Search className="ml-auto size-3" />
              </div>
              <SelectItem value="offer-01" className="rounded-none px-3 py-1.5 text-[12px]">Offer_01</SelectItem>
              <SelectItem value="offer-02" className="rounded-none px-3 py-1.5 text-[12px]">Offer_02</SelectItem>
              <SelectItem value="offer-03" className="rounded-none px-3 py-1.5 text-[12px]">Offer_03</SelectItem>
              <SelectItem value="offer-04" className="rounded-none px-3 py-1.5 text-[12px]">Offer_04</SelectItem>
              <SelectItem value="offer-05" className="rounded-none px-3 py-1.5 text-[12px]">Offer_05</SelectItem>
              <SelectItem value="offer-06" className="rounded-none px-3 py-1.5 text-[12px]">Offer_06</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded border border-[#d9dfe3] bg-white">
        <Table className="text-[12px]">
          <TableHeader>
            <TableRow className="bg-[#eef1f2] hover:bg-[#eef1f2]">
              <TableHead className="h-7 w-[170px] text-[12px] text-[#4f5f66]" />
              <TableHead className="h-7 text-[12px] text-[#4f5f66]">Purchases</TableHead>
              <TableHead className="h-7 text-[12px] text-[#4f5f66]">Revenue</TableHead>
              <TableHead className="h-7 text-[12px] text-[#4f5f66]">AOV</TableHead>
              <TableHead className="h-7 text-[12px] text-[#4f5f66]">Lift</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Current offer</TableCell>
              <TableCell>1272</TableCell>
              <TableCell>$236,540</TableCell>
              <TableCell>$185.92</TableCell>
              <TableCell className="text-[#99a4ab]">No offer selected</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Offer_02</TableCell>
              <TableCell>626</TableCell>
              <TableCell>$68,865</TableCell>
              <TableCell>$110.01</TableCell>
              <TableCell className="text-[#2ea65f]">↗ $167,675</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="border-t border-[#d9dfe3] p-3">
          <div className="overflow-x-auto">
            <ChartContainer config={engagementChartConfig} className="h-[280px] min-w-[560px] w-full sm:h-[300px]">
              <ComposedChart data={engagementData} margin={{ top: 14, right: 14, left: 8, bottom: 16 }}>
                <CartesianGrid vertical={false} stroke="#edf1f3" />
                <XAxis dataKey="date" tickLine={false} axisLine={{ stroke: "#d7dee2" }} tick={{ fontSize: 10, fill: "#8a959b" }} />
                <YAxis yAxisId="left" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#8a959b" }} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "#8a959b" }}
                  tickFormatter={(v) => (v === 0 ? "0" : `${Math.round(v / 1000)}k`)}
                />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <Bar yAxisId="left" dataKey="purchaseCurrent" fill="#6a95d8" barSize={30} />
                <Bar yAxisId="left" dataKey="purchaseCompare" fill="#8fbc7d" barSize={30} />
                <Line yAxisId="right" type="monotone" dataKey="revenueCurrent" stroke="#2ab0b1" strokeWidth={2} dot={{ r: 2 }} />
                <Line yAxisId="right" type="monotone" dataKey="revenueCompare" stroke="#f1a529" strokeWidth={2} dot={{ r: 2 }} />
              </ComposedChart>
            </ChartContainer>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-3 px-2 pb-1 text-[10px] text-[#4f5f66] md:gap-5">
            <span className="inline-flex items-center gap-1">
              <span className="size-2 bg-[#2ab0b1]" />Revenue (Current Offer)
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="size-2 bg-[#f1a529]" />Revenue (Offer_02)
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="size-2 bg-[#6a95d8]" />Purchases (Current Offer)
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="size-2 bg-[#8fbc7d]" />Purchases (Offer_02)
            </span>
          </div>
        </div>
      </div>
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
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="grid grid-cols-2 border-b border-[#d9dfe3] lg:grid-cols-4">
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
          <svg viewBox="0 0 1000 86" preserveAspectRatio="none" className="h-full w-full" aria-label="Offer metrics overview">
            <title>Offer metrics overview</title>
            {metricBlocks.map((item, index) => (
              <path key={item.key} d={areaPaths[index]} fill={item.color} />
            ))}
          </svg>
          <div className="pointer-events-none absolute inset-0 grid grid-cols-2 lg:grid-cols-4">
            {metricBlocks.map((item) => (
              <div key={`${item.key}-divider`} className="border-r border-[#d9dfe3] last:border-r-0" />
            ))}
          </div>
        </div>

        {!summaryView ? (
          <div className="p-3 pb-1">
            <div className="overflow-x-auto">
              <ChartContainer config={chartConfig} className="h-[300px] min-w-[560px] w-full">
                <LineChart data={trendData} margin={{ top: 12, right: 10, left: 8, bottom: 16 }}>
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
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3 px-2 pb-2 text-[10px] text-[#4f5f66] md:gap-5">
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
  );
}
