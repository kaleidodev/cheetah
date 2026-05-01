"use client";

import {
  ChevronDown,
  ChevronLeft,
  Copy,
  Globe,
  Pencil,
  Play,
  Trash2,
  Upload,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardContent } from "./_components/dashboard";
import { DefinitionContent } from "./_components/definition";

const tabs = [
  "Definition",
  "Certificates",
  "Display",
  "Eligibility",
  "Advanced Options",
  "Responses",
  "Translations",
  "Dashboard",
  "Used By",
];

export default function CreateOfferPage() {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white px-8 py-6 text-[#3f4a4f]">
      <h1 className="text-[22px] leading-none font-bold tracking-tight">July 5% Off</h1>

      <button type="button" className="mt-3 inline-flex w-fit items-center text-[13px] font-medium text-[#0a8a8f]">
        <ChevronLeft className="mr-1 size-4" />
        Back to offers
      </button>

      <div className="mt-4 rounded-sm bg-[#f3f4f5] p-4">
        <div className="flex flex-wrap items-start gap-5">
          <div className="w-[90px] border border-[#c9ced2] bg-white">
            <div className="h-9 bg-[#c8c8c8]" />
            <div className="flex h-11 flex-col items-center justify-center bg-[#979797] text-white">
              <Upload className="size-4" />
              <span className="mt-1 text-[10px] font-semibold">Upload</span>
            </div>
          </div>

          <div className="min-w-[220px] flex-1">
            <h2 className="text-[13px] font-semibold text-[#3f4a4f]">July 5% Off</h2>
            <p className="mt-2 text-[13px] text-[#7f888d]">No Description Available</p>
            <div className="mt-2 inline-flex items-center text-[12px] text-[#6f7d83]">
              <span className="mr-2">🎁</span>
              Coupon
            </div>
          </div>

          <div className="border-l border-[#c8d0d4] pl-5 pr-4">
            <button type="button" className="inline-flex items-center text-[13px] text-[#007f8d]">
              <Globe className="mr-2 size-4" />
              English
              <ChevronDown className="ml-2 size-4" />
            </button>
          </div>

          <div className="min-w-[250px]">
            <div className="flex items-center text-[12px]">
              <span className="mr-3 text-[#656f74]">Status:</span>
              <button
                type="button"
                className="inline-flex h-6 items-center rounded border border-[#5ca5a4] bg-[#c9ece6] px-2 text-[11px] font-semibold text-[#2f757a]"
              >
                <span className="mr-2 inline-block size-2 rounded-full border border-[#2f757a]" />
                Draft
                <ChevronDown className="ml-2 size-3" />
              </button>
            </div>

            <div className="mt-2 text-[12px] text-[#b3bbbf]">
              <span className="mr-2 text-[#1da16f]">◉</span>
              Published: April 10, 2024 9:03 PM (CDT)
            </div>

            <div className="mt-2 inline-flex items-center text-[12px] text-[#4a5960]">
              <Play className="mr-2 size-3" />
              Always
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4 pt-1 text-[#66757c]">
            <Pencil className="size-4" />
            <Copy className="size-4" />
            <Trash2 className="size-4" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="Definition" className="mt-4">
        <TabsList variant="line" className="grid h-auto w-full grid-cols-9 gap-0 border-b border-[#d5dcdf] p-0 text-[12px] text-[#8b969c]">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="h-auto w-full rounded-none px-1 pb-2 text-center text-[12px] font-medium text-[#8b969c] data-active:text-[#445057] after:-bottom-px after:bg-[#2aa8a8]"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="Definition">
          <DefinitionContent />
        </TabsContent>

        <TabsContent value="Dashboard">
          <DashboardContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
