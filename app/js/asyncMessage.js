"use strict";

//{ pending, response, handler } 

const ASYNC_START = Symbol('ASYNC START');
const ASYNC_FIN   = Symbol('ASYNC FIN');

function asyncMessage() {
  
  var currentHandler;
  
  function start(handler, request) {
    currentHandler = handler;
    request( resp => {
      currentHandler({ type: ASYNC_FIN, data: resp });
    });
    currentHandler({ type: ASYNC_START });
  }
  
  const hook = handler => {
    update : currentHandler = handler;
  };
  
  return { start, hook, ASYNC_START, ASYNC_FIN };
}

export default asyncMessage;