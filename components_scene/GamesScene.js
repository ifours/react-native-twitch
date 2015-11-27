'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  LayoutAnimation,
  ScrollView,
  NavigatorIOS,
  TouchableHighlight,
  StatusBarIOS,
} = React;

var ChannelsScene = require('./ChannelsScene'),
  Game = require('../components/GameItem');

var appStore = require('../stores/applicationStore');
var appConst = require('../constants/applicationConstants');

var GamesScreen = React.createClass({
  getInitialState: function() {
    return {
      games: require('../mock_data/games'),
      playerStatus: appStore.getPlayerStatus(),
      drawerStatus: appStore.getDrawerStatus(),
    }
  },

  componentDidMount: function() {
    appStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    appStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      playerStatus: appStore.getPlayerStatus(),
      drawerStatus: appStore.getDrawerStatus(),
    });
  },

  _onPressGame: function(game) {
    // debugger;
    if (this.state.drawerStatus) {
      return this.props.closeDrawer();
    }

    this.props.navigator.push({
      title: game.name,
      component: ChannelsScene,
      passProps: { game },
    });
  },

  renderGame: function(game) {
    return <Game game={game} key={game.key} onPressGame={() => this._onPressGame(game) }/>
  },

  renderGames: function() {
    return this.state.games.map(this.renderGame);
  },

  render: function() {
    var marginTop = (
      this.state.playerStatus === appConst.PLAYER_SUSPEND ||
      this.state.playerStatus === appConst.PLAYER_ON ) ? 65 : 0;

    return (
      <ScrollView contentContainerStyle={[styles.container, { marginTop }]}>
        {this.renderGames()}
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    paddingBottom: 10,
  }
});

module.exports = GamesScreen;
