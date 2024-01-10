"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { cn } from "@/app/_lib/utils";
import {
  Config,
  FieldProps,
  ReactAttributes,
} from "@react-awesome-query-builder/ui";
import { ScrollArea } from "../ui/scroll-area";

export function FieldSelector(props: ReactAttributes & FieldProps<Config>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          size={"sm"}
        >
          {props.selectedKey
            ? props?.items?.find((item) => item.key === props.selectedKey)
                ?.label
            : props?.placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <ScrollArea className="h-[250px]">
          <Command>
            <CommandInput
              placeholder={props.placeholder}
              className="h-9 sticky top-0 z-10"
            />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {props?.items?.map((item) => (
                <CommandItem
                  key={item.key}
                  value={item.key}
                  onSelect={(currentValue) => {
                    props.setField(item.path!);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      props.key === item.key ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
