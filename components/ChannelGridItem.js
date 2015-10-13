/* @flow */
'use strict';

var React = require('react-native');
var LinearGradient = require('react-native-linear-gradient');

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
        
        underlayColor='rgba(255,255,255, 0.5)'
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
            style={[sharedStyles.streamImg, styles.streamView ]}
            source={{uri: this.props.stream.uri}}
            resizeMode="contain"
          >
            <LinearGradient colors={['rgba(0,0,0,0)', 'rgb(0,0,0,1)']} style={styles.streamBox}>
              <Text
                style={[sharedStyles.streamTitleText, {color: '#fff', lineHeight: 16}]}
                numberOfLines={1}
              >
                {this.props.stream.name}
              </Text>
              <Text style={{ color: '#fff', fontSize: 12, lineHeight: 16}}>
                SK Zelatoto - New Season
              </Text>
              <Text style={{color: '#B9A5E1', fontSize: 12, fontWeight: 'bold', lineHeight: 16}}>
                {this.props.stream.views} <Text style={{fontWeight: '200',}}>viewers</Text>
              </Text>
            </LinearGradient>

          </Image>
        </Animated.View>
      </TouchableHighlight>
    );
  }
});


var styles = StyleSheet.create({
  streamView: {
    justifyContent: 'flex-end',
  },
  streamBox: {
    padding: 10,
  }
});

var sharedStyles = require('./stream_styles');


module.exports = ChannelGridItem;
