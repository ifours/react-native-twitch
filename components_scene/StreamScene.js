/* @flow */
'use strict';

var React = require('react-native');

var Dimensions = require('Dimensions');
var SCREEN_WIDTH = Dimensions.get('window').width,
  ratio = 320 / 180;

var { getRandomColor } = require('../utils');

var {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
} = React;

var appActions = require('../actions/applicationActions');
var appConst = require('../constants/applicationConstants');

var StreamScreen = React.createClass({
  getInitialState: function() {
    var msgs = require('../mock_data/msgs');
    return {
      msgs: msgs.concat(msgs).concat(msgs)
    };
  },

  componentWillUnmount: function() {
    appActions.setPlayerStatus(appConst.PLAYER_ON, this.props.stream);
  },

  renderMsg: function(message, index) {
    return (
      <View key={index} style={styles.messageContainer}>
        <Text style={{ lineHeight: 24 }}>
          <Text style={{ color: getRandomColor() }}>{'@'}{message.name}{':  '}</Text>
          <Text style={{ fontWeight: '200' }}>{message.text}</Text>
        </Text>
      </View>
    )
  },

  render: function() {

    return (
      <View style={styles.container}>
        <View>
          <Image
            style={styles.mainImg}
            source={{uri: this.props.stream.uri}}
            resizeMode="contain"
          />
        </View>
        <ScrollView style={styles.messagesView}
          contentContainerStyle={{ marginTop: -64, }}
        >
          {this.state.msgs.map(this.renderMsg)}
        </ScrollView>
      </View>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
    position: 'relative'
  },

  mainImgView: {

  },

  mainImg: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH / ratio,
    backgroundColor: 'grey',
  },

  messagesView: {
    // marginTop: -64,
  },

  messageContainer: {
    // flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
  }

});

module.exports = StreamScreen;
