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

var StreamScene = require('../components_scene/StreamScene');

var Stream = React.createClass({
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

  _onPressIn: function() {
    this.animatePressIn().start();
  },

  _onPressOut: function() {
    this.animatePressOut().start();
  },

  render: function() {
    if (!this.props.isListItem) {
      return (
        <TouchableHighlight
          onPress={() => this._onPressStream(this.props.stream) }
          onPressIn={this._onPressIn}
          onPressOut={this._onPressOut}
          underlayColor='#fff'
        >
          <Animated.View
            style={[styles.streamView, {
              opacity: this.state.bounceValueOpacity,
              transform: [
                { translateY: this.state.bounceValueTranslateY },
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
    } else {
      return (
        <View>
          <View style={styles.separator} />
          <TouchableHighlight
            onPress={() => this._onPressStream(this.props.stream) }
            underlayColor='#f1f1f1'
          >
            <View
              style={[styles.streamView, styles.miniStreamView]}
            >
              <Image
                style={[styles.streamImg, styles.miniStreamImg]}
                source={{uri: this.props.stream.uri}}
                resizeMode="contain"
              />
              <View style={{marginLeft: 10, flex: 1}}>
                <Text
                  style={[styles.streamTitleText, {fontSize: 18}]}
                  numberOfLines={1}
                >
                  {this.props.stream.name}
                </Text>
                <Text style={{color: '#694BA6', fontWeight: '400'}} numberOfLines={1}>
                  Views: <Text style={{color: '#6749A4', fontWeight: 'bold'}}>{this.props.stream.views}</Text>
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
  },
});

var styles = require('./stream_styles');

module.exports = Stream;
