import { z } from "zod";

export const LoginResSchema = z
.object({
  token: z.string().min(6).max(255),
})
export type LoginResI = z.infer<typeof LoginResSchema>