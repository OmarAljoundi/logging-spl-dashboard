import { createSearchParamsConfig } from "@search-params/react";
import { z } from "zod";

export const searchParamsSchema = z.object({
  searchInterval: z
    .object({
      timeTense: z.string().optional(),
      label: z.string().optional(),
      timeValue: z.number().default(15),
      timeUnit: z.string().default("minutes"),
    })
    .default({
      timeValue: 15,
      timeUnit: "minutes",
    }),
  index: z.string().optional().nullable().default("all"),
  page: z.number().min(1).default(1),
  size: z.number().default(500),
  query: z.record(z.any()).optional(),
});

export const config = createSearchParamsConfig({
  home: (search) => searchParamsSchema.parse(search),
});
