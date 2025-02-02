export type KeyStringPurePrimitiveI =Record<string, PurePrimitiveI>
export type KeyStringStringI =Record<string, string>
export type KeyStringUnknownI =Record<string, unknown>
export type KeyStringUnknownArrI =Record<string, unknown>[]

export type KeyStringUnknownComboI =KeyStringUnknownI | KeyStringUnknownArrI
export type PurePrimitiveI =  string | number | boolean
export type PrimitiveI = PurePrimitiveI | null | undefined
export type DataI=PrimitiveI | KeyStringUnknownI