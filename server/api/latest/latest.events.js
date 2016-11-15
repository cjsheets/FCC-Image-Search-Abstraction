/**
 * Latest model events
 */

'use strict';

import {EventEmitter} from 'events';
import Latest from './latest.model';
var LatestEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LatestEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Latest.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    LatestEvents.emit(`${event}:${doc._id}`, doc);
    LatestEvents.emit(event, doc);
  };
}

export default LatestEvents;
