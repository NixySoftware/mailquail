import {createEnv} from '@t3-oss/env-nextjs';
import {z} from 'zod';

// This file is .mjs, because Next.js does not support TypeScript for the config file.

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(['development', 'production']),

        DATABASE_URL: z.string().url(),
        // DATABASE_SHADOW_URL: z.string().url()

        NEXTAUTH_URL: z.string().url(),
        NEXTAUTH_SECRET: z.string().min(1)
    },
    client: {},
    skipValidation: process.env.SKIP_ENV_VALIDATION === '1',
    experimental__runtimeEnv: {}
});
