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
  Modal,
  NavigatorIOS,
  TouchableHighlight,
  StatusBarIOS,
} = React;

var ChannelsScene = require('./ChannelsScene'),
  Game = require('../components/GameItem');

var applicationStore = require('../stores/applicationStore');

var GamesScreen = React.createClass({
  getInitialState: function() {
    return {
      games: require('../mock_data/games'),
      currentStreamIsOn: applicationStore.getCurrentStreamStatus(),
    }
  },

  componentDidMount: function() {
    applicationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    applicationStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {    
    this.setState({
      currentStreamIsOn: applicationStore.getCurrentStreamStatus()
    });
  },

  _onPressGame: function(game) {
    this.props.closeDrawer();

    this.props.navigator.push({
      title: game.name,
      component: ChannelsScene,
      rightButtonTitle: 'Test Settings',
      onRightButtonPress: () => {
        ChannelsScene.openSettingsModal(true);
      },
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
    var marginTop = this.state.currentStreamIsOn ? 90 : 0;

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
  }
});

module.exports = GamesScreen;
