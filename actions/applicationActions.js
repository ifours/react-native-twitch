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

  // setCurrentStream: function(stream) {
  //   dispatcher.dispatch({
  //     actionType: applicationConstants.CURRENT_STREAM,
  //     stream: stream,
  //   }); 
  // }
};

module.exports = actions;
