/* @flow */
'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

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

var StreamScreen = require('./StreamScreen');

var styles = require('./stream_styles');

var Stream = React.createClass({
  getInitialState: function() {
    return {
      bounceValueScale: new Animated.Value(1),
      bounceValue: new Animated.Value(-200 * (this.props.stream.key + 1))
    };
  },

  componentDidMount: function() {
    Animated.timing(
      this.state.bounceValue,
      {
        toValue: 0,
        duration: 300,
      }
    ).start();
  },

  animatePressIn: function() {
    return Animated.timing(
      this.state.bounceValueScale,
      {
        toValue: 0.98,
        duration: 70,
      }
    );
  },

  animatePressOut: function() {
    return Animated.timing(
      this.state.bounceValueScale,
      {
        toValue: 1,
        duration: 70,
      }
    );
  },

  _onPressStream: function(stream) {
    this.props.navigator.push({
      title: stream.name,
      component: StreamScreen,
      passProps: {stream, emitCurrentStream: this.props.emitCurrentStream },
    });
  },

  _onPressIn: function() {
    this.animatePressIn().start();
  },

  _onPressOut: function() {
    this.animatePressOut().start();
  },

  render: function() {
    return (
      <TouchableHighlight
        onPress={() => this._onPressStream(this.props.stream) }
        onPressIn={this._onPressIn}
        onPressOut={this._onPressOut}
        underlayColor='#fff'
      >
        <Animated.View
          style={[styles.streamView, {
            transform: [
              { translateY: this.state.bounceValue },
              { scale: this.state.bounceValueScale }
            ]
          }]}
        >
          <Image
            style={styles.streamImg}
            source={{uri: this.props.stream.uri}}
            resizeMode="contain"
          />
          <Text
            style={styles.streamTitleText}
            numberOfLines={1}
          >
            {this.props.stream.name}
          </Text>
          <Text style={{color: 'rgb(140, 140, 140)'}}>
            {this.props.stream.views} viewers on Channel
          </Text>
        </Animated.View>
      </TouchableHighlight>
    );
  }
});

module.exports = Stream;
