import { Collection } from 'discord.js';

import { command as clear } from './clear';
import { Command } from './common';
import { command as pause } from './pause';
import { command as play } from './play';
import { command as queue } from './queue';
import { command as resume } from './resume';
import { command as shuffle } from './shuffle';
import { command as skip } from './skip';
import { command as volume } from './volume';

const commandsList = [
	clear,
	pause,
	play,
	queue,
	resume,
	shuffle,
	skip,
	volume,
];

export const commands = new Collection<string, Command>();
for (const command of commandsList) {
	commands.set(command.data.name, command);
}
