/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var Drawer = require('react-native-drawer');

var GameStreams = require('./GameScreen');
var DrawerScreen = require('./DrawerScreen');
var CurrentStream = require('./CurrentStream');
var currentStreamIsOn = require('./globals');

var SCREEN_WIDTH = Dimensions.get('window').width;
var openDrawerOffset = 75;

var isDrawer = false;

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  NavigatorIOS,
  TouchableHighlight,
  StatusBarIOS,
} = React;

StatusBarIOS.setStyle('light-content');

var twitch = React.createClass({
  getInitialState: function() {
    return { games };
  },

  _onPressGame: function(game) {
    this.props.closeDrawer();
    this.props.navigator.push({
      title: game.name,
      component: GameStreams,
      passProps: { game, emitCurrentStream: this.props.emitCurrentStream },
    });
  },

  renderGame: function(game) {
    return (
      <TouchableHighlight
        key={game.key}
        style={styles.gameView}
        underlayColor='#f1f1f1'
        onPress={() => this._onPressGame(game) }
      >
        <View style={styles.gameContainer}>
          <Image
            style={styles.gameImg}
            source={{uri: game.uri}}
            resizeMode="contain"
          />
        </View>
      </TouchableHighlight>
    );
  },

  componentWillReceiveProps: function(nextProps) {

  },

  renderGames: function() {
    return this.state.games.map(this.renderGame);
  },

  render: function() {
    var marginTop = currentStreamIsOn.get() ? 90 : 0;
    return (
      <ScrollView contentContainerStyle={[styles.container, { marginTop }]}>
        {this.renderGames()}
      </ScrollView>
    );
  }
});

var MainView = React.createClass({
  getInitialState: function() {
    return {
      currentStream: null,
    };
  },

  emitCurrentStream: function(stream) {
    this.setState({ currentStream: stream });
  },

  renderCurrentStream: function() {
    if (!this.state.currentStream) {
      currentStreamIsOn.set(false);
      return null;
    }
    currentStreamIsOn.set(true);
    return (
      <CurrentStream stream={this.state.currentStream} setCurrentStream={this.emitCurrentStream}/>
    );
  },

  render: function() {

    return (
      <View style={{ flex: 1 }}>
        <NavigatorIOS
          style={{flex: 1}}
          barTintColor='#6441A5'
          titleTextColor='#fff'
          tintColor='#fff'
          ref="nav"
          initialRoute={{
            component: twitch,
            title: 'Games',
            leftButtonIcon: require('image!tabnav_list'),
            onLeftButtonPress: () => {
              if (isDrawer) {
                this.props.closeDrawer();
              } else {
                this.props.openDrawer();
              }
            },
            passProps: {
              closeDrawer: this.props.closeDrawer,
              emitCurrentStream: this.emitCurrentStream,
              currentStreamIsOn: {
                value: !!this.state.currentStream
              },
            },
          }}
        />
        {this.renderCurrentStream()}
      </View>
    );
  }
});

var App = React.createClass({
  closeDrawer: function(){
    isDrawer = false;
    this.refs.drawer.close();
  },
  openDrawer: function(){
    isDrawer = true;
    this.refs.drawer.open();
  },
  render: function() {
    return (
      <Drawer
        ref="drawer"
        type="static"
        openDrawerOffset={openDrawerOffset}
        panOpenMask={.5}
        onOpen={() => isDrawer = true}
        onClose={() => isDrawer = false}
        content={<DrawerScreen closeDrawer={this.closeDrawer}/>}
        >
          <MainView
            closeDrawer={this.closeDrawer}
            openDrawer={this.openDrawer}
          />
      </Drawer>
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
    backgroundColor: 'grey', 
    // paddingLeft: 15,
    // paddingTop: 15,
    // paddingRight: 15,
  },

  gameContainer: {
    flexDirection: 'row',
  },

  gameImg: {
    width: imgWidth,
    height: imgHeight,
    // borderRadius: 30,
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

var games = [
  { uri: 'http://static-cdn.jtvnw.net/ttv-boxart/Hearthstone:%20Heroes%20of%20Warcraft-272x380.jpg', key: 0, name: 'Hearthstone: Heroes of Warcraft'},
  { uri: 'http://static-cdn.jtvnw.net/ttv-boxart/Counter-Strike:%20Global%20Offensive-272x380.jpg', key: 1, name: 'Counter-Strike: Global Offensive'},
  { uri: 'http://static-cdn.jtvnw.net/ttv-boxart/Dota%202-272x380.jpg', key: 2, name: 'Dota 2'},
  { uri: 'http://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-272x380.jpg', key: 3, name: 'League of Legends'},
  { uri: 'http://static-cdn.jtvnw.net/ttv-boxart/StarCraft%20II-272x380.jpg', key: 4, name: 'StarCraft 2'},
  { uri: 'http://static-cdn.jtvnw.net/ttv-boxart/World%20of%20Warcraft-272x380.jpg', key: 5, name: 'World of Warcraft'},
  { uri: 'http://static-cdn.jtvnw.net/ttv-boxart/World%20of%20Tanks-272x380.jpg', key: 6, name: 'World of Tanks'},
  { uri: 'http://static-cdn.jtvnw.net/ttv-boxart/Grand%20Theft%20Auto%20V-272x380.jpg', key: 7, name: 'Grand Theft Auto'},
  { uri: 'http://static-cdn.jtvnw.net/ttv-boxart/Destiny-272x380.jpg', key: 8, name: 'Destiny'},
  { uri: 'http://static-cdn.jtvnw.net/ttv-boxart/RuneScape-272x380.jpg', key: 9, name: 'RuneScape'},

].reverse();

var desc = "Leah (who really, really loves Master Chief) is a huge Halo and Destiny fan from the UK. Expect to see ridiculous enthusiasm, a lot of smiling and laughter, many grenades thrown into walls, 'fabulous hair', and the occasional clutch play here and there for good measure."

AppRegistry.registerComponent('twitch', () => App);
