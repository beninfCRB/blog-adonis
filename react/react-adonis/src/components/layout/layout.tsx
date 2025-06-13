import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { AppSidebar } from "./sidebar/app-sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="flex items-start justify-around h-full w-full">
        <div className="container mx-2 my-8 p-2 bg-lime-50 flex-1 rounded-2xl">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
