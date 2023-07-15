import { GuildMember, SlashCommandBuilder } from 'discord.js';

import { useQueue } from 'discord-player';
import { Command } from './common';

export const command: Command = {
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('Shuffle the queue'),

	async execute(interaction) {
		const channel = (interaction.member as GuildMember).voice.channel;
		if (!channel) {
			await interaction.reply({ content: 'You need to be in a voice channel to use this command!', ephemeral: true });
			return;
		}

		await interaction.deferReply();
		const queue = useQueue(interaction.guildId!)!;
		if (!queue.size) {
			await interaction.followUp({ content: 'The queue is empty!', ephemeral: true });
			return;
		}

		queue.tracks.shuffle();

		await interaction.followUp(`Shuffled the queue`);
	},
};
