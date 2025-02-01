import { z } from "zod";

export const PaginationReqSchema = z
.object({
  page: z.number(),
  per_page: z.number(),
})
export type PaginationReqI = z.infer<typeof PaginationReqSchema>