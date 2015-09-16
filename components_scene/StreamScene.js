/* @flow */
'use strict';

var React = require('react-native');

var Dimensions = require('Dimensions');
var SCREEN_WIDTH = Dimensions.get('window').width,
  ratio = 320 / 180;

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';

  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
} = React;

var applicationActions = require('../actions/applicationActions');

var StreamScreen = React.createClass({
  getInitialState: function() {
    return { msgs };
  },

  componentWillUnmount: function() {
    // this.props.emitCurrentStream();
    applicationActions.setCurrentStream(this.props.stream);
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
        <ScrollView
          style={styles.messagesView}
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

var msgs = [
  { name: 'Hazzdota', text: 'Lorem ipsum dolor sit amet' },
  { name: '5chief', text: 'consectetur adipisicing elit' },
  { name: 'Zitraff', text: 'ed do eiusmod tempor incididunt ut' },
  { name: 'Dubbyman', text: 'labore et dolore' },
  { name: 'Borgg', text: 'magna aliqua. Ut enim ad minim veniam' },
  { name: 'Titan', text: 'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' },
  { name: 'BigDaddy', text: 'consequat. Duis aute irure dolor in reprehenderit' },
  { name: 'Frommet', text: 'in voluptate velit esse' },
  { name: 'Rolling', text: 'cillum dolore eu fugiat nulla pariatur' },
  { name: 'Scropes', text: 'xcepteur sint occaecat cupidatat' },
  { name: 'React', text: 'non' },
  { name: 'Native', text: 'proident, sunt in culpa qui officia deserunt mollit anim id est laborum' },
];

msgs = msgs.concat(msgs).concat(msgs);

module.exports = StreamScreen;
