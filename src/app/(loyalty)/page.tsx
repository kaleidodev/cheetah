"use client";

import {
  ChevronDown,
  Copy,
  GripIcon,
  House,
  List,
  Plus,
  Search,
  Tag,
  Trash2,
  Rocket,
  X,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { offerItems } from "@/lib/offers/types";
import { OffersGrid } from "./_components/offers-grid";
import { OffersList } from "./_components/offers-list";

function ToolbarInput({ placeholder }: { placeholder: string }) {
  return (
    <Input
      placeholder={placeholder}
      className="h-10 rounded border border-[#c7ced2] bg-[#f3f5f6] px-3 text-[15px] font-medium text-[#6f7c83] placeholder:text-[#a5afb5] shadow-none focus-visible:ring-0"
    />
  );
}

function ToolbarSelect({ label, wide }: { label: string; wide?: boolean }) {
  return (
    <button
      type="button"
      className={`inline-flex h-10 items-center justify-between rounded border border-[#a8b1b6] bg-white px-3 text-[16px] font-semibold text-[#458479] ${wide ? "min-w-[170px]" : "min-w-[122px]"} hover:bg-[#f8fafb]`}
    >
      <span>{label}</span>
      <ChevronDown className="ml-2 size-4 text-[#66767d]" />
    </button>
  );
}

export default function CampaignsPage() {
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  return (
    <div className="flex h-full min-h-0 flex-col bg-white px-10 py-8">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h1 className="text-[48px] leading-none font-bold tracking-tight text-[#3c474d] lg:text-[38px]">Offers</h1>
          <p className="mt-4 text-[31px] leading-none font-medium tracking-tight text-[#afbbc1] lg:text-[16px]">
            Offers are promotions presented to members. Use this screen to create, target, and manage offers.
          </p>
        </div>
        <div className="mt-12 flex items-center text-[20px] font-semibold tracking-tight text-[#a8b3b9] lg:text-[16px]">
          <Rocket className="mr-1.5 size-4" />
          ACTIONS
          <ChevronDown className="ml-1 size-4" strokeWidth={5} absoluteStrokeWidth={true} />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-[220px]">
            <ToolbarInput placeholder="Enter Display name" />
          </div>
          <Select>
            <SelectTrigger className="h-10! min-w-[170px] rounded border border-[#c7ced2] bg-[#f3f5f6] px-3 text-[15px] font-medium text-[#a5afb5] shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 data-placeholder:text-[#a5afb5]">
              <SelectValue placeholder="Select Offer Type" />
            </SelectTrigger>
          </Select>
          <Button
            variant="outline"
            className="h-10 min-h-10 rounded border-[#aeb6bb] bg-[#eceeef] px-4 text-[15px] font-semibold leading-none text-[#adb6bc] hover:bg-[#e5e8ea]"
          >
            <Plus className="mr-2 size-4" />
            Create Offer
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="w-[220px]">
            <ToolbarInput placeholder="Search" />
          </div>
          <ToolbarSelect label="Any Status" />
          <ToolbarSelect label="Any Effectivity" />
          <ToolbarSelect label="Sort by Display name" wide />
          <Button variant="outline" size="icon" className="size-10 rounded border-[#5ca5a4] bg-[#def2ef]">
            <Search className="size-7" strokeWidth={2} absoluteStrokeWidth={true} />
          </Button>
          <Button variant="outline" size="icon" className="size-10 rounded border-[#5ca5a4] bg-[#def2ef]">
            <X className="size-7" strokeWidth={5} absoluteStrokeWidth={true} />
          </Button>
        </div>
      </div>

      <div className="mb-5 flex items-center">
        <button
          type="button"
          onClick={() => setLayout("grid")}
          className={`inline-flex h-10 items-center rounded-l-lg px-2 text-[16px] font-semibold tracking-tight ${
            layout === "grid"
              ? "border-2 border-[#2ea6a9] bg-[#dff1f2] text-[#3a737d]"
              : "border border-[#d2d8dc] bg-[#f2f4f5] text-[#aeb7bc]"
          }`}
        >
          <GripIcon className="mr-2 size-4" />
          Grid layout
        </button>
        <button
          type="button"
          onClick={() => setLayout("list")}
          className={`inline-flex h-10 items-center rounded-r-lg px-2 text-[16px] font-semibold tracking-tight ${
            layout === "list"
              ? "border-2 border-[#2ea6a9] bg-[#dff1f2] text-[#3a737d]"
              : "border border-[#d2d8dc] bg-[#f2f4f5] text-[#aeb7bc]"
          }`}
        >
          <List className="mr-2 size-4" />
          List layout
        </button>
      </div>

      <div className="min-h-0 flex-1">
        {layout === "grid" ? <OffersGrid items={offerItems} /> : <OffersList items={offerItems} />}
      </div>
    </div>
  );
}
