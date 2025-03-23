import {registerSchema} from "@/schemas/forms/register";

export const signInSchema = registerSchema.pick({
  email: true,
  password: true,
})
