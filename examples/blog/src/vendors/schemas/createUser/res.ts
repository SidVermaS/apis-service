import { z } from "zod";

export const CreateUserResSchema = z
.object({
  name: z.string(),
  job: z.string(),
  id: z.string(),
  createdAt: z.string(),
})
export type CreateUserResI = z.infer<typeof CreateUserResSchema>