"use strict";

//{ pending, response, handler } 

const ASYNC_START = Symbol('ASYNC START');
const ASYNC_END   = Symbol('ASYNC FIN');

function asyncMessage(request) {
  
  var currentHandler;
  
  function start(handler) {
    currentHandler = handler;
    request( resp => {
      currentHandler({ type: ASYNC_END, data: resp });
    });
    currentHandler({ type: ASYNC_START });
  }
  
  const hook = handler => {
    update : currentHandler = handler;
  };
  
  return { start, hook, ASYNC_START, ASYNC_END };
}

export default asyncMessage;