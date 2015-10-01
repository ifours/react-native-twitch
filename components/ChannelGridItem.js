/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Modal,
  PixelRatio,
  Text,
  Animated,
  TouchableHighlight,
} = React;

var StreamScene = require('../components_scene/StreamScene');

var ChannelGridItem = React.createClass({
  getInitialState: function() {
    return {
      bounceValueScale: new Animated.Value(1),
      bounceValueOpacity: new Animated.Value(0),
      bounceValueTranslateY: new Animated.Value(-200 * (this.props.stream.key + 1))
    };
  },

  componentDidMount: function() {
    Animated.parallel([
      Animated.timing(
        this.state.bounceValueTranslateY,
        {
          toValue: 0,
          duration: 300,
        }
      ),
      Animated.timing(
        this.state.bounceValueOpacity,
        {
          toValue: 1,
          duration: 200,
        }
      ),
    ]).start();
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
      component: StreamScene,
      passProps: { stream },
    });
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
          style={[sharedStyles.streamView, {
            opacity: this.state.bounceValueOpacity,
            transform: [
              { translateY: this.state.bounceValueTranslateY },
              { scale: this.state.bounceValueScale }
            ]
          }]}
        >
          <Image
            style={sharedStyles.streamImg}
            source={{uri: this.props.stream.uri}}
            resizeMode="contain"
          />
          <Text
            style={sharedStyles.streamTitleText}
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


var styles = StyleSheet.create({

});

var sharedStyles = require('./stream_styles');


module.exports = ChannelGridItem;
