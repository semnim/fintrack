import {z} from "zod";

const dobSchema = z.string()
.refine((dobString) => {
  const parsedDate = new Date(dobString);
  return !isNaN(parsedDate.getTime());
}, {
  message: `Invalid date format. Please provide a valid ISO string (e.g., 'YYYY-MM-DD').`,
})
.refine((dobString) => {
  const dob = new Date(dobString);
  const age = new Date().getFullYear() - dob.getFullYear();
  const month = new Date().getMonth() - dob.getMonth();
  const day = new Date().getDate() - dob.getDate();

  // Ensure the user is at least 18 years old
  return age > 18 || (age === 18 && month >= 0 && day >= 0);
}, {
  message: "You must be at least 18 years old.",
});
export const registerSchema = z.object({
  name: z.string(),
  image: z.string().optional(),
  dob: dobSchema,
  email: z.string().email(),
  password: z.string().min(6),
})
