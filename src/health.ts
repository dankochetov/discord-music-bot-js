import Fastify from 'fastify';

export const server = Fastify();

server.get('/health', async () => {
	return 'OK';
});
