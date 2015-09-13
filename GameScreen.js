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

var StreamScreen = require('./StreamScreen'),
  CurrentStream = require('./CurrentStream'),
  Stream = require('./Stream'),
  MiniStream = require('./MiniStream');

var currentStreamIsOn  = require('./globals');

var GameStreams = React.createClass({
  getInitialState: function() {
    return {
      streams,
      miniStreams,
    };
  },

  renderStream: function(stream) {
    return (
      <Stream {...this.props}
        emitCurrentStream={() => this.props.emitCurrentStream(stream)}
        stream={stream}
        key={stream.key}
      />
    )
  },

  renderMiniStream: function(stream) {
    return (
      <MiniStream {...this.props}
        emitCurrentStream={() => this.props.emitCurrentStream(stream)}
        stream={stream}
        key={stream.key}
      />
    )
  },

  renderMiniStreams: function() {
    return this.state.miniStreams.map(this.renderMiniStream);
  },
  
  renderStreams: function() {
    return this.state.streams.map(this.renderStream);
  },

  render: function() {
    var marginTop = currentStreamIsOn.get() ? 90 : 0;
    return (
      <View style={{flex: 1, marginTop}}>
        <ScrollView>
          {this.renderStreams()}
          {this.renderMiniStreams()}
        </ScrollView>
      </View>
    );
  }
});

var SCREEN_WIDTH = Dimensions.get('window').width;

var imgRatio = 180 / 320,
  imgMargin = 15,
  perRow = 1,
  imgWidth = (SCREEN_WIDTH - imgMargin * (perRow + 1)) / perRow,
  imgHeight = imgRatio * imgWidth;

var styles = StyleSheet.create({
  container: {

  },

  streamView: {
    padding: imgMargin,
  },

  streamImg: {
    width: imgWidth,
    height: imgHeight,
    backgroundColor: 'grey',
  },

  streamTitleText: {
    color: 'rgb(50, 50, 62)',
    fontSize: 20,
  },

  miniStreamView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  miniStreamImg: {
    width: imgWidth / 3,
    height: imgHeight / 3,
    backgroundColor: 'grey',
  },

  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(),
  },
});

var streams = [
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_professorbroman-320x180.jpg', key: 0, name: 'BLOODBORNE - FINISH THE FIGHT', views: '4 678'},
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_teawrex-320x180.jpg', key: 1, name: 'New Build !Vote  http://mugenmonkey.com/bloodborne/4126  OR http://mugenmonkey.com/bloodborne/4503', views: '4 678'},
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_bioflash257-320x180.jpg', key: 2, name: 'Level 4 no death run attempts', views: '4 678'},
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_edemonster-320x180.jpg', key: 3, name: 'Bloodborne - New Game, New Character, New Class, New Story', views: '4 678'},
];

var miniStreams = [
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_fizzor-320x180.jpg', key: 10, name: 'Destiny Year Two Reveal', views: '244 520' },
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_annialis-320x180.jpg', key: 11, name: 'Directo de Bungie | El Rey de los Poseídos', views: '244 520' },
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_tpatpeppers-320x180.jpg', key: 12, name: 'QC-FR Commentaire sur le Live Stream', views: '244 520' },
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_geestaar74-320x180.jpg', key: 13, name: 'BUNGIE Re`stream...Ger', views: '244 520' },
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_couchteamgaming-320x180.jpg', key: 14, name: 'Taken King Reveal LIVE', views: '244 520' },
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_babynikki-320x180.jpg', key: 15, name: 'Destiny Year Two Reveal', views: '244 520' },
]

module.exports = GameStreams;
