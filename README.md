# beer-api
> Find points of sale near your location to get beer and more!

This API is intended to help you find points of sale near your location.

## Requirements

- Node v7+
- npm v5+
- Mongo v3+

### Stack
- [Hapi.js](https://hapijs.com/) - server
- [xo](https://github.com/sindresorhus/xo) - linting
- [lab](https://github.com/hapijs/lab) - test framework 
- [code](https://github.com/hapijs/code) - assertion library
- [blipp](https://github.com/danielb2/blipp) - hapi plugin to display the routes table at startup
- [nodemon](https://nodemon.io/) - automatically reload
- [joi](https://github.com/hapijs/joi) - object schema validator (used when posting data)
- [mongoose](http://mongoosejs.com/) - mongo object modeling
- [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator) - mongoose plugin for validation

### Running

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

### Testing and lint

- for linting only:
```sh
npm run lint
```

- for both linting and testing:
```sh
npm run test
```
