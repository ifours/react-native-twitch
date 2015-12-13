/* @flow */
'use strict';

var React = require('react-native'),
  Dimensions = require('Dimensions');

var {
  StyleSheet,
  View,
  Animated,
  Image,
  Text,
  TouchableHighlight,
} = React;

var SCREEN_WIDTH = Dimensions.get('window').width;

var GameItem = React.createClass({
  getInitialState: function() {
    return { bounceValue: new Animated.Value(0), }
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
          <View style={styles.boxartView}>
            <Image
              style={styles.boxartConatianer}
              source={require('image!boxart')}
              resizeMode="contain" >
              <Text numberOfLines={3} style={styles.gameTitle}>{this.props.game.name}</Text>
            </Image>
            <Animated.Image
              style={[styles.gameImg, {opacity: this.state.bounceValue}]}
              source={{uri: this.props.game.box.large}}
              resizeMode="contain"
              onLoad={ this._onImageLoad }
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  },
}); 

var imgRatio = 202 / 145,
  imgMargin = 10,
  perRow = 2,
  imgWidth = (SCREEN_WIDTH - imgMargin * (perRow + 1)) / perRow,
  imgHeight = imgRatio * imgWidth;


var styles = StyleSheet.create({
  gameView: {
    marginLeft: imgMargin,
    marginTop: imgMargin,
  },

  gameContainer: {
    flexDirection: 'row',
    backgroundColor: '#19191E',

    width: imgWidth,
    height: imgHeight,
  },

  boxartView: {
    flex: 1,
    // alignItems: 'center',
    // marginTop: imgHeight / 2 - 50,
  },

  boxartConatianer: {
    width: imgWidth,
    padding: 10,
    height: 70,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  gameTitle: {
    color: '#B9A5E1',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  gameImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    
    width: imgWidth,
    height: imgHeight,
  },
});


module.exports = GameItem;
