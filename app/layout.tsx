import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "./_layout/main-layout";
import ReactQueryProvider from "./_provider/react-query-provider";
import { SearchParamsProvider } from "./_provider/search-params-provider";
import { Toaster } from "./_components/ui/sonner";
import { TooltipProvider } from "./_components/ui/tooltip";
import { cn } from "./_lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SPL Logging System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "overflow-hidden")}>
        <ReactQueryProvider>
          <Toaster closeButton richColors />
          <TooltipProvider delayDuration={0}>
            <SearchParamsProvider>
              <MainLayout>
                <main className=" min-h-screen  w-full">{children}</main>
              </MainLayout>
            </SearchParamsProvider>
          </TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
