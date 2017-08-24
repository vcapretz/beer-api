# beer-api
> Find points of sale near your location to get beer and more!

This API is intended to help you find points of sale near your location.
It's suposed to be ready to production, although you may need some changes in this case.

The Hapi.js framework already provides many plugins to commom tasks such as validations, testing and assertion, this project tries to make a good use of them.

Dockerfile and docker-compose were added to make it easier for you to build it and run locally without requirements conflicts or whatever.

Disclaimer: PDV = PoS = Point of Sale

## Requirements

- Node v7+
- npm v5+
- Mongo v3+
- or just [install Docker](https://docs.docker.com/engine/installation/) and [docker-compose](https://docs.docker.com/compose/install/)

## Stack
- [Hapi.js](https://hapijs.com/) - server
- [xo](https://github.com/sindresorhus/xo) - linting
- [lab](https://github.com/hapijs/lab) - test framework 
- [code](https://github.com/hapijs/code) - assertion library
- [blipp](https://github.com/danielb2/blipp) - hapi plugin to display the routes table at startup
- [nodemon](https://nodemon.io/) - automatically reload
- [joi](https://github.com/hapijs/joi) - object schema validator (used when posting data)
- [mongoose](http://mongoosejs.com/) - mongo object modeling
- [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator) - mongoose plugin for validation

## Running

### Without docker-compose

- First time only: 
```sh
npm i
```

- Open a second terminal window: 
```sh
mongod
``` 

- On your primary terminal window:
```sh
npm start
```

### With docker-compose

```sh
docker-compose build && docker-compose up
```

## Testing and lint

- for linting only:
```sh
npm run lint
```

- for both linting and testing:
```sh
npm run test
```

## Project structure
```
.
├── config/
|   ├── manifest.js   * Server configuration
├── src/
|   ├── handlers/
|   |   ├── index.js  * Index handler
|   |   └── pdv.js    * Pdv handler
|   ├── models/
|   |   ├── index.js  * Exports all models
|   |   └── pdv.js    * Pdv mongoose schema
|   ├── config.js     * Config file
|   ├── database.js   * Handle database connection
|   └── index.js      * Register REST routes
├── test/
|   └── routes.js     * Tests the API routes
├── server.js         * Server definition (uses the Glue plugin to read a manifest)
├── docker-compose.yml
├── Dockerfile
└── package.json
```
