/* @flow */
'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var StreamScene = require('../components_scene/StreamScene');

var {
  StyleSheet,
  View,
  ScrollView,
  Image,
  PixelRatio,
  Text,
  Animated,
  TouchableHighlight,
} = React;

var SCREEN_WIDTH = Dimensions.get('window').width;

var appActions = require('../actions/applicationActions');
var appConsts = require('../constants/applicationConstants');

var Player = React.createClass({
  getInitialState: function() {
    return {
      bounceValueLeft: new Animated.Value(0),
      bounceValueOpacity: new Animated.Value(0),
    };
  },

  componentWillMount: function() {
    this._setupStyles();
  },

  componentDidMount: function() {
    Animated.timing(
      this.state.bounceValueOpacity,
      {
        toValue: 1,
        duration: 300,
      }
    ).start();
  },

  onResponderMove: function(evt) {
    var offset = - this._previousLeft + evt.nativeEvent.pageX;

    this._playerStyles.left = offset;
    this._playerStyles.opacity = 1 - ( Math.abs(offset) / 200 ) * 0.6;

    this._updatePosition();
  },

  onResponderGrant: function(evt) {
    this._previousLeft = evt.nativeEvent.pageX;
  },

  onResponderRelease: function(evt) {
    this.state.bounceValueLeft.setValue(this._playerStyles.left);

    if (this._playerStyles.left + this._previousLeft === this._previousLeft) {

      this.props.navigator.push({
        title: this.props.stream.title,
        component: StreamScene,
        passProps: { stream: this.props.stream },
      });

      return appActions.setPlayerStatus(appConsts.PLAYER_SUSPEND);
    }

    if (this._playerStyles.left > 200 || this._playerStyles.left < -200) {
      this.state.bounceValueOpacity.setValue(this._playerStyles.opacity);

      Animated.timing(
        this.state.bounceValueOpacity,
        {
          toValue: 0,
          duration: 400,
        }
      ).start(() => {
        appActions.setPlayerStatus(appConsts.PLAYER_OFF);
      });
    } else {
      Animated.timing(
        this.state.bounceValueLeft,
        {
          toValue: 0,
          duration: 300,
        }
      ).start(() => {
        this._setupStyles();
      });
    }
  },

  _setupStyles: function() {
    this._previousLeft = 0;
    this._previousOpacity = 1;

    this._playerStyles = {
      left: this._previousLeft,
      opacity: this._previousOpacity,
    };
  },

  _updatePosition: function() {
    this.stream && this.stream.setNativeProps({style: this._playerStyles});
  },

  render: function() {
    return (
      <Animated.View style={[styles.playerView, {
          width: SCREEN_WIDTH,
          position: 'absolute',
          top: 64,
          left: this.state.bounceValueLeft,
          opacity: this.state.bounceValueOpacity,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }]}

        onStartShouldSetResponder={(evt) => true}
        onMoveShouldSetResponder={(evt) => true}

        onResponderGrant={this.onResponderGrant}
        onResponderMove={this.onResponderMove}
        onResponderRelease={this.onResponderRelease}
        onResponderTerminationRequest={(evt) => false}

        ref={(stream) => {
          this.stream = stream;
        }} >

        <Image style={styles.playerImage}
          source={{uri: this.props.stream.uri}}
          resizeMode="contain" />
        <View style={styles.infoView}>
          <Text style={styles.titleText}
            numberOfLines={1} >

            {this.props.stream.name}
          </Text>
          <Text style={{color: '#694BA6', fontWeight: '400'}}
            numberOfLines={1} >

            Playing
          </Text>
        </View>
      </Animated.View>
    );
  },
});

var imgRatio = 180 / 320,
  imgOffset = 9,
  imgWidth = 95,
  imgHeight = imgRatio * imgWidth;

var styles = StyleSheet.create({
  playerView: {
    flexDirection: 'row',
    padding: 9,
  },

  playerImage: {
    width: imgWidth,
    height: imgHeight,
  },

  infoView: {
    flex: 1,
    marginLeft: 10,
  },

  titleText: {
    fontWeight: '500',
    fontSize: 14,
  },
});

module.exports = Player;
