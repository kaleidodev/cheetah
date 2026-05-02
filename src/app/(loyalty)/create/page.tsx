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
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <div className="flex h-full min-h-0 flex-col bg-white px-4 py-4 text-[#3f4a4f] sm:px-6 sm:py-5 lg:px-8 lg:py-6">
      <h1 className="text-[22px] leading-none font-bold tracking-tight">July 5% Off</h1>

      <button type="button" onClick={() => router.back()} className="mt-3 inline-flex w-fit items-center text-[13px] font-medium text-[#0a8a8f]">
        <ChevronLeft className="mr-1 size-4" />
        Back to offers
      </button>

      <div className="mt-4 rounded-sm bg-[#f3f4f5] p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5 lg:min-w-0 lg:flex-1">
            <label className="block w-[90px] shrink-0 cursor-pointer border border-[#c9ced2] bg-white">
              <input type="file" accept="image/*" className="hidden" />
              <div className="h-9 bg-[#c8c8c8]" />
              <div className="flex h-11 flex-col items-center justify-center bg-[#979797] text-white">
                <Upload className="size-4" />
                <span className="mt-1 text-[10px] font-semibold">Upload</span>
              </div>
            </label>

            <div className="min-w-0 flex-1">
              <h2 className="text-[13px] font-semibold text-[#3f4a4f]">July 5% Off</h2>
              <p className="mt-2 text-[13px] text-[#7f888d]">No Description Available</p>
              <div className="mt-2 inline-flex items-center text-[12px] text-[#6f7d83]">
                <span className="mr-2">🎁</span>
                Coupon
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#c8d0d4] pt-3 sm:flex-row sm:flex-wrap sm:items-start sm:border-t-0 sm:pt-0 lg:flex-nowrap">
            <div className="sm:border-l sm:pl-5 sm:pr-4">
              <button type="button" className="inline-flex items-center text-[13px] text-[#007f8d]">
                <Globe className="mr-2 size-4" />
                English
                <ChevronDown className="ml-2 size-4" />
              </button>
            </div>

            <div className="min-w-0 rounded-sm border border-[#d8dde0] bg-white p-3 sm:min-w-[250px] sm:border-0 sm:bg-transparent sm:p-0">
              <div className="flex flex-wrap items-center gap-2 text-[12px]">
                <span className="text-[#656f74]">Status:</span>
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

            <div className="flex items-center justify-end gap-4 border-t border-[#d8dde0] pt-3 text-[#66757c] sm:border-t-0 sm:pt-1 lg:ml-auto">
              <Pencil className="size-4" />
              <Copy className="size-4" />
              <Trash2 className="size-4" />
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="Definition" className="mt-4 min-w-0">
        <div className="border-b border-[#d5dcdf]">
          <TabsList variant="line" className="grid h-auto w-full grid-cols-3 gap-0 p-0 text-[11px] text-[#8b969c] sm:grid-cols-4 sm:text-[12px] md:grid-cols-5 lg:grid-cols-9">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="h-full min-h-11 w-full rounded-none px-2 py-2 text-center text-[11px] leading-tight font-medium whitespace-normal text-[#8b969c] data-active:text-[#445057] after:-bottom-px after:bg-[#2aa8a8] sm:text-[12px] lg:px-1"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

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
