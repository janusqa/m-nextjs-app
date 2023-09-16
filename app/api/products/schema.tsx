import { z } from 'zod';

export const ProductSchema = z.object({
    name: z.string().min(3),
    price: z.number().min(0.01),
});
