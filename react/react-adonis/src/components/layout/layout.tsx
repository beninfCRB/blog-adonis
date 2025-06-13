import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router'
import { AppSidebar } from './sidebar/app-sidebar'
import InterceptorProvider from '@/pages/interceptorProvider'
import Topbar from './topbar'

export default function Layout() {
  return (
    <InterceptorProvider>
      <SidebarProvider>
        <AppSidebar />
        <section className="flex flex-col w-full">
          <div className="flex w-full flex-wrap-reverse sticky top-0 z-10">
            <SidebarTrigger className="z-10 text-red-500" />
            <Topbar />
          </div>
          <main className="flex items-start justify-around min-h-0 w-full">
            <div className="container mx-2 my-8 p-2 bg-lime-50 flex-1 rounded-2xl w-[975px]">
              <Outlet />
            </div>
          </main>
        </section>
      </SidebarProvider>
    </InterceptorProvider>
  )
}
