import { z } from "zod";

export const UpdateUserResSchema = z
.object({
  name: z.string(),
  job: z.string(),
  updatedAt: z.date(),
})
export type UpdateUserResI = z.infer<typeof UpdateUserResSchema>