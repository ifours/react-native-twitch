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
};

module.exports = actions;
