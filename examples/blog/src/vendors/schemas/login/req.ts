import { z } from "zod";

export const LoginReqSchema = z
.object({
  email: z.string().email(),
  password: z.string().min(6).max(32),
})
export type LoginReqI = z.infer<typeof LoginReqSchema>