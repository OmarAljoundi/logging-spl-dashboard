"use client";
import { Button } from "../_components/ui/button";
import { CalendarClock, CaseSensitive, Hash, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../_components/ui/accordion";
import { toast } from "sonner";
import { ScrollArea } from "../_components/ui/scroll-area";
import { Badge } from "../_components/ui/badge";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { SearchInput } from "../_components/ui/search-input";
import useConfig from "../_hooks/use-config";

export function Nav() {
  const { fields, isLoading, error } = useConfig();
  const [query, setQuery] = useState("");
  if (error) {
    toast.error(`Error while getting fields mapped ${error}`);
  }

  const filteredFields = () => {
    return Object.entries(fields)?.filter(([key, entry]: any) =>
      key.includes(query)
    );
  };

  return (
    <div className="group flex flex-col gap-4 py-2 w-full px-2">
      <SearchInput
        placeholder="Search field"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="selected_fields">
          <AccordionTrigger className="px-2" asChild>
            <div className="flex justify-between">
              <h1 className="text-xs cursor-pointer">Selected fields</h1>
              {isLoading ? (
                <ReloadIcon className="h-4 w-4 animate-spin" />
              ) : (
                <Badge className="text-[10px] p-0 px-1 rounded-full">
                  {Object.entries(fields).length}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
        </AccordionItem>
        <AccordionItem value="available_fields">
          <AccordionTrigger className="px-2" asChild>
            <div className="flex justify-between">
              <h1 className="text-xs cursor-pointer">Available fields</h1>
              {isLoading ? (
                <ReloadIcon className="h-4 w-4 animate-spin" />
              ) : (
                <Badge className="text-[10px] p-0 px-1 rounded-full">
                  {filteredFields()?.length}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          {fields && (
            <AccordionContent asChild>
              <ScrollArea className="h-svh w-full">
                <div className="pl-1 grid space-y-1 w-full justify-items-start">
                  {filteredFields()?.map(([key, entry]: any, index: number) => (
                    <Button
                      asChild
                      key={index}
                      variant={"link"}
                      size={"sm"}
                      className=" px-2"
                    >
                      <div className="flex gap-x-2">
                        {getIconPerType(entry.type)}
                        <p className="truncate w-[130px] ">{key}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </AccordionContent>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
}

const getIconPerType = (type: "text" | "keyword" | "datetime" | "number") => {
  switch (type) {
    case "number":
      return <Hash className="w-4 h-4" />;
    case "datetime":
      return <CalendarClock className="w-4 h-4" />;
    case "keyword":
    case "text":
      return <CaseSensitive className="w-4 h-4" />;
    default:
      return <HelpCircle className="w-4 h-4" />;
  }
};
