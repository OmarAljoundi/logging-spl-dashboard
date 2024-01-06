import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "./_layout/main-layout";
import Navbar from "./_layout/navbar";
import ReactQueryProvider from "./_provider/react-query-provider";
import { SearchParamsProvider } from "./_provider/search-params-provider";
import { Toaster } from "./_components/ui/sonner";
import { TooltipProvider } from "./_components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Toaster closeButton richColors />
          <TooltipProvider delayDuration={0}>
            <SearchParamsProvider>
              <MainLayout
                defaultLayout={defaultLayout}
                defaultCollapsed={defaultCollapsed}
              >
                <Navbar />
                <main className=" min-h-screen flex-col items-center justify-between p-24">
                  {children}
                </main>
              </MainLayout>
            </SearchParamsProvider>
          </TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
