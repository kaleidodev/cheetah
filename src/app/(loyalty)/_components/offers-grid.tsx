import Image from "next/image";

import { OfferItem } from "@/lib/offers/types";
import { Copy, Trash2 } from "lucide-react";

export function OffersGrid({ items }: { items: OfferItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
      {items.map((item, index) => (
        <article key={`${item.name}-${index}`} className="rounded-lg border border-[#d8dcde] bg-[#eff1f2] p-2.5">
          <div className="relative h-[220px] overflow-hidden rounded border border-[#d9dddf] bg-white">
            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(min-width: 1536px) 20vw, (min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <h2 className="truncate text-[18px] leading-none font-bold tracking-tight text-[#20262a]">{item.name}</h2>
            <div className="flex items-center gap-2 text-[#647379]">
              <Copy className="size-4" />
              <Trash2 className="size-4" />
            </div>
          </div>
          <p className="mt-2 text-[14px] leading-none font-medium tracking-tight text-[#8f9ba1]">{item.updated}</p>
        </article>
      ))}
    </div>
  );
}