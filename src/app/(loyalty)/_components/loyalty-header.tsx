"use client";

import Link from "next/link";
import { GripIcon, TextAlignJustifyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type TopNavItem = {
  label: string;
  href?: string;
  active?: boolean;
};

const topNavItems: TopNavItem[] = [
  { label: "ANALYTICS" },
  { label: "MEMBERS" },
  { label: "CAMPAIGNS", href: "/", active: true },
  { label: "CHALLENGES" },
  { label: "TRANSACTIONS" },
  { label: "REWARDS" },
  { label: "COMMUNITIES" },
  { label: "RULES" },
  { label: "PROGRAM" },
  { label: "ADMIN" },
];

export function LoyaltyHeader() {
  return (
    <header className="border-b border-[#d9dde0] bg-white">
      <div className="flex min-h-[68px] items-center gap-3 px-4">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open app switcher"
          className="size-9 shrink-0 rounded-md text-[#5f6d74] hover:bg-[#eef1f3] hover:text-[#44535a]"
        >
          <GripIcon className="size-7" strokeWidth={2.1} />
        </Button>

        <Link
          href="/"
          className="shrink-0 pr-2 text-[20px] leading-none font-medium tracking-tight sm:pr-4 sm:text-[24px] lg:pr-6"
        >
          LOYALTY
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center overflow-x-auto lg:flex" aria-label="Top navigation">
          <div className="flex min-w-max items-center gap-4 pr-2 xl:gap-5">
            {topNavItems.map((item) => {
              const active = Boolean(item.active);

              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative shrink-0 py-3 text-[14px] leading-none font-semibold tracking-tight xl:text-[15px]",
                      active
                        ? "text-[#364148] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-[#2ea6a9] after:content-['']"
                        : "text-[#667278]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <span
                  key={item.label}
                  className="relative shrink-0 py-6 text-[14px] leading-none font-semibold tracking-tight text-[#667278] xl:text-[15px]"
                >
                  {item.label}
                </span>
              );
            })}
          </div>
        </nav>

        <Sheet>
          <SheetTrigger render={
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="ml-auto size-9 rounded-md text-[#5f6d74] hover:bg-muted hover:text-[#44535a] lg:hidden"
            />
          }>
            <TextAlignJustifyIcon className="size-5" strokeWidth={5} absoluteStrokeWidth={true} />
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-white p-0" showCloseButton={true}>
            <SheetHeader className="border-b border-[#d9dde0] px-5 py-4 text-left">
              <SheetTitle className="text-[20px] font-medium tracking-tight text-[#364148]">LOYALTY</SheetTitle>
              <SheetDescription className="text-[12px] text-[#7a868c]">Navigation</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col px-3 py-2" aria-label="Mobile top navigation">
              {topNavItems.map((item) => {
                const active = Boolean(item.active);
                const className = cn(
                  "rounded-md px-3 py-3 text-[14px] font-semibold tracking-tight",
                  active ? "bg-[#def2ef] text-[#2f757a]" : "text-[#667278] hover:bg-[#f4f7f8]"
                );

                if (item.href) {
                  return (
                    <Link key={item.label} href={item.href} aria-current={active ? "page" : undefined} className={className}>
                      {item.label}
                    </Link>
                  );
                }

                return <span key={item.label} className={className}>{item.label}</span>;
              })}
            </nav>
          </SheetContent>
        </Sheet>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="hidden size-9 shrink-0 rounded-md text-[#5f6d74] hover:bg-muted hover:text-[#44535a] lg:inline-flex"
        >
          <TextAlignJustifyIcon className="size-5" strokeWidth={5} absoluteStrokeWidth={true} />
        </Button>
      </div>
    </header>
  );
}
