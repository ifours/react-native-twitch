'use strict';

var dispatcher = require('../AppDispatcher'),
  EventEmitter = require('events'),
  assign = require('object-assign');

var сonstants = require('../constants/applicationConstants');

var EVENT = 'fromApplicationStore';


// TODO: bad part separete store or use diffent events
var _state = {
  currentStream: null,
  channelItemsViewType: сonstants.GRID_LIST,
};

var store = assign({}, EventEmitter.prototype, {
  getState: function() {
    return _state;
  },

  getCurrentStreamStatus: function() {
    return !!_state.currentStream;
  },

  getCurrentStream: function() {
    return _state.currentStream;
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

      case сonstants.CURRENT_STREAM:
        _state.currentStreamIsOn = action.value;
        store.emitChange();
        break;

      case сonstants.SET_CURRENT_STREAM:
        _state.currentStream = action.value;
        store.emitChange();
        break;

      case сonstants.SET_CHANNEL_ITEMS_VIEW:
        _state.channelItemsViewType = action.type;
        store.emitChange();
        break;
    }
  }),
});

module.exports = store;
