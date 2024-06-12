const axios = require('axios');

class Odoo {
	constructor(rootConfig) {
		this.rootConfig = rootConfig || { jsonrpc: '2.0' };
		this.config = undefined;
		this.userId = undefined;
	}

	// List available databases
	async listDatabases() {
		try {
			const response = await axios.post(`${this.config.url}/web/database/list`, {
				...this.rootConfig,
				method: 'call',
				id: null,
				params: {},
			});
			if (response.data.error) throw new Error(response.data.error);
			return response.data.result;
		} catch (error) {
			console.error(error);
		}
	}

	// Set config, authenticate and get userId
	async define(config) {
		this.config = config;
		try {
			const response = await axios.post(`${this.config.url}/jsonrpc`, {
				...this.rootConfig,
				method: 'call',
				params: {
					service: 'common',
					method: 'authenticate',
					args: [this.config.database, this.config.username, this.config.password, {}],
				},
				id: new Date().getTime(),
			});

			if (response.data.error) throw new Error(response.data.error);
			this.userId = response.data.result;
			return response.data.result;
		} catch (error) {
			console.error(error);
		}
	}

	// List all models
	async listModels() {
		try {
			const response = await axios.post(`${this.config.url}/jsonrpc`, {
				...this.rootConfig,
				method: 'call',
				params: {
					service: 'object',
					method: 'execute_kw',
					args: [this.config.database, this.userId, this.config.password, 'ir.model', 'search_read', [[], ['model', 'name']]],
				},
				id: new Date().getTime(),
			});
			if (response.data.error) {
				throw new Error(response.data.error.data.message);
			} else {
				return response.data.result;
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	// List fields of a model
	async listModelAttributes(model) {
		try {
			const response = await axios.post(`${this.config.url}/jsonrpc`, {
				...this.rootConfig,
				method: 'call',
				params: {
					service: 'object',
					method: 'execute_kw',
					args: [this.config.database, this.userId, this.config.password, model, 'fields_get', [[], {}]],
				},
				id: new Date().getTime(),
			});
			if (response.data.error) {
				throw new Error(response.data.error.data.message);
			} else {
				return response.data.result;
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	// List record(s) of a model
	async find(model, attributes, filters = []) {
		try {
			const response = await axios.post(`${this.config.url}/jsonrpc`, {
				...this.rootConfig,
				method: 'call',
				params: {
					service: 'object',
					method: 'execute_kw',
					args: [this.config.database, this.userId, this.config.password, model, 'search_read', [[...filters], attributes]],
				},
				id: new Date().getTime(),
			});
			if (response.data.error) {
				throw new Error(response.data.error.data.message);
			} else {
				return response.data.result;
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	// Create new record in a model
	async create(model, data) {
		try {
			const response = await axios.post(`${this.config.url}/jsonrpc`, {
				...this.rootConfig,
				method: 'call',
				params: {
					service: 'object',
					method: 'execute_kw',
					args: [this.config.database, this.userId, this.config.password, model, 'create', [data]],
				},
				id: new Date().getTime(),
			});
			if (response.data.error) {
				throw new Error(response.data.error.data.message);
			} else {
				return response.data.result;
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	// Update record in a model
	async update(model, id, data) {
		try {
			const response = await axios.post(`${this.config.url}/jsonrpc`, {
				...this.rootConfig,
				method: 'call',
				params: {
					service: 'object',
					method: 'execute_kw',
					args: [this.config.database, this.userId, this.config.password, model, 'write', [[id], data]],
				},
				id: new Date().getTime(),
			});
			if (response.data.error) {
				throw new Error(response.data.error.data.message);
			} else {
				return response.data.result;
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	// Update records in a model
	async bulkUpdate(model, ids, data) {
		try {
			const response = await axios.post(`${this.config.url}/jsonrpc`, {
				...this.rootConfig,
				method: 'call',
				params: {
					service: 'object',
					method: 'execute_kw',
					args: [this.config.database, this.userId, this.config.password, model, 'write', [[...ids], data]],
				},
				id: new Date().getTime(),
			});
			if (response.data.error) {
				throw new Error(response.data.error.data.message);
			} else {
				return response.data.result;
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	// Delete record in a model
	async delete(model, id) {
		try {
			const response = await axios.post(`${this.config.url}/jsonrpc`, {
				...this.rootConfig,
				method: 'call',
				params: {
					service: 'object',
					method: 'execute_kw',
					args: [this.config.database, this.userId, this.config.password, model, 'unlink', [[id]]],
				},
				id: new Date().getTime(),
			});
			if (response.data.error) {
				throw new Error(response.data.error.data.message);
			} else {
				return response.data.result;
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	// Delete records in a model
	async bulkDelete(model, ids) {
		try {
			const response = await axios.post(`${this.config.url}/jsonrpc`, {
				...this.rootConfig,
				method: 'call',
				params: {
					service: 'object',
					method: 'execute_kw',
					args: [this.config.database, this.userId, this.config.password, model, 'unlink', [[...ids]]],
				},
				id: new Date().getTime(),
			});
			if (response.data.error) {
				throw new Error(response.data.error.data.message);
			} else {
				return response.data.result;
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	// Raw query
	async raw(args) {
		try {
			const response = await axios.post(`${this.config.url}/jsonrpc`, {
				...this.rootConfig,
				method: 'call',
				params: {
					service: 'object',
					method: 'execute_kw',
					args: [this.config.database, this.userId, this.config.password, ...args],
				},
				id: new Date().getTime(),
			});
			if (response.data.error) {
				throw new Error(response.data.error.data.message);
			} else {
				return response.data.result;
			}
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = Odoo;
