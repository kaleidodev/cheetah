"use client";

import Image from "next/image";
import { ChevronDown, ChevronRight, Lock, Paperclip, Plus } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";

type SectionKey = "offer-details" | "coupon-rules" | "effectivity-periods";

function SectionHeader({
  title,
  open,
  onClick,
}: {
  title: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center border border-[#d5dcdf] bg-[#f3f4f5] px-3 py-2 text-left text-[13px] text-[#59656c]"
    >
      {open ? <ChevronDown className="mr-2 size-4" /> : <ChevronRight className="mr-2 size-4" />}
      <span className="font-medium">{title}</span>
    </button>
  );
}

function SelectLike({ value }: { value: string }) {
  return (
    <div className="flex h-8 items-center justify-between rounded border border-[#d3d9dd] bg-white px-3 text-[11px] text-[#4e5c63]">
      <span>{value}</span>
      <ChevronDown className="size-4 text-[#6d7c83]" />
    </div>
  );
}

function InputLike({ value, placeholder }: { value?: string; placeholder?: string }) {
  return (
    <div className="flex h-8 items-center rounded border border-[#d3d9dd] bg-white px-3 text-[11px] text-[#4e5c63]">
      <span className={value ? "text-[#4e5c63]" : "text-[#a4afb6]"}>{value ?? placeholder}</span>
    </div>
  );
}

function Chip({ value, onRemove }: { value: string; onRemove?: () => void }) {
  return (
    <span className="inline-flex items-center rounded bg-[#bdeceb] px-2 py-0.5 text-[11px] font-semibold text-[#187e83]">
      {value}
      <button type="button" onClick={onRemove} className="ml-2 leading-none">
        ×
      </button>
    </span>
  );
}

function InlineTagField({
  options,
  selected,
  placeholder,
  onChange,
  onRemove,
}: {
  options: string[];
  selected: string[];
  placeholder: string;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}) {
  return (
    <div className="flex min-h-8 flex-wrap items-center gap-2 rounded border border-[#d3d9dd] bg-white px-2 py-1">
      {selected.map((item) => (
        <Chip key={item} value={item} onRemove={() => onRemove(item)} />
      ))}
      <div className="relative min-w-[110px] flex-1">
        <select
          value=""
          onChange={(e) => onChange(e.target.value)}
          className="h-6 w-full appearance-none border-0 bg-transparent pr-6 text-[11px] text-[#4e5c63] outline-none"
        >
          <option value="">{selected.length ? placeholder : `Select ${placeholder.toLowerCase()}`}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-1 size-4 -translate-y-1/2 text-[#6d7c83]" />
      </div>
    </div>
  );
}

function Row({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-[130px_1fr] md:items-center md:gap-3">
      <div className="text-left text-[11px] font-semibold text-[#546167] md:text-right">{label}</div>
      {children}
    </div>
  );
}

function OfferDetailsContent() {
  const categoryOptions = ["COUPONOFFER", "FLASH SALE", "MEMBER ONLY", "DIGITAL DEAL"];
  const tagOptions = ["TRENDING", "SUMMER", "FEATURED", "LIMITED", "WELCOME"];
  const [categories, setCategories] = useState(["COUPONOFFER"]);
  const [tags, setTags] = useState(["FEATURED"]);

  return (
    <div className="border-x border-b border-[#d5dcdf] bg-white p-4">
      <div className="space-y-3">
        <Row
          label={
            <span className="inline-flex items-center gap-1 md:justify-end">
              Display Name
              <Image src="/globe2.svg" alt="globe" width={16} height={16} className="size-4" />
            </span>
          }
        >
          <Input value="July 5% Off" readOnly className="h-8 border-[#d3d9dd] bg-white text-[12px]" />
        </Row>

        <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-[130px_1fr] md:gap-3">
          <div className="pt-0 text-left text-[11px] font-semibold text-[#546167] md:pt-2 md:text-right">
            <span className="inline-flex items-center gap-1 md:justify-end">
              Description
              <Image src="/globe2.svg" alt="globe" width={16} height={16} className="size-4" />
            </span>
          </div>
          <div>
            <textarea
              placeholder="Enter Description"
              className="min-h-[58px] w-full rounded-md border border-[#d3d9dd] bg-white px-3 py-2 text-[12px] placeholder:text-[#adb6bb] outline-none"
            />
            <div className="mt-1 text-right text-[11px] text-[#a5afb5]">0 characters</div>
          </div>
        </div>

        <Row label="Offer action">
          <SelectLike value="Coupon" />
        </Row>

        <Row label="Campaign">
          <SelectLike value="Test" />
        </Row>

        <Row label="Categories">
          <InlineTagField
            options={categoryOptions.filter((item) => !categories.includes(item))}
            selected={categories}
            placeholder=""
            onChange={(value) => {
              if (!value) return;
              setCategories([...categories, value]);
            }}
            onRemove={(value) => setCategories(categories.filter((item) => item !== value))}
          />
        </Row>

        <Row label="Tags">
          <InlineTagField
            options={tagOptions.filter((item) => !tags.includes(item))}
            selected={tags}
            placeholder=""
            onChange={(value) => {
              if (!value) return;
              setTags([...tags, value]);
            }}
            onRemove={(value) => setTags(tags.filter((item) => item !== value))}
          />
        </Row>

        <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-[130px_1fr] md:items-center md:gap-3">
          <div className="text-left text-[11px] font-semibold text-[#546167] md:text-right">Rank</div>
          <div className="grid grid-cols-1 overflow-hidden rounded border border-[#d3d9dd] bg-white text-[11px] sm:grid-cols-[1fr_160px]">
            <div className="px-3 py-1.5 text-[#4e5c63]">1</div>
            <div className="bg-[#edf1f3] px-3 py-1.5 text-left text-[#7d8a91] sm:text-right">of 4 Ranked Offers</div>
          </div>
        </div>

        <div className="flex justify-start pr-1 text-[10px] text-[#0b8b8f] sm:justify-end">Show more</div>

        <Row label="Internal Name">
          <div className="relative">
            <Input value="July_5_off" readOnly className="h-8 border-[#d3d9dd] bg-[#f2f4f5] text-[12px] text-[#9aa4aa]" />
            <Lock className="absolute top-1/2 right-2 size-3 -translate-y-1/2 text-[#8c979d]" />
          </div>
        </Row>

        <Row label="Integration ID">
          <div className="relative">
            <Input placeholder="Enter Integration ID" className="h-8 border-[#d3d9dd] bg-white text-[12px]" />
            <Paperclip className="absolute top-1/2 right-2 size-3 -translate-y-1/2 text-[#8c979d]" />
          </div>
        </Row>

        <Row label="Tracking Code">
          <Input placeholder="Enter Tracking Code" className="h-8 border-[#d3d9dd] bg-white text-[12px]" />
        </Row>

        <Row label="Global Code">
          <Input placeholder="Enter Global Code" className="h-8 border-[#d3d9dd] bg-white text-[12px]" />
        </Row>

        <Row label="Stores">
          <div className="flex h-8 items-center rounded border border-[#d3d9dd] bg-white px-2">
            <Chip value="LOCATION A" />
          </div>
        </Row>

        <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-[130px_1fr] md:items-center md:gap-3">
          <div className="text-left text-[11px] font-semibold text-[#546167] md:text-right">Optional?</div>
          <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#9ba6ac]">
            <span className="inline-flex h-3.5 w-7 items-center rounded-full bg-[#1ba4a7] px-0.5">
              <span className="size-2.5 rounded-full bg-white" />
            </span>
            If checked, Retailers will be allowed to opt in or out of this Offer.
          </div>
        </div>

        <Row label="Extra JSON">
          <div className="space-y-1">
            <button type="button" className="inline-flex items-center rounded border border-[#7fc6c5] bg-[#dff2ef] px-2 py-0.5 text-[10px] text-[#1c7d83]">
              Edit JSON
            </button>
            <div className="break-all text-[10px] text-[#d45f74]">{"{\"push.action\":\"carousel\",\"page\":\"order\"}"}</div>
          </div>
        </Row>
      </div>

      <div className="mt-4 flex justify-start sm:justify-end">
        <button type="button" className="rounded border border-[#7fc6c5] bg-[#dff2ef] px-2 py-0.5 text-[10px] text-[#1c7d83]">
          Save
        </button>
      </div>
    </div>
  );
}

function CouponRulesContent() {
  return (
    <div className="border-x border-b border-[#d5dcdf] bg-white p-4 text-[#5b676d]">
      <div className="text-[11px] font-semibold text-[#0c8d90]">Coupon Details</div>

      <div className="mt-3 space-y-2">
        <Row label="Coupon Type">
          <SelectLike value="Coupon" />
        </Row>

        <Row label="Discount Type">
          <SelectLike value="Amount" />
        </Row>

        <Row label="Percentage Off">
          <InputLike value="100" />
        </Row>

        <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-[130px_1fr_80px] md:items-center md:gap-3">
          <div className="text-left text-[11px] font-semibold text-[#546167] md:text-right">Max& Amount</div>
          <InputLike value="100" />
          <button type="button" className="w-fit text-[10px] text-[#0b8b8f] md:justify-self-start">
            Override
          </button>
        </div>

        <Row label="Quantity Limit">
          <SelectLike value="1" />
        </Row>

        <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-[130px_1fr_80px] md:items-center md:gap-3">
          <div className="text-left text-[11px] font-semibold text-[#546167] md:text-right">POS Code</div>
          <InputLike placeholder="Enter POS Code" />
          <button type="button" className="w-fit text-[10px] text-[#0b8b8f] md:justify-self-start">
            Override
          </button>
        </div>
      </div>

      <div className="mt-10 text-[11px] font-semibold text-[#0c8d90]">Qualifying Rules</div>

      <div className="mt-3 space-y-2">
        <Row label="Minimum Subtotal">
          <InputLike value="25.00" />
        </Row>

        <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-[130px_1fr] md:items-center md:gap-3">
          <div className="text-left text-[11px] font-semibold text-[#546167] md:text-right">Apply Coupon</div>
          <div className="flex flex-col gap-2 text-[10px] text-[#4f5f66] sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <label className="inline-flex items-center gap-1.5">
              <span className="inline-block size-3 rounded-sm border border-[#c4ccd1] bg-white" />
              In All Stores
            </label>
            <label className="inline-flex items-center gap-1.5">
              <span className="inline-block size-3 rounded-sm border border-[#c4ccd1] bg-[#f1f3f4]" />
              Only on Qualified Items?
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-[130px_1fr] md:items-center md:gap-3">
          <div className="text-left text-[11px] font-semibold text-[#546167] md:text-right">Qualify Based On</div>
          <div className="flex flex-col gap-2 text-[10px] text-[#4f5f66] sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
            <label className="inline-flex items-center gap-1.5">
              <span className="inline-flex size-3 items-center justify-center rounded-full border border-[#1ba4a7]">
                <span className="size-1.5 rounded-full bg-[#1ba4a7]" />
              </span>
              Product Category
            </label>
            <span>Product Category</span>
            <label className="inline-flex items-center gap-1.5">
              <span className="inline-block size-3 rounded-full border border-[#6c7b83]" />
              PLU/ SKU
            </label>
            <label className="inline-flex items-center gap-1.5">
              <span className="inline-block size-3 rounded-full border border-[#6c7b83]" />
              Lookup
            </label>
          </div>
        </div>

        <Row label="Quantity by">
          <SelectLike value="" />
        </Row>

        <div className="flex justify-start sm:justify-end">
          <button
            type="button"
            className="inline-flex items-center rounded border border-[#7fc6c5] bg-[#dff2ef] px-2 py-0.5 text-[10px] text-[#1c7d83]"
          >
            <Plus className="mr-1 size-3" />
            Add
          </button>
        </div>
      </div>

      <div className="mt-4 border-t border-[#e5eaed] pt-3">
        <div className="flex justify-start sm:justify-end">
          <button type="button" className="rounded border border-[#7fc6c5] bg-[#dff2ef] px-2 py-0.5 text-[10px] text-[#1c7d83]">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function EffectivityPeriodsContent() {
  return (
    <div className="border-x border-b border-[#d5dcdf] bg-white p-4 text-[#5b676d]">
      <div className="space-y-5">
        <div>
          <div className="mb-2 text-[11px] font-semibold text-[#3f4a4f]">
            Response Period
            <span className="ml-1 text-[9px] font-normal text-[#97a3a9]">(Period where we allow members to respond)</span>
          </div>

          <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-[130px_1fr_190px] md:items-center md:gap-3">
            <div className="text-left text-[11px] font-semibold text-[#546167] md:text-right">Select Period Type</div>
            <SelectLike value="Same" />
            <span className="text-[11px] text-[#7f8b91]">as Effectivity Period</span>
          </div>
        </div>

        <div>
          <div className="mb-2 text-[11px] font-semibold text-[#3f4a4f]">
            Usage Period
            <span className="ml-1 text-[9px] font-normal text-[#97a3a9]">(Period where responses are considered usable)</span>
          </div>

          <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-[130px_1fr_190px] md:items-center md:gap-3">
            <div className="text-left text-[11px] font-semibold text-[#546167] md:text-right">Select Period Type</div>
            <SelectLike value="Always" />
            <span />
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-[#e5eaed] pt-3">
        <div className="flex justify-start sm:justify-end">
          <button type="button" className="rounded border border-[#7fc6c5] bg-[#dff2ef] px-2 py-0.5 text-[10px] text-[#1c7d83]">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export function DefinitionContent() {
  const [openSection, setOpenSection] = useState<SectionKey>("offer-details");

  return (
    <div className="mt-3 space-y-2">
      <div>
        <SectionHeader title="Offer Details" open={openSection === "offer-details"} onClick={() => setOpenSection("offer-details")} />
        {openSection === "offer-details" && <OfferDetailsContent />}
      </div>

      <div>
        <SectionHeader
          title="Coupon and Qualifying Rules"
          open={openSection === "coupon-rules"}
          onClick={() => setOpenSection("coupon-rules")}
        />
        {openSection === "coupon-rules" && <CouponRulesContent />}
      </div>

      <div>
        <SectionHeader
          title="Effectivity Periods"
          open={openSection === "effectivity-periods"}
          onClick={() => setOpenSection("effectivity-periods")}
        />
        {openSection === "effectivity-periods" && <EffectivityPeriodsContent />}
      </div>
    </div>
  );
}
