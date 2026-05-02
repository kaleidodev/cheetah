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
      <SidebarProvider className="flex-col items-stretch">
        <LoyaltyHeader />
        <div className="flex flex-1 items-start">
          <LoyaltySidebar />
          <SidebarInset className="bg-transparent">
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
