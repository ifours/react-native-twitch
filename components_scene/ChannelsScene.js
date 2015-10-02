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

var ChannelsTabs = require('../components/ChannelsTabs'),
  CurrentStream = require('../components/CurrentStream'),
  ChannelListItem = require('../components/ChannelListItem'),
  ChannelGridItem = require('../components/ChannelGridItem');

var applicationStore = require('../stores/applicationStore');

var appConst = require('../constants/applicationConstants');

var ChannelsScene = React.createClass({
  getInitialState: function() {
    return {
      channels,
      gridCount: 4,
      itemsView: applicationStore.getChannelItemsView(),
      currentStreamIsOn: applicationStore.getCurrentStreamStatus(),
    };
  },

  componentDidMount: function() {
    applicationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    applicationStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    // TODO:
    this.setState({
      currentStreamIsOn: applicationStore.getCurrentStreamStatus(),
      itemsView: applicationStore.getChannelItemsView(),
    });
  },

  renderGridItem: function(stream) {
    return (
      <ChannelGridItem {...this.props}
        stream={stream}
        key={stream.key}
      />
    )
  },

  renderListItem: function(stream) {
    return (
      <ChannelListItem {...this.props}
        stream={stream}
        key={stream.key}
      />
    )
  },

  _getArrayOfChannels: function({ startIndex, endIndex }) {
    var channels = [];

    for (var i = startIndex; i != endIndex; i++) {
      channels[i] = this.state.channels[i];
    }
    return channels;
  },

  renderListChannels: function() {
    return this._getArrayOfChannels({
        startIndex: this.state.gridCount,
        endIndex: this.state.channels.length,
      })
      .map(this.renderListItem);
  },
  
  rednerGridChannels: function() {
    return this._getArrayOfChannels({
        startIndex: 0,
        endIndex: this.state.gridCount,
      })
      .map(this.renderGridItem);;
  },

  renderItems: function() {
    switch (this.state.itemsView) {

      case appConst.GRID:
        return this.state.channels.map(this.renderGridItem);

      case appConst.LIST:
        return this.state.channels.map(this.renderListItem);

      case appConst.GRID_LIST:
        return this.rednerGridChannels().concat(this.renderListChannels());
    }
  },

  render: function() {
    var marginTop = this.state.currentStreamIsOn ? 90 : 0;

    return (
      <View style={{flex: 1, marginTop }}>
        <ScrollView style={{ marginBottom: 50 }}>
          {this.renderItems()}
        </ScrollView>
        <ChannelsTabs />
      </View>
    );
  }
});

var styles = StyleSheet.create({

});

var channels = [
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_professorbroman-320x180.jpg', key: 0, name: 'BLOODBORNE - FINISH THE FIGHT', views: '4 678'},
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_teawrex-320x180.jpg', key: 1, name: 'New Build !Vote  http://mugenmonkey.com/bloodborne/4126  OR http://mugenmonkey.com/bloodborne/4503', views: '4 678'},
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_bioflash257-320x180.jpg', key: 2, name: 'Level 4 no death run attempts', views: '4 678'},
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_edemonster-320x180.jpg', key: 3, name: 'Bloodborne - New Game, New Character, New Class, New Story', views: '4 678'},

  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_fizzor-320x180.jpg', key: 10, name: 'Destiny Year Two Reveal', views: '244 520' },
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_annialis-320x180.jpg', key: 11, name: 'Directo de Bungie | El Rey de los Poseídos', views: '244 520' },
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_tpatpeppers-320x180.jpg', key: 12, name: 'QC-FR Commentaire sur le Live Stream', views: '244 520' },
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_geestaar74-320x180.jpg', key: 13, name: 'BUNGIE Re`stream...Ger', views: '244 520' },
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_couchteamgaming-320x180.jpg', key: 14, name: 'Taken King Reveal LIVE', views: '244 520' },
  { uri: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_babynikki-320x180.jpg', key: 15, name: 'Destiny Year Two Reveal', views: '244 520' },
]

module.exports = ChannelsScene;
