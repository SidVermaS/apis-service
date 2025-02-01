import { z } from "zod";

export const CreateUpdateUserReqSchema = z
.object({
  name: z.string(),
  job: z.string(),
})
export type CreateUpdateUserReqI = z.infer<typeof CreateUpdateUserReqSchema>
