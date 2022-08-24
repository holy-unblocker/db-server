import CompatWrapper from './CompatWrapper.js';
import domianNameParser from 'effective-domain-name-parser';
import HTTPErrors from 'http-errors';

const NOT_EXIST = /Proxy with host .*? doesn't exist/;

export default async function registerCompat(fastify, { cors, db }) {
	const compat = new CompatWrapper(db);

	fastify.route({
		url: '/:host/',
		method: 'GET',
		schema: {
			params: {
				type: 'object',
				properties: {
					host: { type: 'string' },
				},
			},
		},
		async handler(request, reply) {
			cors(request, reply);
			const parsed = domianNameParser.parse(request.params.host);

			try {
				reply.send(await compat.show(`${parsed.sld}.${parsed.tld}`));
			} catch (error) {
				if (NOT_EXIST.test(error)) {
					throw new HTTPErrors.NotFound();
				} else {
					throw error;
				}
			}
		},
	});
}
