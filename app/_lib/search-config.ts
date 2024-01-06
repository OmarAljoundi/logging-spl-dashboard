import { createSearchParamsConfig } from "@search-params/react";
import { z } from "zod";

export const searchParamsSchema = z.object({
  searchInterval: z
    .object({
      timeTense: z.string().optional(),
      label: z.string().optional(),
      timeValue: z.number().min(1).optional(),
      timeUnit: z.string().optional(),
    })
    .optional()
    .nullable()
    .default(null),

  index: z.string().optional().nullable().default("all"),
  query: z.record(z.any()).optional(),
});

export const config = createSearchParamsConfig({
  home: (search) => searchParamsSchema.parse(search),
});
