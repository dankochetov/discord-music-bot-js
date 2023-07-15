import { GuildMember, SlashCommandBuilder } from 'discord.js';

import { useQueue } from 'discord-player';
import { Command } from './common';

export const command: Command = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clear the queue'),

	async execute(interaction) {
		const channel = (interaction.member as GuildMember).voice.channel;
		if (!channel) {
			await interaction.reply({ content: 'You need to be in a voice channel to use this command!', ephemeral: true });
			return;
		}

		const queue = useQueue(interaction.guildId!)!;

		queue.delete();

		await interaction.reply(`Cleared the queue`);
	},
};
