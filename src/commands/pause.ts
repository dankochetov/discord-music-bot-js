import { GuildMember, SlashCommandBuilder } from 'discord.js';

import { useQueue } from 'discord-player';
import { Command } from './common';

export const command: Command = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause/resume current song'),

	async execute(interaction) {
		const channel = (interaction.member as GuildMember).voice.channel;
		if (!channel) {
			await interaction.reply({ content: 'You need to be in a voice channel to use this command!', ephemeral: true });
			return;
		}

		const queue = useQueue(interaction.guildId!)!;
		if (!queue.currentTrack) {
			await interaction.reply({ content: 'There is no song playing!', ephemeral: true });
			return;
		}

		const isPaused = queue.node.isPaused();
		queue.node.setPaused(!isPaused);

		await interaction.reply(`${isPaused ? 'Resumed' : 'Paused'} \`${queue.currentTrack.title}\``);
	},
};
