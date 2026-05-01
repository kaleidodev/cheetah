"use client";

import Link from "next/link";
import { GripIcon, TextAlignJustifyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <header className="h-[68px] border-b border-[#d9dde0] bg-white">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex min-w-0 items-center">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open app switcher"
            className="mr-4 size-9 rounded-md text-[#5f6d74] hover:bg-[#eef1f3] hover:text-[#44535a]"
          >
            <GripIcon className="size-7" strokeWidth={2.1} />
          </Button>

          <Link
            href="/"
            className="px-16 shrink-0 text-[24px] leading-none font-medium tracking-tight"
          >
            LOYALTY
          </Link>

          <nav className="hidden min-w-0 items-center gap-5 lg:flex" aria-label="Top navigation">
            {topNavItems.map((item) => {
              const active = Boolean(item.active);

              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-3 text-[15px] leading-none font-semibold tracking-tight",
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
                  className="relative py-6 text-[15px] leading-none font-semibold tracking-tight text-[#667278]"
                >
                  {item.label}
                </span>
              );
            })}
          </nav>
        </div>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="size-9 rounded-md text-[#5f6d74] hover:bg-muted hover:text-[#44535a]"
        >
          <TextAlignJustifyIcon className="size-5" strokeWidth={5} absoluteStrokeWidth={true} />
        </Button>
      </div>
    </header>
  );
}
