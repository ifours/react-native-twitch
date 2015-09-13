var currentStreamIsOn = false;

module.exports = {
  get: function() {
    return currentStreamIsOn;
  },

  set: function(value) {
    currentStreamIsOn = value;
  }
};

