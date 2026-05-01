"use client";

import { useMemo, useState } from "react";

import { OfferItem } from "@/lib/offers/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronDown, Copy, GripIcon, House, Tag, Trash2 } from "lucide-react";

const PAGE_SIZE = 3;

export function OffersList({ items }: { items: OfferItem[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const currentItems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, safePage]);

  const startIndex = items.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const endIndex = Math.min(safePage * PAGE_SIZE, items.length);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="space-y-3">
        {currentItems.map((item, index) => (
          <article
            key={`${item.name}-${safePage}-${index}`}
            className="rounded-sm border border-[#eceff1] bg-[#f5f6f7] px-4 py-4"
          >
            <div className="flex items-start gap-6">
              <div className="h-[140px] w-[160px] shrink-0 border border-[#dde2e5] bg-white" />

              <div className="min-w-0 flex-1">
                <h2 className="truncate text-[18px] leading-none font-bold tracking-tight text-[#14181b]">
                  {item.name}
                </h2>
                <p className="mt-2 text-[15px] leading-none font-medium tracking-tight text-[#aab5bb]">
                  {item.updated}
                </p>
                <p className="mt-2 text-[16px] leading-none font-medium tracking-tight text-[#bac4c9]">
                  {item.description}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 text-[16px] leading-none">
                  <p className="flex items-center gap-2 text-[#9fabb1]">
                    <GripIcon className="size-4" />
                    On-Line
                  </p>
                  <p className="text-[#434d52]">
                    <span className="text-[#7f8d93]">Campaign:</span> {item.campaign}
                  </p>

                  <p className="flex items-center gap-2 text-[#9fabb1]">
                    <Tag className="size-4" />
                    No tags
                  </p>
                  <p className="text-[#434d52]">
                    <span className="text-[#7f8d93]">Campaign Rank:</span> {item.campaignRank}
                  </p>

                  <p className="flex items-center gap-2 text-[#9fabb1]">
                    <House className="size-4" />
                    Available in all stores
                  </p>
                  <p className="text-[#434d52]">
                    <span className="text-[#7f8d93]">Optional?</span> Not optional
                  </p>
                </div>
              </div>

              <div className="w-[300px] shrink-0 pt-0.5 text-[16px] leading-none tracking-tight text-[#7d8a91]">
                <div className="flex items-center justify-start gap-3">
                  <span>{item.couponType}</span>
                  <button
                    type="button"
                    className="inline-flex h-7 items-center gap-1 rounded border border-[#5ca5a4] bg-[#dff1f2] px-2 text-[12px] font-semibold text-[#2f757a]"
                  >
                    <span className="inline-block size-2 rounded-full border border-[#345a5b]" />
                    Draft
                    <ChevronDown className="size-3" />
                  </button>
                  <Copy className="size-5 text-[#65737a]" />
                  <Trash2 className="size-5 text-[#65737a]" />
                </div>

                <p className="mt-4 text-[#9da8ae]">{item.publishedAt}</p>
                <p className="mt-5 text-[#7f8c92]">{item.responses}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 text-center text-[12px] text-[#b0b9be]">
        Displaying items {startIndex}-{endIndex} of {items.length} in total
      </div>

      <Pagination className="mt-2 justify-center">
        <PaginationContent className="gap-0">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              text="Pre"
              onClick={(e) => {
                e.preventDefault();
                goToPage(safePage - 1);
              }}
              className="h-7 rounded-none border border-[#cfd6da] px-2 text-[12px] text-[#4e78ae] hover:bg-[#f2f6fb]"
            />
          </PaginationItem>

          {safePage > 2 && totalPages > 3 ? (
            <>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(1);
                  }}
                  className="h-7 w-7 rounded-none border border-[#cfd6da] bg-white text-[12px] text-[#4e78ae] hover:bg-[#f2f6fb]"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis className="h-7 w-7 rounded-none border border-[#cfd6da] text-[#7d8c95]" />
              </PaginationItem>
            </>
          ) : null}

          {Array.from({ length: totalPages }).map((_, idx) => {
            const page = idx + 1;
            const show = totalPages <= 5 || Math.abs(page - safePage) <= 1 || page === totalPages;
            if (!show || (safePage > 2 && totalPages > 3 && page === 1)) return null;

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={safePage === page}
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(page);
                  }}
                  className={
                    safePage === page
                      ? "h-7 w-7 rounded-none border border-[#2f3a40] bg-[#2f3a40] text-[12px] text-white hover:bg-[#2f3a40]"
                      : "h-7 w-7 rounded-none border border-[#cfd6da] bg-white text-[12px] text-[#4e78ae] hover:bg-[#f2f6fb]"
                  }
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              text="Next"
              onClick={(e) => {
                e.preventDefault();
                goToPage(safePage + 1);
              }}
              className="h-7 rounded-none border border-[#cfd6da] px-2 text-[12px] text-[#4e78ae] hover:bg-[#f2f6fb]"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
