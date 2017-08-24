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
- [request](https://github.com/request/request) and [request-promise](https://github.com/request/request-promise) - HTTP request with async/await and Promises support
- [geojson-js-utils](https://github.com/maxogden/geojson-js-utils) - helper functions to manipulate GeoJSON objects

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

## Importing new PDV's 

You can import multiple PDV's at once using the `POST /pdv/import` endpoint.

For that, you can use either `items` or `url` key, where the `items` should be an array of PDV's to be added and the `url` should be an external JSON file containing the data.

Example: 
```json
{
 "url": "https://raw.githubusercontent.com/ZXVentures/code-challenge/master/files/pdvs.json"	
}
```

## Finding nearby PDV's

Let's supose you want are integrating an App to this API and you want to know if there is a PDV nearby your user after getting its location (latitude and longitude).

The endpoint is `pdv/nearby` and you need to specify some query parameters, like this: 

```
pdv/nearby?max_range=200&lat=-43.297335&lon=-23.012
```

So, you want a PDV at a maximum range of 200 meters and the user location is [-43.297335,-23.012], the API will return the following: 

```json
{
    "items": [
        {
            "_id": "599e769345f3133547bf022d",
            "updatedAt": "2017-08-24T06:47:47.327Z",
            "createdAt": "2017-08-24T06:47:47.327Z",
            "trading_name": "Adega Osasco",
            "owner_name": "Ze da Ambev",
            "document": "02.453.716/000170",
            "coverage_area": {
                "type": "MultiPolygon",
                "coordinates": [
                    [ [ [ -43.36556, -22.99669 ],
                        [ -43.36539, -23.01928 ],
                        [ -43.26583, -23.01802 ],
                        [ -43.25724, -23.00649 ],
                        [ -43.23355, -23.00127 ],
                        [ -43.2381, -22.99716 ],
                        [ -43.23866, -22.99649 ],
                        [ -43.24063, -22.99756 ],
                        [ -43.24634, -22.99736 ],
                        [ -43.24677, -22.99606 ],
                        [ -43.24067, -22.99381 ],
                        [ -43.24886, -22.99121 ],
                        [ -43.25617, -22.99456 ],
                        [ -43.25625, -22.99203 ],
                        [ -43.25346, -22.99065 ],
                        [ -43.29599, -22.98283 ],
                        [ -43.3262, -22.96481 ],
                        [ -43.33427, -22.96402 ],
                        [ -43.33616, -22.96829 ],
                        [ -43.342, -22.98157 ],
                        [ -43.34817, -22.97967 ],
                        [ -43.35142, -22.98062 ],
                        [ -43.3573, -22.98084 ],
                        [ -43.36522, -22.98032 ],
                        [ -43.36696, -22.98422 ],
                        [ -43.36717, -22.98855 ],
                        [ -43.36636, -22.99351 ],
                        [ -43.36556, -22.99669 ] ] ]
                ]
            },
            "address": {
                "type": "Point",
                "coordinates": [
                    -43.297335,
                    -23.013539
                ]
            },
            "__v": 0
        }
    ]
}
```

Now let's grab a beer! 

![](https://media.giphy.com/media/8O5mQwxoa5vUY/giphy.gif)