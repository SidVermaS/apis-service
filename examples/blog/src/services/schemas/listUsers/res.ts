import { z } from "zod";
import {  SupportSchema } from "../common/common";
import { UserResSchema } from "../common/users/res";
import { PaginationResSchema } from "../common/pagination/res";

export const ListUsersResSchema=PaginationResSchema.extend({
  data: z.array(UserResSchema),
  support: SupportSchema
})
export type ListUsersResI= z.infer<typeof ListUsersResSchema>