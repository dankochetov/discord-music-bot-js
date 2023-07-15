import { GuildMember, SlashCommandBuilder } from 'discord.js';

import { useQueue } from 'discord-player';
import { Command } from './common';

export const command: Command = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Get or set volume')
		.addIntegerOption((option) =>
			option.setName('volume')
				.setDescription('The volume to set (0-100)')
		),

	async execute(interaction) {
		const channel = (interaction.member as GuildMember).voice.channel;
		if (!channel) {
			await interaction.reply({ content: 'You need to be in a voice channel to use this command!', ephemeral: true });
			return;
		}

		const queue = useQueue(interaction.guildId!)!;

		const volume = interaction.options.getInteger('volume');

		if (volume === null) {
			await interaction.reply(`Current volume is \`${queue?.node.volume}%\``);
			return;
		}

		if (volume < 0 || volume > 100) {
			await interaction.reply({ content: 'Volume must be between \`0\` and \`100\`', ephemeral: true });
			return;
		}

		await interaction.deferReply();

		queue.node.setVolume(volume);

		await interaction.followUp(`Set volume to \`${volume}%\``);
	},
};
