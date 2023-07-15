import { useMainPlayer } from 'discord-player';
import { EmbedBuilder, GuildMember, SlashCommandBuilder } from 'discord.js';

import { Command } from './common';

export const command: Command = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a song')
		.addStringOption((option) =>
			option.setName('query')
				.setDescription('The song to play')
				.setRequired(true)
		),
	async execute(interaction) {
		const voiceChannel = (interaction.member as GuildMember).voice.channel;
		if (!voiceChannel) {
			await interaction.reply({ content: 'You need to be in a voice channel to use this command!', ephemeral: true });
			return;
		}

		const player = useMainPlayer()!;
		const query = interaction.options.getString('query', true);

		await interaction.deferReply();

		try {
			const { track } = await player.play(voiceChannel, query, {
				nodeOptions: {
					metadata: {
						interaction,
						textChannel: interaction.channel,
					},
				},
			});

			const playlist = track.playlist;
			const embed = playlist
				? new EmbedBuilder()
					.setURL(playlist.url)
					.setTitle(playlist.title)
					.setThumbnail(playlist.thumbnail)
					.addFields({
						name: 'New Playlist Added! ✅',
						value: `${
							playlist.tracks.length === 1 ? `1 track` : `${playlist.tracks.length} tracks`
						} have been added to queue`,
					})
					.setColor('#e6cc00')
				: new EmbedBuilder()
					.setThumbnail(track.thumbnail)
					.addFields({ name: 'New Track Added! ✅', value: `${track.title} \`(${track.duration})\`` })
					.setColor('#e6cc00');

			await interaction.followUp({ embeds: [embed] });
		} catch (err) {
			console.error(err);
			await interaction.followUp('There was an error while trying to play your song!');
		}
	},
};
