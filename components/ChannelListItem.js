/* @flow */
'use strict';

var React = require('react-native');

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
  _onPressStream: function(stream) {
    this.props.navigator.push({
      title: stream.name,
      component: StreamScene,
      passProps: { stream },
    });
  },

  render: function() {
    return (
      <View>
        <View style={sharedStyles.separator} />
        <TouchableHighlight
          onPress={() => this._onPressStream(this.props.stream) }
          underlayColor='#f1f1f1'
        >
          <View
            style={[sharedStyles.streamView, sharedStyles.miniStreamView]}
          >
            <Image
              style={[sharedStyles.streamImg, sharedStyles.miniStreamImg]}
              source={{uri: this.props.stream.uri}}
              resizeMode="contain"
            />
            <View style={{marginLeft: 10, flex: 1}}>
              <Text
                style={[sharedStyles.streamTitleText, {fontSize: 18}]}
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
});


var styles = StyleSheet.create({

});

var sharedStyles = require('./stream_styles');

module.exports = ChannelListItem;
