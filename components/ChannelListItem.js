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

var ChannelListItem = React.createClass({
  renderBolker: function() {
    return (
      <View style={{
        backgroundColor: 'rgba(255,255,255,0)',
        height: containerHeight + offset * 2,
        position: 'absolute',
        top: 0,
        left: 0,
        right: SCREEN_WIDTH - 35,
        bottom: 0,
      }}
      onStartShouldSetResponder={(evt) => true}
      onResponderTerminationRequest={(evt) => false} />
    );
  },

  render: function() {
    return (
      <View>
        <View style={styles.separator} />
        <TouchableHighlight
          onPress={ this.props.onPressStream }
          underlayColor='#f1f1f1' >

          <View style={styles.streamView} >
            <Image style={styles.streamImage}
              source={{uri: this.props.stream.uri}}
              resizeMode="contain"  />

            <View style={styles.infoView}>
              <Text style={styles.titleText}
                numberOfLines={1} >

                {this.props.stream.streamer}
              </Text>
              <Text style={styles.nameText}
                numberOfLines={1} >

                {this.props.stream.name}
              </Text>
              <Text style={styles.viewersText}
                numberOfLines={1} >

                {this.props.stream.views} viewers
              </Text>
            </View>
            {this.renderBolker()}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
});

var SCREEN_WIDTH = Dimensions.get('window').width;

var imgRatio = 180 / 320,
  offset = 9,
  containerWidth = 95,
  containerHeight = imgRatio * containerWidth;


var styles = StyleSheet.create({
  streamView: {
    flexDirection: 'row',
    padding: offset,
  },

  streamImage: {
    width: containerWidth,
    height: containerHeight,
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

  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(),
  }
});

module.exports = ChannelListItem;
