/* @flow */
'use strict';

var React = require('react-native');
var LinearGradient = require('react-native-linear-gradient');
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

var ChannelGridItem = React.createClass({
  getInitialState: function() {
    return {
      bounceValueScale: new Animated.Value(1),
      bounceValueOpacity: new Animated.Value(0),
      bounceValueTranslateY: new Animated.Value(-200 * (this.props.itemIndex + 1))
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

  onPressIn: function() {
    this.animatePressIn().start();
  },

  onPressOut: function() {
    this.animatePressOut().start();
  },

  onPress: function() {
    this.props.onPressStream();
  },

  renderBloker: function() {
    return (
      <View style={{
        opacity: 1,
        height: containerHeight,
        position: 'absolute',
        top: 0,
        left: 0,
        right: containerWidth - 30,
        bottom: 0,
      }}
      onStartShouldSetResponder={(evt) => true}
      onResponderTerminationRequest={(evt) => false} />
    );
  },

  render: function() {
    // debugger;
    return (
      <TouchableHighlight

        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        
        underlayColor='rgba(255,255,255, 0.5)' >

        <Animated.View
          style={[styles.streamContainer, {
            opacity: this.state.bounceValueOpacity,
            transform: [
              { translateY: this.state.bounceValueTranslateY },
              { scale: this.state.bounceValueScale }
            ],
            marginTop: this.props.itemIndex === 0 ? 10 : 0,
          }]} >

          <Image
            style={styles.streamView}
            source={{uri: this.props.preview}}
            resizeMode="contain" >

            <LinearGradient colors={['rgba(0,0,0,0)', 'rgb(0,0,0,1)']} style={styles.streamBox}>
              <Text
                style={styles.streamTitleText}
                numberOfLines={1} >

                {this.props.stream.display_name}
              </Text>
              <Text style={styles.streamNameText} numberOfLines={2}>
                {this.props.stream.status}
              </Text>
              <Text style={styles.streamViewesText}>
                {this.props.stream.views} <Text style={{fontWeight: '200',}}>viewers</Text>
              </Text>
            </LinearGradient>
          </Image>

          {this.renderBloker()}
        </Animated.View>
      </TouchableHighlight>
    );
  }
});

var SCREEN_WIDTH = Dimensions.get('window').width;

var ratio = 180 / 320,
  offset = 10,
  containerWidth = (SCREEN_WIDTH - offset * 2) / 1,
  containerHeight = ratio * containerWidth;

var styles = StyleSheet.create({

  streamContainer: {
    paddingBottom: offset,
    paddingRight: offset,
    paddingLeft: offset,
  },

  streamView: {
    justifyContent: 'flex-end',
    width: containerWidth,
    height: containerHeight,
  },
  streamBox: {
    padding: 10,
  },

  streamTitleText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  streamNameText: {
    color: '#fff',
    fontSize: 12,
    paddingVertical: 5,
  },

  streamViewesText: {
    color: '#B9A5E1',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

module.exports = ChannelGridItem;
