# snabbdom-starter

[![Join the chat at https://gitter.im/yelouafi/snabbdom-starter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/yelouafi/snabbdom-starter?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A simple snabbdom starter repository. Using the following tools:

- browserify/watchify for client side bundling
- babel to transpile the ES6 code

# Getting up and running

##Install

After cloning the repository, run `npm install`. 

All files live inside the `app` folder

..app  
.....index.html  
.....build.js  
...js  
........main.js  
........(...)  

running `npm run watch` watches for change and creates the browser bundle 'build.js'
If you want to manually build the bundle, run `npm run build`.

##Examples

The repository contains multiple branches with different examples

- [master](https://github.com/yelouafi/snabbdom-starter) : the basic Hello examples
- [dynamic-view](https://github.com/yelouafi/snabbdom-starter/tree/dynamic-view): dynamically generated view (using `setInterval`)
- [event-reactivity](https://github.com/yelouafi/snabbdom-starter/tree/event-reactivity) : basic event handling example
- [counter-1](https://github.com/yelouafi/snabbdom-starter/tree/counter-1) basic counter (Elm architecture)
- [counter-2](https://github.com/yelouafi/snabbdom-starter/tree/counter-2) a pair of counters (Elm architecture)
- [counter-3](https://github.com/yelouafi/snabbdom-starter/tree/counter-3) a list of counters (Elm architecture)
