import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  lastName: z.string().min(2),
  image: z.string().optional(),
  activity: z.string().optional(),
});

export const TypeActiviteEnums = [
  { type: "commerciales", plafond: 188700 },
  { type: "service", plafond: 77700 },
];

export type TypeActivite = "service" | "commerciales";

export type UserZod = z.infer<typeof userSchema>;
