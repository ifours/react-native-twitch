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
  ActivityIndicatorIOS,
  AlertIOS,
  TouchableHighlight,
} = React;

var ChannelsTabs = require('../components/ChannelsTabs'),
  ChannelListItem = require('../components/ChannelListItem'),
  ChannelGridItem = require('../components/ChannelGridItem'),
  StreamScene = require('./StreamScene');

var appStore = require('../stores/applicationStore');
var appActions = require('../actions/applicationActions');
var appConsts = require('../constants/applicationConstants');
var kraken = require('../services/kraken');

var ChannelsScene = React.createClass({
  getInitialState: function() {
    return {
      channels: [],
      gridCount: 4,
      itemsView: appStore.getChannelItemsView(),
      playerStatus: appStore.getPlayerStatus(),
    };
  },

  componentDidMount: function() {
    appStore.addChangeListener(this._onChange);

    kraken.getStreams(this.props.game.name).then((body) => {
      this.setState({ channels: body.streams });
    }).catch(() => {
      AlertIOS.alert('Twitch server error');
    });
  },

  componentWillUnmount: function() {
    appStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      playerStatus: appStore.getPlayerStatus(),
      itemsView: appStore.getChannelItemsView(),
    });
  },

  _onPressStream: function(stream) {
    this.props.navigator.push({
      title: stream.channel.status,
      component: StreamScene,
      passProps: { stream },
    });

    if (!(this.state.playerStatus === appConsts.PLAYER_OFF)) {
      appActions.setPlayerStatus(appConsts.PLAYER_SUSPEND);
    }

  },


  renderGridItem: function(stream, index) {
    return (
      <ChannelGridItem {...this.props}
        onPressStream={ () =>  this._onPressStream(stream) }
        stream={stream.channel}
        itemIndex={index}
        preview={stream.preview.large}
        key={stream._id} />
    )
  },

  renderListItem: function(stream, index) {
    return (
      <ChannelListItem {...this.props}
        onPressStream={ () =>  this._onPressStream(stream) }
        stream={stream.channel}
        itemIndex={index}
        preview={stream.preview.large}
        key={stream._id} />
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

      case appConsts.GRID:
        return this.state.channels.map(this.renderGridItem);

      case appConsts.LIST:
        return this.state.channels.map(this.renderListItem);

      case appConsts.GRID_LIST:
        return this.rednerGridChannels().concat(this.renderListChannels());
    }
  },

  render: function() {
    var marginTop = (
      this.state.playerStatus === appConsts.PLAYER_SUSPEND ||
      this.state.playerStatus === appConsts.PLAYER_ON ) ? 65 : 0;

    return (
      <View style={{flex: 1, marginTop }}>
        <ScrollView style={{ marginBottom: 50 }}>
          {this.state.channels.length ? this.renderItems() : <ActivityIndicatorIOS
            style={styles.centering}
            size="large" />}
        </ScrollView>
        <ChannelsTabs />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  centering: {
    flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = ChannelsScene;
