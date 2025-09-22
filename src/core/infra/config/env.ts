import { z } from 'zod';

export const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string().min(1),
    BASE_URL: z.string().min(1)
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): Env {
    const parsed = envSchema.safeParse(config);

    if (!parsed.success) {
        throw new Error(`Invalid environment variables: ${parsed.error.message}`);
    }

    return parsed.data;
}