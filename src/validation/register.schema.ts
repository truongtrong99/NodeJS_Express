import { isEmailExists } from "services/client/auth.service";
import { z } from "zod";

const passwordSchema = z.string().min(3, {message:"Password must be at least 3 characters long"}).max(20, {message:"Password must be at least 20 characters long"});

const emailSchema = z.string().email("Invalid email address")
                .refine(async (email) => {
                    const existingUser = await isEmailExists(email);
                    return !existingUser;
                }, {
                    message: "Email already exists",
                    path: ["email"],
                });



export const RegisterSchema = z.object({
    fullName: z.string().trim().min(1, {message:"Full name is required"}),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type TRegisterSchema = z.infer<typeof RegisterSchema>;