"use client";
import React, { FunctionComponent, ReactNode } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../_components/ui/resizable";
import { Separator } from "../_components/ui/separator";
import { Nav } from "./nav";
import { Archive, ArchiveX, File, Inbox, Send, Trash2 } from "lucide-react";
import { cn } from "../_lib/utils";
import { TooltipProvider } from "../_components/ui/tooltip";

interface MainLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  children: ReactNode;
}

const MainLayout: FunctionComponent<MainLayoutProps> = ({
  defaultLayout = [216, 440],
  defaultCollapsed,
  children,
}) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
      className="h-full  items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsible={true}
        minSize={6}
        maxSize={15}
      >
        <Separator />
        <Nav
          isCollapsed={false}
          links={[
            {
              title: "Inbox",
              label: "128",
              icon: Inbox,
              variant: "default",
            },
            {
              title: "Drafts",
              label: "9",
              icon: File,
              variant: "ghost",
            },
            {
              title: "Sent",
              label: "",
              icon: Send,
              variant: "ghost",
            },
            {
              title: "Junk",
              label: "23",
              icon: ArchiveX,
              variant: "ghost",
            },
            {
              title: "Trash",
              label: "",
              icon: Trash2,
              variant: "ghost",
            },
            {
              title: "Archive",
              label: "",
              icon: Archive,
              variant: "ghost",
            },
          ]}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={50}>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MainLayout;
