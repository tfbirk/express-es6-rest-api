import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import volumes from './volumes';
import initiators from './initiators';

export default ({ config, db }) => {
	let api = Router();

	// mount the volumes resource
	api.use('/volumes', volumes({ config, db }));

	// mount the initiators resource
	api.use('/initiators', initiators({ config, db }));

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	// add links to underlying resourcs
	api.get('/', (req, res) => {
		res.json({ version, facets: "/api/facets", volumes: "/api/volumes", initiators: "/api/initiators", users: "/api/users" });
	});

	return api;
}
