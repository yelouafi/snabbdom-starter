# snabbdom-starter

A simple snabbdom starter repository. Using the following tools:

- browserify/watchify for client side bundling
- babel to transpile the ES6 code

# Getting up and running

Install

After cloning the repository, run `npm install`. 

All files live inside the `app` folder

..app  
.....index.html  
.....build.js  
...js  
........main.js  
........(...)  

running `npm run watch` watches for change and creates the browser bundle 'build.js'

# Hello world

The kit provides a few helper functions. Below the hello example (file `app/js/main.js`)

````javascript
import patcher from './helpers';
import h from 'snabbdom/h';

const update = patcher('#placeholder');

update( h('div', 'Hello World') );
```

