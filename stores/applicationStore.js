'use strict';

var dispatcher = require('../AppDispatcher'),
  EventEmitter = require('events'),
  assign = require('object-assign');

var сonstants = require('../constants/applicationConstants');

var EVENT = 'fromApplicationStore';

var _state = {
  currentStreamIsOn: false
};

var store = assign({}, EventEmitter.prototype, {
  getState: function() {
    return _state;
  },

  getCurrentStreamStatus: function() {
    return _state.currentStreamIsOn;
  },

  emitChange: function() {
    this.emit(EVENT);
  },

  addChangeListener: function(callback) {
    this.on(EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(EVENT, callback);
  },

  dispatchToken: dispatcher.register(function(action) {
    switch(action.actionType) {
      case сonstants.CURRENT_STREAM:
        _state.currentStreamIsOn = action.value;
        store.emitChange();
        break;
    }
  }),
});

module.exports = store;
