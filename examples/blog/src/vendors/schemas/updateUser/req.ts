import { z } from "zod";
import { CreateUpdateUserReqSchema } from "../common/users/req";

export const UpdateUserReqSchema = CreateUpdateUserReqSchema
export type UpdateUserReqI = z.infer<typeof UpdateUserReqSchema>
