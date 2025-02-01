import { z } from "zod";
import {  SupportSchema } from "../common/common";
import { UserResSchema } from "../common/users/res";
import { PaginationResSchema } from "../common/pagination/res";

export const GetUserResSchema=PaginationResSchema.extend({
  data:UserResSchema,
  support: SupportSchema
})
export type GetUserResI= z.infer<typeof GetUserResSchema>