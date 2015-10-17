'use strict';

var dispatcher = require('../AppDispatcher'),
  EventEmitter = require('events'),
  assign = require('object-assign');

var сonstants = require('../constants/applicationConstants');

var EVENT = 'fromApplicationStore';


// TODO:
var _state = {
  playerStream: null,
  playerStatus: сonstants.PLAYER_OFF,
  channelItemsViewType: сonstants.GRID_LIST,
};

var store = assign({}, EventEmitter.prototype, {
  getState: function() {
    return _state;
  },

  getPlayerStatus: function() {
    return _state.playerStatus;
  },

  getPlayerStream: function() {
    return _state.playerStream;
  },

  getChannelItemsView: function() {
    return _state.channelItemsViewType;
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

      case сonstants.SET_PLAYER_STREAM:
        _state.playerStream = action.value;
        store.emitChange();
        break;

      case сonstants.SET_CHANNEL_ITEMS_VIEW:
        _state.channelItemsViewType = action.type;
        store.emitChange();
        break;

      case сonstants.SET_PLAYER_STATUS:
        _state.playerStatus = action.status;
        _state.playerStream = action.stream || null;

        store.emitChange();
        break;
    }
  }),
});

module.exports = store;
