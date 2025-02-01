import { z } from "zod";

export const UserResSchema = z
.object({
  id: z.number(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  avatar: z.string(),
})
export type UserResI = z.infer<typeof UserResSchema>

