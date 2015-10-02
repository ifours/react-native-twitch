/* @flow */
'use strict';

var React = require('react-native'),
  Dimensions = require('Dimensions');

var {
  StyleSheet,
  View,
  Animated,
  Image,
  TouchableHighlight,
} = React;

var SCREEN_WIDTH = Dimensions.get('window').width;

var GameItem = React.createClass({
  getInitialState: function() {
    return {
       bounceValue: new Animated.Value(0),
    }
  },

  _onImageLoad: function() {
    Animated.timing(
      this.state.bounceValue,
      {
        toValue: 1,
        duration: 200,
      }
    ).start();
  },

  render: function() {
    return (
      <TouchableHighlight
        style={styles.gameView}
        underlayColor='#f1f1f1'
        onPress={ this.props.onPressGame }
      >
        <View style={styles.gameContainer}>
          <Image
            style={styles.gameImg}
            source={require('image!boxart')}
            resizeMode="contain"
          >
            <Animated.Image
              style={[styles.gameImg, {opacity: this.state.bounceValue}]}
              source={{uri: this.props.game.uri}}
              resizeMode="contain"
              onLoad={ this._onImageLoad }
            />
          </Image>
        </View>
      </TouchableHighlight>
    );
  },
});

var imgRatio = 202 / 145,
  imgMargin = 15,
  perRow = 2,
  imgWidth = (SCREEN_WIDTH - imgMargin * (perRow + 1)) / perRow,
  // imgWidth = 100,
  imgHeight = imgRatio * imgWidth;


var styles = StyleSheet.create({
  gameView: {
    marginLeft: imgMargin,
    marginTop: imgMargin,
  },

  gameContainer: {
    flexDirection: 'row',
    position: 'relative',
  },

  gameImg: {
    width: imgWidth,
    height: imgHeight,
  },
});


module.exports = GameItem;
