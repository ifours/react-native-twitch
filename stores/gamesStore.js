'use strict';

var dispatcher = require('../AppDispatcher'),
  EventEmitter = require('events'),
  assign = require('object-assign');

var сonstants = require('../constants/gamesConstants');

var EVENT = 'fromGamesStore';

var _state = {
  games: require('../mock_data/games'),
};

var store = assign({}, EventEmitter.prototype, {
  getState: function() {
    return _state;
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

  }),
});

module.exports = store;
