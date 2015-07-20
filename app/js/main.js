"use strict";

import { h, mount, update } from './app';

const view = date => h('div', 'hello world, now is ' + date );

mount( view(new Date()) , '#placeholder' );
setInterval(() => update(view(new Date())), 1000 );
