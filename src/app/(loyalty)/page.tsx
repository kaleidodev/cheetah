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
import { useRouter } from "next/navigation";
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

const offerTypeOptions = [
  { value: "no-action", label: "No Action" },
  { value: "barcode", label: "Barcode" },
  { value: "certificate", label: "Certificate" },
  { value: "coupon", label: "Coupon" },
  { value: "url", label: "URL" },
  { value: "content", label: "Content" },
];

export default function CampaignsPage() {
  const router = useRouter();
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [offerType, setOfferType] = useState<string | null>(null);
  const [createOfferActive, setCreateOfferActive] = useState(false);

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
          <Select value={offerType} onValueChange={setOfferType}>
            <SelectTrigger className="h-10! min-w-[170px] rounded border border-[#c7ced2] bg-[#f3f5f6] px-3 text-[15px] font-medium text-[#a5afb5] shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 data-placeholder:text-[#a5afb5] data-[state=open]:border-[#5ca5a4] data-[state=open]:bg-[#def2ef]">
              <SelectValue placeholder="Select Offer Type" />
            </SelectTrigger>
            <SelectContent
              alignItemWithTrigger={false}
              side="bottom"
              align="start"
              className="min-w-[170px] rounded border border-[#d6dde1] bg-white p-0"
            >
              {offerTypeOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer rounded-none px-3 py-1.5 text-[14px] text-[#5f6d75] focus:bg-[#def2ef] focus:text-[#4e7981] data-[state=checked]:bg-[#def2ef] data-[state=checked]:text-[#4e7981]"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="outline"
            onMouseEnter={() => setCreateOfferActive(true)}
            onMouseLeave={() => setCreateOfferActive(false)}
            onMouseDown={() => setCreateOfferActive(true)}
            onMouseUp={() => setCreateOfferActive(false)}
            onClick={() => router.push("/create")}
            className={`h-10 min-h-10 rounded border px-3 text-[14px] font-semibold leading-none transition-colors ${
              createOfferActive
                ? "border-[#5ca5a4] bg-[#def2ef]! text-[#2f757a]"
                : "border-[#aeb6bb] bg-[#eceeef] text-[#8f9aa1] hover:border-[#5ca5a4] hover:bg-[#dff1f2] hover:text-[#2f757a]"
            }`}
          >
            <Plus className={`mr-1 size-4 ${createOfferActive ? "text-[#2f757a]" : "text-[#8f9aa1]"}`} />
            <span className={`${createOfferActive ? "text-[#2f757a]" : "text-[#8f9aa1]"}`}>Create Offer</span>
            <ChevronDown className={`ml-1 size-3 ${createOfferActive ? "text-[#2f757a]" : "text-[#8f9aa1]"}`} />
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
