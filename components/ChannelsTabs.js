/* @flow */
'use strict';

var React = require('react-native');

var {
  Touchable,
  StyleSheet,
  View,
  Text,
  Image,
} = React;

var ChannelsTabs = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.tab}>
          <Image
            style={styles.icon}
            source={{uri: 'http://xstream.net/sites/default/files/Icon_game_console.png'}} />
          
          <Text style={[styles.text, styles.textActive]}>Live Channels</Text>
        </View>
        <View style={styles.tab}>
          <Image
            style={styles.icon}
            source={{uri: 'http://www.3visiondistribution.com/uploads/images/tv-icon.png'}} />
          
          <Text style={styles.text}>Recent Videos</Text>
        </View>
      </View>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',

    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    paddingHorizontal: 45,
    paddingBottom: 2,

    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  tab: {
    alignItems: 'center',
  },

  icon: {
    width: 35,
    height: 35,
  },

  text: {
    color: '#B9A5E1',
    fontSize: 11,
  },

  textActive: {
    color: '#5A3F94',
  },
});


module.exports = ChannelsTabs;
