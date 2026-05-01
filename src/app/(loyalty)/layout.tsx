import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { LoyaltyHeader } from "./_components/loyalty-header";
import { LoyaltySidebar } from "./_components/loyalty-sidebar";

export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <LoyaltyHeader />
      <SidebarProvider className="min-h-0">
        <div className="flex w-full flex-1 min-h-[calc(100vh-68px)]">
          <LoyaltySidebar />
          <SidebarInset className="min-w-0 flex-1 bg-transparent">
            <main className="min-w-0 w-full flex-1">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
