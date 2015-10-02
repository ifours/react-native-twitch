'use strict';

var dispatcher = require('../AppDispatcher');

var applicationConstants = require('../constants/applicationConstants');

var actions = {
  changeCurrentStreamStatus: function(value) {
    dispatcher.dispatch({
      actionType: applicationConstants.CURRENT_STREAM,
      value: value,
    });
  },

  setCurrentStream: function(value) {
    dispatcher.dispatch({
      actionType: applicationConstants.SET_CURRENT_STREAM,
      value: value,
    });
  },

  setChannelItemsView: function(type) {
    dispatcher.dispatch({
      actionType: applicationConstants.SET_CHANNEL_ITEMS_VIEW,
      type: type,
    }); 
  },

  setSettingsModalVisible: function(value) {
    dispatcher.dispatch({
      actionType: applicationConstants.SET_SETTINS_MODAL_VISIBLE,
      value: value,
    }); 
  }
};

module.exports = actions;
