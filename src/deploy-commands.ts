import { REST, Routes } from 'discord.js';

import { commands } from './commands';
import { env } from './env';

const rest = new REST().setToken(env.DISCORD_TOKEN);

(async () => {
	console.log(`Started refreshing ${commands.size} application (/) commands.`);

	await rest.put(
		Routes.applicationGuildCommands(env.DISCORD_CLIENT_ID, env.DISCORD_GUILD_ID),
		{ body: commands.map((command) => command.data.toJSON()) },
	);

	console.log(`Successfully reloaded ${commands.size} application (/) commands.`);
})().catch((err) => {
	console.error(err);
	process.exit(1);
});
