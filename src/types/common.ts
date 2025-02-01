export type KeyStringPurePrimitiveI =Record<string, PurePrimitiveI>
export type KeyStringUnknownI =Record<string, unknown>
export type PurePrimitiveI =  string | number | boolean
export type PrimitiveI = PurePrimitiveI & null