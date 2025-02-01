import { z } from "zod";
import { CreateUpdateUserReqSchema } from "../common/users/req";

export const CreateUserReqSchema = CreateUpdateUserReqSchema
export type CreateUserReqI = z.infer<typeof CreateUserReqSchema>
