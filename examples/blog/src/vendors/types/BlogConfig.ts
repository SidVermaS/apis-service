import type{ VendorConfigI } from "vendor-api";

export type BlogConfigI =VendorConfigI<{
  email: string;
  password: string;
}>