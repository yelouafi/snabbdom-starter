"use strict";


import patcher from './helpers';
import h from 'snabbdom/h';

const update = patcher('#placeholder');

update( h('div', 'Hello World') );
