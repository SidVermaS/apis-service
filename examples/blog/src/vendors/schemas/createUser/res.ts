import { z } from "zod";

export const CreateUserResSchema = z
.object({
  name: z.string(),
  job: z.string(),
  id: z.number(),
  createdAt: z.date(),
})
export type CreateUserResI = z.infer<typeof CreateUserResSchema>