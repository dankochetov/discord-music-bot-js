import dotenv from 'dotenv';
import { parseEnv, z } from 'znv';

dotenv.config({ path: '.env.local' });

export const env = parseEnv(process.env, {
	DISCORD_TOKEN: z.string(),
	DISCORD_CLIENT_ID: z.string(),
	DISCORD_GUILD_ID: z.string(),
	PORT: z.coerce.number().default(3000),
});
