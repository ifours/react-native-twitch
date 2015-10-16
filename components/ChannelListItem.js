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
          </View>
        </TouchableHighlight>
      </View>
    );
  }
});

var SCREEN_WIDTH = Dimensions.get('window').width;

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

  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(),
  }
});

module.exports = ChannelListItem;
