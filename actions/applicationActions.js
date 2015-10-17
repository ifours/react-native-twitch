'use strict';

var dispatcher = require('../AppDispatcher');

var applicationConstants = require('../constants/applicationConstants');

var actions = {
  setPlayerStream: function(value) {
    dispatcher.dispatch({
      actionType: applicationConstants.SET_PLAYER_STREAM,
      value: value,
    });
  },

  setPlayerStatus: function(status, stream) {
    dispatcher.dispatch({
      actionType: applicationConstants.SET_PLAYER_STATUS,
      status: status,
      stream: stream,
    });
  },

  setChannelItemsView: function(type) {
    dispatcher.dispatch({
      actionType: applicationConstants.SET_CHANNEL_ITEMS_VIEW,
      type: type,
    }); 
  },
};

module.exports = actions;
