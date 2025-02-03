import { z } from "zod";
import { UpdateUserReqSchema } from "./req";

export const UpdateUserModuleReqSchema = UpdateUserReqSchema.extend({
  id: z.number()
})
export type UpdateUserModuleReqI = z.infer<typeof UpdateUserModuleReqSchema>
