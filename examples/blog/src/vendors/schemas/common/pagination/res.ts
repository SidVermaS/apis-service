import { z } from "zod";

export const PaginationResSchema = z
.object({
  page: z.number(),
  per_page: z.number(),
  total: z.number(),
  total_pages: z.number(),
})

export type PaginationResI = z.infer<typeof PaginationResSchema>