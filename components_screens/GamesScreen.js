'use strict';

var React = require('react-native'),
  Dimensions = require('Dimensions');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  ScrollView,
  NavigatorIOS,
  TouchableHighlight,
  StatusBarIOS,
} = React;

var GameScreen = require('./GameScreen');

var applicationStore = require('../stores/applicationStore');

var SCREEN_WIDTH = Dimensions.get('window').width;

var Game = React.createClass({
  getInitialState: function() {
    return {
       bounceValue: new Animated.Value(0),
    }
  },

  _onImageLoad: function() {
    Animated.timing(
      this.state.bounceValue,
      {
        toValue: 1,
        // duration: 200,
      }
    ).start();
  },

  render: function() {
    // TODO: replace two Image with one
    return (
      <TouchableHighlight
        style={styles.gameView}
        underlayColor='#f1f1f1'
        onPress={ this.props.onPressGame }
      >
        <View style={styles.gameContainer}>
          <Image
            style={styles.gameImg}

            source={require('image!boxart')}

            resizeMode="contain"
          />
          <Animated.Image
            style={[styles.gameImg, {position: 'absolute', top: 0, left: 0, opacity: this.state.bounceValue}]}
            source={{uri: this.props.game.uri}}

            ref={(game) => {
              this.game = game;
            }}

            resizeMode="contain"
            onLoaded={ this._onImageLoad }
          />
        </View>
      </TouchableHighlight>
    );
  },
});

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
    // TODO:
    this.setState({
      currentStreamIsOn: applicationStore.getCurrentStreamStatus()
    });
  },

  _onPressGame: function(game) {
    this.props.closeDrawer();

    this.props.navigator.push({
      title: game.name,
      component: GameScreen,
      passProps: { game, emitCurrentStream: this.props.emitCurrentStream },
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

var imgRatio = 202 / 145,
  imgMargin = 15,
  perRow = 2,
  imgWidth = (SCREEN_WIDTH - imgMargin * (perRow + 1)) / perRow,
  // imgWidth = 100,
  imgHeight = imgRatio * imgWidth;

var styles = StyleSheet.create({
  header: {
    backgroundColor: '#6441A5',
  },

  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  gameView: {
    marginLeft: imgMargin,
    marginTop: imgMargin,
  },

  gameContainer: {
    flexDirection: 'row',
    position: 'relative',
  },

  gameImg: {
    width: imgWidth,
    height: imgHeight,
  },

  gameText: {
    fontWeight: '200',
    fontSize: 28,
  },

  gameTextDesc: {
    color: '#aaa',
    lineHeight: 20,
  },
});

module.exports = GamesScreen;
