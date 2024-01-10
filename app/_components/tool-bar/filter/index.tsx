"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { FilterIcon } from "lucide-react";
import RulesBuilder from "./rules-builder";
import useConfig from "@/app/_hooks/use-config";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { StyleProvider } from "@ant-design/cssinjs";
import { useState } from "react";
export default function Filter() {
  const { config, isLoading } = useConfig();
  const [open, setOpen] = useState(false);
  if (isLoading) {
    return <h1>Loadingg..</h1>;
  }

  const handleClose = () => setOpen(false);

  return (
    <Popover onOpenChange={(e) => setOpen(e)} open={open}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <FilterIcon className=" h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[800px]  p-0" align="start">
        <AntdRegistry>
          <StyleProvider hashPriority="high">
            <RulesBuilder config={config!} handleClose={handleClose} />
          </StyleProvider>
        </AntdRegistry>
      </PopoverContent>
    </Popover>
  );
}
