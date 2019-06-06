import resource from 'resource-router-middleware';
import volumes from '../models/volumes';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'volume',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		let volume = volumes.find( volume => volume.id===id ),
			err = volume ? null : 'Not found';
		callback(err, volume);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		res.json(volumes);
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		body.id = volumes.length.toString(36);
		volumes.push(body);
		res.json(body);
	},

	/** GET /:id - Return a given entity */
	read({ volume }, res) {
		res.json(volume);
	},

	/** PUT /:id - Update a given entity */
	update({ volume, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				volume[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ volume }, res) {
		volumes.splice(volumes.indexOf(volume), 1);
		res.sendStatus(204);
	}
});
