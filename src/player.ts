import { Player, QueueRepeatMode } from 'discord-player';
import { ChatInputCommandInteraction, Client, EmbedBuilder, TextBasedChannel } from 'discord.js';

export async function initPlayer(client: Client) {
	const player = new Player(client);
	await player.extractors.loadDefault();

	player.events.on('playerStart', (queue, track) => {
		if (queue.repeatMode === QueueRepeatMode.TRACK) return;

		const metadata = queue.metadata as { textChannel: TextBasedChannel; interaction: ChatInputCommandInteraction };

		const embed = new EmbedBuilder()
			.setURL(track.url)
			.setThumbnail(track.thumbnail)
			.setTitle(`${track.title}`)
			.addFields(
				{ name: `Now Playing in ${queue.channel!.name} 🎧`, value: `Requested by ${metadata.interaction.user}` },
				{ name: 'Duration', value: `\`(${track.duration})\`` },
			)
			.setColor('#13f857');

		metadata.textChannel.send({ embeds: [embed] }).catch((err) => {
			console.error('Error while sending embed:', err);
		});
	});

	// player.events.on('audioTracksAdd', (queue, tracks) => {
	// 	const metadata = queue.metadata as { textChannel: TextBasedChannel; interaction: ChatInputCommandInteraction };

	// 	const playlist = tracks[0].playlist!;
	// 	const embed = new EmbedBuilder()
	// 		.setURL(playlist.url)
	// 		.setTitle(playlist.title)
	// 		.setThumbnail(playlist.thumbnail)
	// 		.addFields({ name: 'New Playlist Added! ✅', value: `${tracks.length} track(s) have been added to queue` })
	// 		.setColor('#e6cc00');

	// 	metadata.interaction.followUp({ embeds: [embed] });
	// });
}
