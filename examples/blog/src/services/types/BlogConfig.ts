import type{ ServiceConfigI } from "service-api";

export type BlogConfigI =ServiceConfigI<{
  email: string;
  password: string;
}>