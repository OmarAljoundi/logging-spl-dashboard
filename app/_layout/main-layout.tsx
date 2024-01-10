"use client";
import React, { FunctionComponent, ReactNode } from "react";
import { Separator } from "../_components/ui/separator";
import { Nav } from "./nav";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-full flex items-stretch">
      <div className="w-[200px]  border-r">
        <Nav />
      </div>
      <div className="w-[calc(100%-200px)]">{children}</div>
    </div>
  );
};

export default MainLayout;
