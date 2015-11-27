'use strict';

var dispatcher = require('../AppDispatcher'),
  EventEmitter = require('events'),
  assign = require('object-assign');

var constants = require('../constants/applicationConstants');

var EVENT = 'fromApplicationStore';


// TODO:
var _state = {
  playerStream: null,
  playerStatus: constants.PLAYER_OFF,
  isDrawerOpened: false,
  channelItemsViewType: constants.GRID_LIST,
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

  getDrawerStatus: function() {
    return _state.isDrawerOpened;
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

      case constants.SET_PLAYER_STREAM:
        _state.playerStream = action.value;
        store.emitChange();
        break;

      case constants.SET_CHANNEL_ITEMS_VIEW:
        _state.channelItemsViewType = action.type;
        store.emitChange();
        break;

      case constants.SET_PLAYER_STATUS:
        _state.playerStatus = action.status;
        _state.playerStream = action.stream || null;

        store.emitChange();
        break;

      case constants.SET_DRAWER_STATUS:
        _state.isDrawerOpened = action.value;

        store.emitChange();
        break;
    }
  }),
});

module.exports = store;
