var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  StyleSheet,
  PixelRatio,
} = React;


var SCREEN_WIDTH = Dimensions.get('window').width;

var imgRatio = 180 / 320,
  imgMargin = 10,
  perRow = 1,
  imgWidth = (SCREEN_WIDTH - imgMargin * (perRow + 1)) / perRow,
  imgHeight = imgRatio * imgWidth;

var styles = StyleSheet.create({
  container: {

  },

  streamView: {
    paddingBottom: imgMargin,
    paddingRight: imgMargin,
    paddingLeft: imgMargin,
  },

  streamImg: {
    width: imgWidth,
    height: imgHeight,
    // backgroundColor: 'grey',
  },

  streamTitleText: {
    color: 'rgb(50, 50, 62)',
    fontSize: 17,
    fontWeight: 'bold',
  },

  miniStreamView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  miniStreamImg: {
    width: imgWidth / 3,
    height: imgHeight / 3,
    backgroundColor: 'grey',
  },

  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(),
  },
});

module.exports = styles;
