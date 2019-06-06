import resource from 'resource-router-middleware';
import initiators from '../models/initiators';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'initiator',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		let initiator = initiators.find( initiator => initiator.id===id ),
			err = initiator ? null : 'Not found';
		callback(err, initiator);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		res.json(initiators);
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		body.id = initiators.length.toString(36);
		initiators.push(body);
		res.json(body);
	},

	/** GET /:id - Return a given entity */
	read({ initiator }, res) {
		res.json(initiator);
	},

	/** PUT /:id - Update a given entity */
	update({ initiator, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				initiator[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ initiator }, res) {
		initiators.splice(initiators.indexOf(initiator), 1);
		res.sendStatus(204);
	}
});
