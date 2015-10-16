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

var SCREEN_WIDTH = Dimensions.get('window').width;

var applicationActions = require('../actions/applicationActions');

var CurrentStream = React.createClass({
  getInitialState: function() {
    return {
      bounceValueLeft: new Animated.Value(0),
      bounceValueOpacity: new Animated.Value(0),
    };
  },

  componentWillMount: function() {
    this._previousLeft = 0;
    this._previousOpacity = 1;

    this._streamStyles = {
      left: this._previousLeft,
      opacity: this._previousOpacity,
    };
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
    var offset = -this._previousLeft + evt.nativeEvent.pageX;

    this._streamStyles.left = offset;
    this._streamStyles.opacity = 1 - ( Math.abs(offset) / 200 ) * 0.6;
    
    this._updatePosition();
  },

  onResponderGrant: function(evt) {
    this._previousLeft = evt.nativeEvent.pageX;
  },

  onResponderRelease: function(evt) {
    this.state.bounceValueLeft.setValue(this._streamStyles.left);

    if (this._streamStyles.left > 200 || this._streamStyles.left < -200) {
      this.state.bounceValueOpacity.setValue(this._streamStyles.opacity);
      Animated.timing(
        this.state.bounceValueOpacity,
        {
          toValue: 0,
          duration: 400,
        }
      ).start(() => {
        applicationActions.setCurrentStream(null);
      });
    } else {
      Animated.timing(
        this.state.bounceValueLeft,
        {
          toValue: 0,
          duration: 300,
        }
      ).start();
    }
  },

  _updatePosition: function() {
    this.stream && this.stream.setNativeProps(this._streamStyles);
  },

  render: function() {
    return (
      <Animated.View
        style={[styles.streamView, {
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

        ref={(stream) => {
          this.stream = stream;
        }} >

        <Image style={styles.streamImage}
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
  streamView: {
    flexDirection: 'row',
    padding: 9,
  },

  streamImage: {
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

  nameText: {
    fontSize: 12,
    paddingVertical: 3,
  },

  viewersText: {
    color: '#694BA6',
    fontWeight: '600',
    fontSize: 12,
  },
});

module.exports = CurrentStream;
