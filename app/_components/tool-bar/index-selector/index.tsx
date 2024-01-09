"use client";
import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../ui/command";
import { cn } from "@/app/_lib/utils";
import { useQuery } from "@tanstack/react-query";
import { TAGS } from "@/app/_lib/tags";
import "../../../../string.extensions";
import { useSearchParams } from "@search-params/react";
import { config } from "@/app/_lib/search-config";
import { Trash } from "lucide-react";
import { Separator } from "../../ui/separator";

export function IndexSelector() {
  const [open, setOpen] = React.useState(false);
  const { setQuery, index } = useSearchParams({
    route: config.home,
  });

  const { data: indices, isLoading } = useQuery({
    queryKey: [TAGS.INDICES],
    queryFn: async () =>
      (await fetch("http://localhost:3000/api/open-search/get-indices")).json(),
    select: (data) => {
      return data.result?.map((item: any) => {
        return {
          label: item.index.toCapitalCase(),
          value: item.index,
        };
      });
    },
  });

  const getIndexLabel = (): string | undefined => {
    return indices?.find(
      (item: any) => item.value?.toLowerCase() === index?.toLowerCase()
    )?.label;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between w-52"
        >
          {index && index == "all"
            ? "Showing all indices"
            : !!getIndexLabel()
            ? getIndexLabel()
            : "Something went wrong.."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search indexes..." className="h-9" />
          <CommandEmpty>No indices found.</CommandEmpty>
          <CommandGroup>
            {indices?.map((item: any) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setQuery({
                    index: currentValue === index ? undefined : currentValue,
                  });
                  setOpen(false);
                }}
              >
                {item.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    index === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
          <Separator />
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                setQuery({
                  index: undefined,
                });
                setOpen(false);
              }}
            >
              <Trash className="w-4 h-4 mr-2" /> Clear filter
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
