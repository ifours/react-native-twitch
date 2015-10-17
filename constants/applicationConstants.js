'use strict';

var keyMirror = require('keyMirror');
var assign = require('object-assign');

var consts = keyMirror({

  SET_PLAYER_STREAM: null,
  SET_PLAYER_STATUS: null,
  SET_CHANNEL_ITEMS_VIEW: null,

  PLAYER_OFF: null,
  PLAYER_ON: null,
  PLAYER_SUSPEND: null,

  GRID_LIST: null,
  GRID: null,
  LIST: null,
});

module.exports = assign(consts, {

});
