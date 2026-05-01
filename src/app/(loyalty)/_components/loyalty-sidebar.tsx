"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageCircleMore,
  Mail,
  ChartColumn,
  Gift,
  Wallet,
  Hand,
  Target,
  Store,
  BadgePercent,
  Eye,
  Megaphone,
  Settings,
  ChevronDown,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type SideNavItem = {
  label: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  hasChevron?: boolean;
};

const sideNavItems: SideNavItem[] = [
  { label: "Campaigns", icon: Target },
  { label: "Inbound SMS", icon: MessageCircleMore },
  { label: "Messages", icon: Mail },
  { label: "Message Dashboard", icon: ChartColumn },
  { label: "Offers", href: "/", icon: Gift },
  { label: "Wallet Passes", icon: Wallet },
  { label: "Punch Cards", icon: Hand },
  { label: "Punchcard Campaigns", icon: Target },
  { label: "Store Participation", icon: Store },
  { label: "Offer Certificates", icon: BadgePercent },
  { label: "Offer Responses", icon: Eye },
  { label: "Offer Dashboard", icon: ChartColumn },
  { label: "Triggered Marketing", icon: Megaphone },
  { label: "Settings", icon: Settings, hasChevron: true },
];

function isOffersActive(pathname: string, item: SideNavItem) {
  return item.label === "Offers" && pathname === "/";
}

export function LoyaltySidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="none" className="w-[230px] border-r bg-white">
      <SidebarContent>
        <SidebarMenu className="py-3" aria-label="Loyalty sidebar">
          {sideNavItems.map((item) => {
            const active = isOffersActive(pathname, item);
            const Icon = item.icon;
            const itemClassName = cn(
              "mx-2 mb-0.5 flex h-10 items-center gap-2.5 rounded px-5 text-[14px] font-semibold leading-none tracking-tight text-[#516068] transition-colors",
              active ? "bg-[#dceced] text-[#3a737d]" : "hover:bg-[#e9eff0] hover:text-[#3f6972]"
            );

            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  render={
                    item.href ? (
                      <Link href={item.href} aria-current={active ? "page" : undefined} />
                    ) : (
                      <div />
                    )
                  }
                  isActive={active}
                  className={itemClassName}
                >
                  <Icon className="size-[17px] shrink-0" />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.hasChevron && <ChevronDown className="size-[15px] shrink-0 opacity-65" />}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
