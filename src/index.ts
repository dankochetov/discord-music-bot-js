import { Client, Events, GatewayIntentBits } from 'discord.js';

import { commands } from './commands';
import { env } from './env';
import { server as healthServer } from './health';
import { initPlayer } from './player';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
	],
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (err) {
		console.error(err);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.once(Events.ClientReady, (c) => {
	console.log(`Logged in as ${c.user?.tag}`);
});

async function main() {
	await initPlayer(client);
	await client.login(env.DISCORD_TOKEN);
	await healthServer.listen({ host: '0.0.0.0', port: env.PORT });
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
