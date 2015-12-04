'use strict';

var React = require('react-native'),
  Drawer = require('react-native-drawer');

var DrawerScene = require('./components_scene/DrawerScene'),
  Player = require('./components/Player'),
  GamesScene = require('./components_scene/GamesScene');

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

var applicationStore = require('./stores/applicationStore'),
  applicationActions = require('./actions/applicationActions'),
  { DRAWER_OFFSET } = require('./constants/applicationConstants');

StatusBarIOS.setStyle('light-content');

var MainView = React.createClass({
  getInitialState: function() {
    return {
      playerStream: applicationStore.getPlayerStream(),
      isDrawerOpened: applicationStore.getDrawerStatus()
    };
  },

  componentDidMount: function() {
    applicationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    applicationStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      playerStream: applicationStore.getPlayerStream(),
      isDrawerOpened: applicationStore.getDrawerStatus(),
    });
  },

  renderPlayer: function() {
    if (!this.state.playerStream) {
      return null;
    }
    return (
      <Player stream={this.state.playerStream} navigator={this.refs.nav} />
    );
  },

  render: function() {

    return (
      <View style={{ flex: 1 }}>
        <NavigatorIOS style={{flex: 1}}
          barTintColor='#6441A5'
          titleTextColor='#fff'
          tintColor='#fff'
          ref="nav"
          initialRoute={{
            component: GamesScene,
            title: 'Games',
            leftButtonIcon: require('image!tabnav_list'),
            onLeftButtonPress: () => {
              this.state.isDrawerOpened ? this.props.closeDrawer() : this.props.openDrawer()
            },
            passProps: {
              closeDrawer: this.props.closeDrawer,
            },
          }} />
        {this.renderPlayer()}
      </View>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      isDrawerOpened: applicationStore.getDrawerStatus()
    };
  },

  componentDidMount: function() {
    applicationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    applicationStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ isDrawerOpened: applicationStore.getDrawerStatus() });
  },

  closeDrawer: function() {
    applicationActions.setDrawerStatus(false);
    this.refs.drawer.close();
  },

  openDrawer: function() {
    applicationActions.setDrawerStatus(true);
    this.refs.drawer.open();
  },

  setDrawerState: function(value) {
    this.setState({ isDrawerOpened: value });
  },

  render: function() {
    console.log(this.state.isDrawerOpened);
    return (
      <Drawer ref="drawer"
        type="static"
        openDrawerOffset={DRAWER_OFFSET}
        panOpenMask={.5}
        onOpen={() => this.setDrawerState(true)}
        onClose={() => this.setDrawerState(false)}
        content={<DrawerScene closeDrawer={this.closeDrawer} />} >

        <MainView
          drawerStatus={this.state.isDrawerOpened}
          closeDrawer={this.closeDrawer}
          openDrawer={this.openDrawer}
        />
      </Drawer>
    );
  }
});

AppRegistry.registerComponent('twitch', () => App);
