import z from 'zod';

export const ProductSchema = z.object({
    //
    name: z.string().trim().min(1, {message:"Name is required"}),
    price: z.number().min(1, {message:"Price is required"}),
    detailDesc: z.string().trim().min(1, {message:"Detail description is required"}),
    shortDesc: z.string().trim().min(1, {message:"Short description is required"}),
    quantity: z.number().min(1, {message:"Quantity is required"}),
    factory: z.string().trim().min(1, {message:"Factory is required"}),
    target: z.string().trim().min(1, {message:"Target is required"})
});

export type TProductSchema = z.infer<typeof ProductSchema>;