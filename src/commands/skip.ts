import { GuildMember, SlashCommandBuilder } from 'discord.js';

import { useQueue } from 'discord-player';
import { Command } from './common';

export const command: Command = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip current song'),

	async execute(interaction) {
		const channel = (interaction.member as GuildMember).voice.channel;
		if (!channel) {
			await interaction.reply({ content: 'You need to be in a voice channel to use this command!', ephemeral: true });
			return;
		}

		await interaction.deferReply();
		const queue = useQueue(interaction.guildId!)!;
		if (!queue.currentTrack) {
			await interaction.followUp({ content: 'There is no song playing!', ephemeral: true });
			return;
		}

		queue.node.skip();

		await interaction.followUp(`Skipped \`${queue.currentTrack.title}\``);
	},
};
