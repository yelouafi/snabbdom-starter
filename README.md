# snabbdom-starter

A simple snabbdom starter repository. Using the following tools:

- browserify for client side bundling
- babel to transpile the ES6 code
- mocha for unit testing

# Getting up and running

Install

After cloning the repository, run `npm install`. 

All files are live inside the `app` folder.

Create the browser bundle

- `npm run build` create 'build.js' (non minified) and 'build.min.js' (minified)

# Hello world

The kit provides a few helper functions. Below the hello example (file `app/js/main.js`)

````javascript

import { h, mount, update } from './app';

const view = date => h('div', 'hello world, now is ' + date );

mount( view(new Date()) , '#placeholder' );

setInterval(() => update(view(new Date())), 1000 );
```

