import { z } from "zod"


export const SupportSchema = z
.object({
  url: z.string(),
  text: z.string(),
})