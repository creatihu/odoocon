This Node.js library provides an interface to interact with an Odoo server via its JSON-RPC API. It includes various methods for managing databases, models, records, and raw
queries.

## Usage

First, import and configure the library:

```
const Odoo = require('odoocon');

const odoo = new Odoo({ jsonrpc: '2.0' });

odoo.define({
    url: 'https://your-odoo-url',
    database: 'your-database',
    username: 'your-username',
    password: 'your-password-or-api-key'
});
```

## Methods

### define(config)

Sets the configuration, authenticates, and retrieves the user ID.

```
odoo.define({
    url: 'https://your-odoo-url',
    database: 'your-database',
    username: 'your-username',
    password: 'your-password'
}).then(userId => console.log(userId))
.catch(err => console.error(err));
```

### listDatabases()

Lists all available databases.

```
odoo.listDatabases()
    .then(databases => console.log(databases))
    .catch(err => console.error(err));
```

### listModels()

Lists all models available in the database.

```
odoo.listModels()
    .then(models => console.log(models))
    .catch(err => console.error(err));
```

### listModelAttributes(model)

Lists all attributes of a specified model.

```
odoo.listModelAttributes('res.partner')
    .then(attributes => console.log(attributes))
    .catch(err => console.error(err));
```

### find(model, attributes, filters = [])

Lists record(s) of a specified model based on attributes and optional filters. Without filters it lists all records, with filters you can specify which record you would like to
retrieve

```
odoo.find('res.partner', ['name', 'email'], [['is_company', '=', true]])
    .then(records => console.log(records))
    .catch(err => console.error(err));
```

### create(model, data)

Creates a new record in the specified model.

```
odoo.create('res.partner', { name: 'New Partner', email: 'new.partner@example.com' })
    .then(recordId => console.log(recordId))
    .catch(err => console.error(err));
```

### update(model, id, data)

Updates a record in the specified model.

```
odoo.update('res.partner', 1, { email: 'updated.partner@example.com' })
    .then(result => console.log(result))
    .catch(err => console.error(err));
```

### bulkUpdate(model, ids, data)

Updates multiple records in the specified model.

```
odoo.bulkUpdate('res.partner', [1, 2, 3], { active: false })
    .then(result => console.log(result))
    .catch(err => console.error(err));
```

### delete(model, id)

Deletes a record in the specified model.

```
odoo.delete('res.partner', 1)
    .then(result => console.log(result))
    .catch(err => console.error(err));
```

### bulkDelete(model, ids)

Deletes multiple records in the specified model.

```
odoo.bulkDelete('res.partner', [1, 2, 3])
    .then(result => console.log(result))
    .catch(err => console.error(err));
```

### raw(args)

Executes a raw query.

```
odoo.raw(['res.partner', 'search_read', [[], ['name', 'email']]])
    .then(result => console.log(result))
    .catch(err => console.error(err));
```

## Error Handling

All methods use try-catch blocks and will log errors to the console. It is recommended to handle errors properly in production environments.

## License

This library is licensed under the MIT License. See the LICENSE file for more information.

This library simplifies interaction with Odoo's JSON-RPC API, providing methods for database management, model handling, and CRUD operations.
