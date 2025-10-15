import { z } from "zod";

export const LanguageSchema = z.enum(['en', 'it', 'uk']);

export type Language = z.infer<typeof LanguageSchema>;
