import { GuildMember, SlashCommandBuilder } from 'discord.js';

import { useQueue } from 'discord-player';
import { Command } from './common';

export const command: Command = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Show the queue'),

	async execute(interaction) {
		const channel = (interaction.member as GuildMember).voice.channel;
		if (!channel) {
			await interaction.reply({ content: 'You need to be in a voice channel to use this command!', ephemeral: true });
			return;
		}

		const queue = useQueue(interaction.guildId!)!;

		const tracks = queue.tracks.toArray().slice(0, 10).map((track, index) => `${index + 1}. ${track.title}`);
		if (queue.tracks.size) {
			tracks.unshift(`${queue.tracks.size} tracks in queue:\n`);
			if (queue.tracks.size > 10) tracks.push(`...${queue.tracks.size - 10} more`);
		} else {
			tracks.unshift('The queue is empty');
		}

		await interaction.reply({ content: tracks.join('\n') });
	},
};
