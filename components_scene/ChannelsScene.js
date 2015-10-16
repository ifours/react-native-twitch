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
  ChannelListItem = require('../components/ChannelListItem'),
  ChannelGridItem = require('../components/ChannelGridItem'),
  StreamScene = require('./StreamScene');

var applicationStore = require('../stores/applicationStore');

var appConst = require('../constants/applicationConstants');

var ChannelsScene = React.createClass({
  getInitialState: function() {
    return {
      channels: require('../mock_data/streams'),
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

  _onPressStream: function(stream) {
    this.props.navigator.push({
      title: stream.title,
      component: StreamScene,
      passProps: { stream },
    });
  },


  renderGridItem: function(stream) {
    return (
      <ChannelGridItem {...this.props}
        onPressStream={ () =>  this._onPressStream(stream) }
        stream={stream}
        key={stream.key}
      />
    )
  },

  renderListItem: function(stream) {
    return (
      <ChannelListItem {...this.props}
        onPressStream={ () => this._onPressStream(stream) }
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
    var marginTop = this.state.currentStreamIsOn ? 60 : 0;

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

module.exports = ChannelsScene;
